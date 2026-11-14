// Noms écrits à la main pour un rendu identique partout (indépendant d'Intl et de la locale du navigateur)
// Hand-written names so the output is identical everywhere (independent of Intl and browser locale)
const WEEKDAYS_SHORT = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'];
const WEEKDAYS_LONG = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
const MONTHS_SHORT = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
const MONTHS_LONG = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// « Sam. 12 déc. »
export function formatShortDate(iso: string): string {
  const date = new Date(iso);
  return `${capitalize(WEEKDAYS_SHORT[date.getDay()])} ${date.getDate()} ${MONTHS_SHORT[date.getMonth()]}`;
}

// « Samedi 12 décembre »
export function formatLongDate(iso: string): string {
  const date = new Date(iso);
  return `${capitalize(WEEKDAYS_LONG[date.getDay()])} ${date.getDate()} ${MONTHS_LONG[date.getMonth()]}`;
}

// « 21 h 00 »
export function formatTime(iso: string): string {
  const date = new Date(iso);
  return `${date.getHours()} h ${String(date.getMinutes()).padStart(2, '0')}`;
}

// Morceaux d'une date pour la pastille : « Sam. », 12, « déc. »
// Date pieces for the badge: "Sam.", 12, "déc."
export function dateParts(iso: string): { weekday: string; day: number; month: string } {
  const date = new Date(iso);
  return {
    weekday: capitalize(WEEKDAYS_SHORT[date.getDay()]),
    day: date.getDate(),
    month: MONTHS_SHORT[date.getMonth()],
  };
}

// « 6 / 10 joueurs »
export function formatSeats(joined: number, capacity: number): string {
  return `${joined} / ${capacity} joueurs`;
}

// Temps de trajet estimé : à pied jusqu'à 2,5 km, à vélo jusqu'à 8 km, puis en voiture
// Estimated travel time: on foot up to 2.5 km, by bike up to 8 km, then by car
export function formatTravel(distanceKm: number): string {
  if (distanceKm <= 2.5) return `${Math.max(1, Math.round(distanceKm * 12))} min à pied`;
  if (distanceKm <= 8) return `${Math.round(distanceKm * 4)} min à vélo`;
  return `${Math.round(distanceKm * 2.5)} min en voiture`;
}
