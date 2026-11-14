import { Link } from 'react-router';
import { useExplore } from '../context';
import { formatTime, formatTravel } from '../format';
import type { Meetup, VenueEvent } from '../types';
import { CardImage } from './CardImage';
import { Complexity } from './Complexity';
import { DateBadge } from './DateBadge';
import { JoinButton } from './JoinButton';
import { BUTTON_LINK, BUTTON_OUTLINE } from './styles';
import { ForYouTag, SeatsTag } from './Tags';

// Heure et lieu : « 21 h 00 · Chez ta mère » (la date est sur la pastille de l'image)
// Time and place: "21 h 00 · Chez ta mère" (the date is on the image badge)
function timeAndPlace(iso: string, place: string): string {
  return `${formatTime(iso)} · ${place}`;
}

// Carte compacte d'une partie, dans le volet du bas de la carte
// Compact meetup card, in the bottom sheet of the map
export function MeetupSheetCard({ meetup }: { meetup: Meetup }) {
  return (
    <article className="flex shrink-0 basis-[300px] snap-start flex-col gap-2.5 rounded-2xl border-2 border-edge bg-surface p-2.5">
      <div className="flex gap-3">
        <div className="relative shrink-0 overflow-hidden rounded-xl">
          <CardImage kind="meetup" label={meetup.game} width={96} height={96} className="size-24" />
          <DateBadge iso={meetup.startsAt} compact className="absolute top-1.5 left-1.5" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <h3 className="m-0 text-base leading-tight font-bold">{meetup.title}</h3>
          <span className="truncate text-sm text-fg-soft">{timeAndPlace(meetup.startsAt, meetup.venueName)}</span>
          <span className="text-sm text-fg-soft">{formatTravel(meetup.distanceKm)}</span>
          <span className="mt-1 flex flex-wrap gap-1">
            <SeatsTag meetup={meetup} />
            <ForYouTag meetup={meetup} />
          </span>
        </div>
      </div>
      <Link to={`/explorer/partie/${meetup.id}`} className={BUTTON_LINK}>
        Voir la partie
      </Link>
    </article>
  );
}

// Carte d'une partie dans la vue liste et le panneau ordinateur
// Meetup card in the list view and the desktop panel
export function MeetupListCard({ meetup }: { meetup: Meetup }) {
  return (
    <article className="overflow-hidden rounded-2xl border-2 border-edge bg-surface">
      <div className="relative">
        <CardImage kind="meetup" label={meetup.game} width={400} height={160} className="h-32 w-full" />
        <DateBadge iso={meetup.startsAt} className="absolute top-3 left-3" />
        <SeatsTag meetup={meetup} className="absolute right-3 bottom-3" />
      </div>
      <div className="flex flex-col gap-2.5 p-3">
        <div className="flex flex-col gap-0.5">
          <h3 className="m-0 text-[17px] leading-tight font-bold">{meetup.title}</h3>
          <span className="text-sm text-fg-soft">
            {timeAndPlace(meetup.startsAt, `${meetup.venueName}, ${meetup.district ?? meetup.city}`)} · {formatTravel(meetup.distanceKm)}
          </span>
          <span className="mt-1 flex flex-wrap items-center gap-2">
            <Complexity level={meetup.complexity} />
            <ForYouTag meetup={meetup} />
          </span>
        </div>
        <div className="flex gap-2.5 pb-[3px]">
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
  return (
    <article className="flex items-center gap-3 rounded-2xl border-2 border-edge bg-surface p-2.5">
      <div className="relative shrink-0 overflow-hidden rounded-xl">
        <CardImage kind="event" label={event.title} width={88} height={88} className="size-[88px]" />
        <DateBadge iso={event.startsAt} compact className="absolute top-1.5 left-1.5" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <h3 className="m-0 text-base leading-tight font-bold">{event.title}</h3>
        <span className="text-sm text-fg-soft">{formatTime(event.startsAt)}</span>
        <span className="text-sm text-fg-soft">
          Organisé par <strong className="text-link-text">{event.organizerName}</strong>
        </span>
      </div>
      <Link to={`/explorer/evenement/${event.id}`} aria-label={`Voir ${event.title}`} className={`${BUTTON_LINK} shrink-0 px-4`}>
        Voir
      </Link>
    </article>
  );
}
