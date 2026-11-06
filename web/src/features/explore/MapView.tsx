import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import mapBackground from './assets/map-background.svg';
import { CategoryChips } from './components/CategoryChips';
import { MeetupSheetCard } from './components/Cards';
import { Icon, PinIcon } from './components/Icon';
import { MeetupDetail } from './components/MeetupDetail';
import { NoResults } from './components/NoResults';
import { BUTTON_PRIMARY, PIN_COLOR } from './components/styles';
import { ViewToggle } from './components/ViewToggle';
import { useExplore } from './context';
import { EXPLORE_DATA } from './data';
import { MAP_SIZE } from './types';
import type { Category, MapPoint } from './types';

const ZOOM_MIN = 1;
const ZOOM_MAX = 1.6;
const ZOOM_STEP = 0.2;

const CONTROL =
  'flex size-11 cursor-pointer items-center justify-center rounded-full border-0 bg-white text-ink shadow-[0_2px_8px_rgba(62,62,62,.25)] disabled:opacity-40';

interface PinProps {
  point: MapPoint;
  category: Category;
  selected?: boolean;
  label?: string;
  onSelect?: () => void;
}

// Épingle posée sur le plan : un bouton pour les parties, une image décorative pour le reste
// Pin placed on the plane: a button for meetups, a decorative image for the rest
function MapPin({ point, category, selected = false, label, onSelect }: PinProps) {
  const style = {
    left: `${(point.x / MAP_SIZE.width) * 100}%`,
    top: `${(point.y / MAP_SIZE.height) * 100}%`,
  };
  const icon = (
    <PinIcon
      className={`block h-[37px] w-7 ${PIN_COLOR[category]} ${
        selected ? 'origin-bottom scale-[1.4] drop-shadow-[0_2px_3px_rgba(0,0,0,.35)]' : ''
      }`}
    />
  );

  if (!onSelect) {
    return (
      <span aria-hidden="true" className="absolute -translate-x-1/2 -translate-y-full" style={style}>
        {icon}
      </span>
    );
  }

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={selected}
      onClick={onSelect}
      style={style}
      className={`absolute -translate-x-1/2 -translate-y-full cursor-pointer border-0 bg-transparent p-0 before:absolute before:-inset-x-2 before:-inset-y-1 before:content-[''] ${
        selected ? 'z-10' : ''
      }`}
    >
      {icon}
    </button>
  );
}

// Écran principal : carte, volet des parties proches ou détail de la partie choisie
// Main screen: map, nearby meetups sheet or detail of the chosen meetup
export function MapView() {
  const { results, notify } = useExplore();
  const { meetupId } = useParams();
  const navigate = useNavigate();
  const [zoom, setZoom] = useState(ZOOM_MIN);

  const selected = meetupId ? EXPLORE_DATA.meetups.find((meetup) => meetup.id === meetupId) : undefined;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <section aria-label="Carte" className="relative min-h-0 flex-1 overflow-hidden bg-[#ecefec]">
        <div
          className="absolute top-0 left-0 w-full origin-[50%_30%]"
          style={{ aspectRatio: `${MAP_SIZE.width} / ${MAP_SIZE.height}`, transform: `scale(${zoom})` }}
        >
          <img src={mapBackground} alt="" className="block size-full" />
          {selected && (
            <span
              aria-hidden="true"
              className="absolute size-[84px] -translate-x-1/2 -translate-y-[85%] rounded-full border-2 border-pin-meetups/45 bg-pin-meetups/20"
              style={{
                left: `${(selected.position.x / MAP_SIZE.width) * 100}%`,
                top: `${(selected.position.y / MAP_SIZE.height) * 100}%`,
              }}
            />
          )}
          {results.players.map((player) => (
            <MapPin key={player.id} point={player.position} category="players" />
          ))}
          {results.venues.map((venue) => (
            <MapPin key={venue.id} point={venue.position} category="venues" />
          ))}
          {results.events.map((event) => (
            <MapPin key={event.id} point={event.position} category="events" />
          ))}
          {results.meetups.map((meetup) => (
            <MapPin
              key={meetup.id}
              point={meetup.position}
              category="meetups"
              selected={meetup.id === selected?.id}
              label={`Partie : ${meetup.title}`}
              onSelect={() => navigate(`/explorer/partie/${meetup.id}`)}
            />
          ))}
        </div>

        <p className="sr-only">
          Carte de Nantes : {results.meetups.length} parties, {results.events.length} événements,{' '}
          {results.venues.length} établissements et {results.players.length} zones de joueurs. La même information est
          disponible dans la vue liste.
        </p>

        <CategoryChips variant="map" className="absolute inset-x-0 top-2.5 px-3 pt-0.5 pb-1.5" />
        <ViewToggle current="map" className="absolute top-16 left-3 bg-white shadow-[0_2px_8px_rgba(62,62,62,.25)]" />

        <div className="absolute top-16 right-3 flex flex-col gap-2">
          <button
            type="button"
            aria-label="Zoom avant"
            disabled={zoom >= ZOOM_MAX}
            onClick={() => setZoom((current) => Math.min(ZOOM_MAX, +(current + ZOOM_STEP).toFixed(2)))}
            className={CONTROL}
          >
            <Icon name="plus" size={22} />
          </button>
          <button
            type="button"
            aria-label="Zoom arrière"
            disabled={zoom <= ZOOM_MIN}
            onClick={() => setZoom((current) => Math.max(ZOOM_MIN, +(current - ZOOM_STEP).toFixed(2)))}
            className={CONTROL}
          >
            <Icon name="minus" size={22} />
          </button>
        </div>

        {!meetupId && (
          <button
            type="button"
            onClick={() => notify("L'organisation d'une partie arrive bientôt.")}
            className={`${BUTTON_PRIMARY} absolute bottom-10 left-3 min-h-[52px] px-5 text-base shadow-[0_3px_10px_rgba(62,62,62,.3)]`}
          >
            <Icon name="plus" size={22} />
            Organiser une partie
          </button>
        )}
      </section>

      <div className="relative z-10 -mt-6 rounded-t-3xl bg-white shadow-[0_-6px_18px_rgba(62,62,62,.16)]">
        <div aria-hidden="true" className="mx-auto mt-2 h-[5px] w-10 rounded-full bg-[#cfcfcf]" />
        {selected ? (
          <MeetupDetail meetup={selected} />
        ) : meetupId ? (
          <div className="flex flex-col items-start gap-3 p-4">
            <p className="m-0">Cette partie n'existe plus.</p>
            <Link to="/explorer" className={BUTTON_PRIMARY}>
              Revenir à la carte
            </Link>
          </div>
        ) : (
          <section aria-labelledby="nearby-title" className="pt-2 pb-3">
            <div className="flex items-baseline justify-between px-4">
              <h2 id="nearby-title" className="m-0 text-lg leading-snug font-bold">
                Les parties près de chez vous
              </h2>
              <span className="text-sm text-ink-soft">
                {results.meetups.length} {results.meetups.length > 1 ? 'parties' : 'partie'}
              </span>
            </div>
            {results.meetups.length > 0 ? (
              <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pt-2.5 pb-1 [scrollbar-width:none]">
                {results.meetups.map((meetup) => (
                  <MeetupSheetCard key={meetup.id} meetup={meetup} />
                ))}
              </div>
            ) : (
              <div className="px-4 pt-2.5">
                <NoResults subject="partie" />
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
