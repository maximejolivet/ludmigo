import { Link } from 'react-router';
import { useExplore } from '../context';
import { NOW } from '../data';
import { formatShortDate, formatTime, formatTravel } from '../format';
import type { Venue } from '../types';
import { openStatus } from '../venues';
import { CardImage } from './CardImage';
import { Icon } from './Icon';
import { BUTTON_ICON, BUTTON_OUTLINE, TAG, TAG_FULL, TAG_INFO, TAG_SUCCESS } from './styles';

// Nombre maximal de rendez-vous listés sur la fiche
// Maximum number of appointments listed on the page
const MAX_UPCOMING = 3;

// Fiche d'un établissement : horaires, jeux sur place et prochains rendez-vous
// Venue page: opening hours, games on site and upcoming appointments
export function VenueDetail({ venue }: { venue: Venue }) {
  const { data, notify } = useExplore();
  const status = openStatus(venue.schedule, NOW);
  const byStart = <T extends { startsAt: string }>(items: T[]) =>
    [...items].sort((a, b) => a.startsAt.localeCompare(b.startsAt));
  const meetups = byStart(data.meetups.filter((meetup) => meetup.venueName === venue.name)).slice(0, MAX_UPCOMING);
  const events = byStart(data.events.filter((event) => event.organizerName === venue.name)).slice(0, MAX_UPCOMING);

  return (
    <section aria-labelledby="venue-title" className="flex flex-col gap-3 px-4 pt-3.5 pb-3.5">
      <div className="relative overflow-hidden rounded-2xl border-2 border-edge">
        <CardImage kind="venue" label={venue.name} width={360} height={120} className="h-[120px] w-full" />
        <Link to="/explorer" aria-label="Fermer la fiche de l'établissement" className={`${BUTTON_ICON} absolute top-2 right-2`}>
          <Icon name="close" size={22} />
        </Link>
      </div>

      <div className="flex items-start justify-between gap-3">
        <h2 id="venue-title" className="m-0 text-[22px] leading-tight font-bold">
          {venue.name}
        </h2>
        <span className={`${TAG} ${TAG_SUCCESS} mt-1 shrink-0`}>{venue.kind}</span>
      </div>

      <ul className="m-0 flex list-none flex-col gap-2 p-0 text-[15px]">
        <li className="flex items-center gap-3">
          <Icon name="clock" size={22} className="shrink-0 text-accent" />
          <span className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
            <span>{venue.hours}</span>
            <span className={`${TAG} ${status.open ? TAG_SUCCESS : TAG_FULL}`}>{status.label}</span>
          </span>
        </li>
        <li className="flex items-center gap-3">
          <Icon name="pin" size={22} className="shrink-0 text-accent" />
          <span>
            {venue.district ? `${venue.district}, ` : ''}
            {venue.city} · {formatTravel(venue.distanceKm)}
          </span>
        </li>
        <li className="flex items-center gap-3">
          <Icon name="dice" size={22} className="shrink-0 text-accent" />
          <span>{venue.gamesCount} jeux disponibles sur place</span>
        </li>
      </ul>

      {venue.tags.length > 0 && (
        <ul aria-label="Ambiance et accessibilité" className="m-0 flex list-none flex-wrap gap-1.5 p-0">
          {venue.tags.map((tag) => (
            <li key={tag} className={`${TAG} ${TAG_INFO}`}>
              {tag}
            </li>
          ))}
        </ul>
      )}

      {(meetups.length > 0 || events.length > 0) && (
        <div className="flex flex-col gap-1.5">
          <h3 className="m-0 text-[15px] font-bold">Prochains rendez-vous</h3>
          <ul className="m-0 flex list-none flex-col p-0 text-sm">
            {meetups.map((meetup) => (
              <li key={meetup.id}>
                <Link
                  to={`/explorer/partie/${meetup.id}`}
                  className="flex min-h-11 items-center justify-between gap-3 text-link-text"
                >
                  <span className="font-bold">{meetup.title}</span>
                  <span className="shrink-0 text-fg-soft">
                    {formatShortDate(meetup.startsAt)}, {formatTime(meetup.startsAt)}
                  </span>
                </Link>
              </li>
            ))}
            {events.map((event) => (
              <li key={event.id} className="flex min-h-11 items-center justify-between gap-3">
                <span className="font-bold">{event.title}</span>
                <span className="shrink-0 text-fg-soft">
                  {formatShortDate(event.startsAt)}, {formatTime(event.startsAt)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        type="button"
        onClick={() => notify("L'itinéraire arrive bientôt.")}
        className={`${BUTTON_OUTLINE} min-h-12 text-[15px]`}
      >
        <Icon name="pin" size={20} />
        Itinéraire
      </button>
    </section>
  );
}
