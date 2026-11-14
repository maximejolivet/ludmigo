import { useCallback, useState } from 'react';
import type { Map as LeafletMapInstance } from 'leaflet';
import { useExplore } from './context';
import { EXPLORE_DATA } from './data';
import { isInDemoArea, nearestCity } from './geo';

// Messages courts selon la raison de l'échec (codes de GeolocationPositionError)
// Short messages depending on why it failed (GeolocationPositionError codes)
function failureMessage(code: number): string {
  if (code === 1) return 'La localisation est refusée. Autorisez-la dans les réglages du navigateur, puis réessayez.';
  if (code === 3) return 'La localisation prend trop de temps. Réessayez.';
  return 'Votre position est introuvable pour le moment.';
}

// Demande la position à l'appui du bouton seulement (jamais au chargement), la montre sur la carte
// et la garde dans la page : elle n'est ni enregistrée ni envoyée. Dans la zone de démonstration,
// le « lieu » du filtre prend la commune la plus proche et les distances partent de la vraie position.
// Asks for the position only when the button is pressed (never on load), shows it on the map
// and keeps it in the page: it is neither stored nor sent. Inside the demo area, the filter "place"
// takes the closest city and distances start from the real position.
export function useLocate(map: LeafletMapInstance | null) {
  const { userPosition, setUserPosition, setFilters, notify } = useExplore();
  const [locating, setLocating] = useState(false);

  const locate = useCallback(() => {
    if (typeof navigator === 'undefined' || !('geolocation' in navigator)) {
      notify('Ce navigateur ne sait pas vous localiser.');
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocating(false);
        const next = { lat: coords.latitude, lng: coords.longitude, accuracy: coords.accuracy };
        setUserPosition(next);

        const reduceMotion =
          typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (map) {
          if (reduceMotion) map.setView([next.lat, next.lng], 15, { animate: false });
          else map.flyTo([next.lat, next.lng], 15, { duration: 0.8 });
        }

        if (!isInDemoArea(next)) {
          notify('Vous êtes ici. Les parties de démonstration sont autour de Nantes.');
          return;
        }
        const city = nearestCity(next, EXPLORE_DATA);
        setFilters((current) => ({ ...current, place: city }));
        notify(`Vous êtes ici : le lieu est réglé sur « ${city} ». Votre position reste sur votre appareil.`);
      },
      (error) => {
        setLocating(false);
        notify(failureMessage(error.code));
      },
      { enableHighAccuracy: true, timeout: 10_000, maximumAge: 60_000 },
    );
  }, [map, notify, setFilters, setUserPosition]);

  return { position: userPosition, locating, locate };
}
