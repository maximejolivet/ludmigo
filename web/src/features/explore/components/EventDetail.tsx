import { Link } from 'react-router';
import { downloadIcs, eventToIcs } from '../calendar';
import { useExplore } from '../context';
import { formatLongDate, formatTime, formatTravel } from '../format';
import type { VenueEvent } from '../types';
import { CardImage } from './CardImage';
import { DateBadge } from './DateBadge';
import { Icon } from './Icon';
import { BUTTON_ICON, BUTTON_OUTLINE, TAG, TAG_INFO, TAG_SUCCESS } from './styles';

// Détail d'un événement proposé par un établissement : date, lieu, prix et programme
// Detail of an event offered by a venue: date, place, price and programme
export function EventDetail({ event }: { event: VenueEvent }) {
  const { data, notify } = useExplore();
  // L'établissement organisateur, pour renvoyer vers sa fiche
  // The organising venue, to link to its page
  const venue = data.venues.find((item) => item.name === event.organizerName);
  const free = event.price === 'Gratuit';

  return (
    <section aria-labelledby="event-title" className="flex flex-col gap-3 px-4 pt-3.5 pb-3.5">
      <div className="relative overflow-hidden rounded-2xl border-2 border-edge">
        <CardImage kind="event" label={event.title} width={360} height={130} className="h-[130px] w-full" />
        <DateBadge iso={event.startsAt} className="absolute top-2.5 left-2.5" />
        <Link to="/explorer" aria-label="Fermer le détail de l'événement" className={`${BUTTON_ICON} absolute top-2 right-2`}>
          <Icon name="close" size={22} />
        </Link>
      </div>

      <div className="flex items-start justify-between gap-3">
        <h2 id="event-title" className="m-0 text-[22px] leading-tight font-bold">
          {event.title}
        </h2>
        <span className={`${TAG} ${free ? TAG_SUCCESS : TAG_INFO} mt-1 shrink-0`}>{event.price}</span>
      </div>

      <p className="m-0 text-sm text-fg-soft">
        Organisé par{' '}
        {venue ? (
          <Link to={`/explorer/lieu/${venue.id}`} className="font-bold text-link-text">
            {event.organizerName}
          </Link>
        ) : (
          <strong className="text-link-text">{event.organizerName}</strong>
        )}
      </p>

      <p className="m-0 text-[15px] leading-snug">{event.description}</p>

      <ul className="m-0 flex list-none flex-col gap-2 p-0 text-[15px]">
        <li className="flex items-center gap-3">
          <Icon name="clock" size={22} className="shrink-0 text-accent" />
          <span>
            {formatLongDate(event.startsAt)} · {formatTime(event.startsAt)}
          </span>
        </li>
        <li className="flex items-start gap-3">
          <Icon name="pin" size={22} className="mt-px shrink-0 text-accent" />
          <span className="leading-tight">
            {event.organizerName}
            <br />
            <span className="text-sm text-fg-soft">
              {event.district ? `${event.district}, ` : ''}
              {event.city} · {formatTravel(event.distanceKm)}
            </span>
          </span>
        </li>
      </ul>

      <div className="flex gap-2.5 pb-[3px]">
        <button type="button" onClick={() => downloadIcs(eventToIcs(event))} className={`${BUTTON_OUTLINE} flex-1`}>
          <Icon name="calendar" size={20} />
          Ajouter à l'agenda
        </button>
        <button
          type="button"
          onClick={() => notify("L'itinéraire arrive bientôt.")}
          className={`${BUTTON_OUTLINE} flex-1`}
        >
          <Icon name="pin" size={20} />
          Itinéraire
        </button>
      </div>
    </section>
  );
}
