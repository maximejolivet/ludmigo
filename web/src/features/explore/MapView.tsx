import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import type { Map as LeafletMapInstance } from 'leaflet';
import { EventDetail } from './components/EventDetail';
import { FilterChips } from './components/FilterChips';
import { FindMeetupButton } from './components/FindMeetupButton';
import { Icon } from './components/Icon';
import { MeetupDetail } from './components/MeetupDetail';
import { NearbySheet } from './components/NearbySheet';
import { PlayerDetail } from './components/PlayerDetail';
import { PawnScene } from './components/PawnScene';
import { ResultsSections } from './components/ResultsSections';
import { BUTTON_ICON, BUTTON_PRIMARY } from './components/styles';
import { VenueDetail } from './components/VenueDetail';
import { ViewToggle } from './components/ViewToggle';
import { useExplore } from './context';
import { LeafletMap } from './LeafletMap';
import { useIsDesktop } from './useIsDesktop';
import { useLocate } from './useLocate';

// Écran principal : carte, puis volet (mobile) ou panneau de résultats (ordinateur)
// Main screen: map, then sheet (mobile) or results panel (desktop)
export function MapView() {
  const { data, results, notify } = useExplore();
  const { meetupId, venueId, eventId, playerId } = useParams();
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();
  const [map, setMap] = useState<LeafletMapInstance | null>(null);
  const { position, locating, locate } = useLocate(map);

  const meetup = meetupId ? data.meetups.find((item) => item.id === meetupId) : undefined;
  const venue = venueId ? data.venues.find((item) => item.id === venueId) : undefined;
  const event = eventId ? data.events.find((item) => item.id === eventId) : undefined;
  const player = playerId ? data.players.find((item) => item.id === playerId) : undefined;
  const hasSelection = Boolean(meetupId || venueId || eventId || playerId);
  const total = results.meetups.length + results.events.length;

  // Message quand l'élément demandé n'existe pas
  // Message when the requested item does not exist
  const missingLabel = meetupId
    ? "Cette partie n'existe plus."
    : venueId
      ? "Cet établissement n'existe plus."
      : eventId
        ? "Cet événement n'existe plus."
        : "Ce joueur n'est plus visible.";
  const found = meetup ?? venue ?? event ?? player;

  // Contenu sous la carte quand un élément est choisi : sa fiche, ou un message s'il est introuvable
  // Content below the map when an item is chosen: its page, or a message if it is missing
  const detail = meetup ? (
    <MeetupDetail meetup={meetup} />
  ) : venue ? (
    <VenueDetail venue={venue} />
  ) : event ? (
    <EventDetail event={event} />
  ) : player ? (
    <PlayerDetail player={player} />
  ) : hasSelection && !found ? (
    <div className="flex flex-col items-start gap-3 p-4">
      <PawnScene className="h-14 w-auto" />
      <p className="m-0">{missingLabel}</p>
      <Link to="/explorer" className={BUTTON_PRIMARY}>
        Revenir à la carte
      </Link>
    </div>
  ) : null;

  return (
    <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
      <div className="relative flex min-h-0 flex-1 flex-col">
        {/* `isolate` garde les z-index internes de Leaflet à l'intérieur de la carte */}
        {/* `isolate` keeps Leaflet's internal z-indexes inside the map */}
        <section aria-label="Carte" className="relative isolate min-h-0 flex-1 overflow-hidden bg-[#e9f2ec]">
          <LeafletMap
            userPosition={position}
            selectedId={meetupId}
            selectedVenueId={venueId}
            selectedEventId={eventId}
            selectedPlayerId={playerId}
            onSelectMeetup={(id) => navigate(`/explorer/partie/${id}`)}
            onSelectVenue={(id) => navigate(`/explorer/lieu/${id}`)}
            onSelectEvent={(id) => navigate(`/explorer/evenement/${id}`)}
            onSelectPlayer={(id) => navigate(`/explorer/joueur/${id}`)}
            onReady={setMap}
          />

          <p className="sr-only">
            Carte de France : {results.meetups.length} parties, {results.events.length} événements,{' '}
            {results.venues.length} établissements et {results.players.length} zones de joueurs. La même information
            est disponible dans la liste des résultats.{position && ' Votre position est affichée sur la carte.'}
          </p>

          <FilterChips className="absolute inset-x-0 top-2.5 z-[1000] px-3 pt-0.5 pb-1.5 lg:right-auto lg:left-3 lg:px-0" />
          {!isDesktop && (
            <ViewToggle
              current="map"
              className="absolute top-16 left-3 z-[1000] bg-surface/90 shadow-[0_2px_8px_rgba(62,62,62,.25)] backdrop-blur"
            />
          )}

          <div className="absolute top-16 right-3 z-[1000] flex flex-col gap-2 lg:top-3">
            <button type="button" aria-label="Zoom avant" onClick={() => map?.zoomIn()} className={BUTTON_ICON}>
              <Icon name="plus" size={22} />
            </button>
            <button type="button" aria-label="Zoom arrière" onClick={() => map?.zoomOut()} className={BUTTON_ICON}>
              <Icon name="minus" size={22} />
            </button>
            <button
              type="button"
              aria-label="Me localiser"
              aria-busy={locating}
              disabled={locating}
              onClick={locate}
              className={`${BUTTON_ICON} mt-1 disabled:opacity-60`}
            >
              <Icon name="locate" size={22} />
            </button>
          </div>

          {!isDesktop && !hasSelection && (
            <FindMeetupButton className="absolute bottom-[6.25rem] left-3 z-[1000] min-h-[52px] px-5 text-base" />
          )}
          {!isDesktop && !hasSelection && (
            <button
              type="button"
              onClick={() => notify("L'organisation d'une partie arrive bientôt.")}
              className={`${BUTTON_PRIMARY} absolute bottom-10 left-3 z-[1000] min-h-[52px] px-5 text-base`}
            >
              <Icon name="plus" size={22} />
              Organiser une partie
            </button>
          )}
        </section>

        {isDesktop ? (
          // Ordinateur : le détail devient une carte flottante au-dessus de la carte
          // Desktop: the detail becomes a floating card above the map
          detail && (
            <div className="absolute bottom-6 left-6 z-10 max-h-[calc(100%-3rem)] w-[480px] overflow-y-auto rounded-3xl bg-surface shadow-[0_12px_40px_rgba(0,0,0,.25)]">
              {detail}
            </div>
          )
        ) : detail ? (
          <div className="relative z-10 -mt-6 max-h-[70%] overflow-y-auto rounded-t-3xl bg-surface shadow-[0_-6px_18px_rgba(62,62,62,.16)]">
            <div aria-hidden="true" className="mx-auto mt-2 h-[5px] w-10 rounded-full bg-fg-soft/40" />
            {detail}
          </div>
        ) : (
          <NearbySheet />
        )}
      </div>

      {isDesktop && (
        <aside
          aria-label="Résultats"
          className="flex w-[480px] shrink-0 flex-col gap-5 overflow-y-auto border-l border-line bg-canvas p-4"
        >
          <FindMeetupButton className="min-h-12 text-[15px]" />
          <p className="m-0 text-sm text-fg-soft" aria-live="polite">
            {total} {total > 1 ? 'résultats' : 'résultat'}
          </p>
          <ResultsSections />
        </aside>
      )}
    </div>
  );
}
