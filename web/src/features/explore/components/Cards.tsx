import { Link } from 'react-router';
import { useExplore } from '../context';
import { formatSeats, formatShortDate, formatTime } from '../format';
import type { Meetup, VenueEvent } from '../types';
import { JoinButton, participantCount } from './JoinButton';
import { BUTTON_LINK, BUTTON_OUTLINE, PILL } from './styles';
import { TableArt } from './TableArt';

// Date et heure courtes : « Sam. 12 déc. · 21 h 00 »
// Short date and time: "Sam. 12 déc. · 21 h 00"
function when(iso: string): string {
  return `${formatShortDate(iso)} · ${formatTime(iso)}`;
}

// Carte compacte d'une partie, dans le volet du bas de la carte
// Compact meetup card, in the bottom sheet of the map
export function MeetupSheetCard({ meetup }: { meetup: Meetup }) {
  const { joinedIds } = useExplore();
  return (
    <article className="flex shrink-0 basis-[300px] snap-start flex-col gap-2 rounded-2xl border border-line bg-white p-2.5">
      <div className="flex gap-3">
        <div className="size-[72px] shrink-0 overflow-hidden rounded-xl bg-beige">
          <TableArt className="size-full" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <h3 className="m-0 text-base leading-tight font-bold">{meetup.title}</h3>
          <span className="text-sm text-ink-soft">{when(meetup.startsAt)}</span>
          <span className="truncate text-sm text-ink-soft">
            {meetup.venueName}
            {meetup.district ? ` · ${meetup.district}` : ` · ${meetup.city}`}
          </span>
          <span className={`${PILL} mt-0.5 self-start`}>
            {formatSeats(participantCount(meetup, joinedIds), meetup.capacity)}
          </span>
        </div>
      </div>
      <Link to={`/explorer/partie/${meetup.id}`} className={BUTTON_LINK}>
        Voir la partie
      </Link>
    </article>
  );
}

// Carte d'une partie dans la vue liste
// Meetup card in the list view
export function MeetupListCard({ meetup }: { meetup: Meetup }) {
  const { joinedIds } = useExplore();
  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-white">
      <TableArt className="block h-24 w-full" />
      <div className="flex flex-col gap-2 p-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="m-0 text-[17px] leading-tight font-bold">{meetup.title}</h3>
          <span className={`${PILL} shrink-0`}>
            {formatSeats(participantCount(meetup, joinedIds), meetup.capacity)}
          </span>
        </div>
        <span className="text-sm text-ink-soft">
          {when(meetup.startsAt)} · {meetup.district ?? meetup.city}
        </span>
        <div className="flex gap-2.5">
          <Link to={`/explorer/partie/${meetup.id}`} className={`${BUTTON_OUTLINE} flex-1`}>
            En savoir plus
          </Link>
          <JoinButton meetup={meetup} className="flex-1" />
        </div>
      </div>
    </article>
  );
}

// Carte d'un événement proposé par un établissement
// Card of an event offered by a venue
export function EventCard({ event }: { event: VenueEvent }) {
  const { notify } = useExplore();
  return (
    <article className="flex items-center gap-3 rounded-2xl border border-line bg-white p-2.5">
      <div className="size-[76px] shrink-0 overflow-hidden rounded-xl bg-beige">
        <TableArt className="size-full" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <h3 className="m-0 text-base leading-tight font-bold">{event.title}</h3>
        <span className="text-sm text-ink-soft">{when(event.startsAt)}</span>
        <span className="text-sm text-ink-soft">
          Organisé par <strong className="text-link">{event.organizerName}</strong>
        </span>
      </div>
      <button
        type="button"
        aria-label={`Voir ${event.title}`}
        onClick={() => notify('Le détail des événements arrive bientôt.')}
        className={`${BUTTON_LINK} shrink-0 px-3`}
      >
        Voir
      </button>
    </article>
  );
}
