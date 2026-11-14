import { Link, useLocation } from 'react-router';
import { downloadIcs, meetupToIcs } from '../calendar';
import { useExplore } from '../context';
import { ATTENDEES } from '../data';
import { formatLongDate, formatTime, formatTravel } from '../format';
import type { Level, Meetup } from '../types';
import { CardImage } from './CardImage';
import { Complexity } from './Complexity';
import { DateBadge } from './DateBadge';
import { Icon } from './Icon';
import { JoinButton, participantCount } from './JoinButton';
import { AVATAR, BUTTON_ICON, BUTTON_OUTLINE, TAG, TAG_INFO, TAG_SUCCESS } from './styles';
import { BeginnerTag, ForYouTag, SeatsTag } from './Tags';

const LEVEL_LABELS: Record<Level, string> = { beginner: 'Débutant', expert: 'Confirmé' };

// « Qui vient ? » : les inscrits avec leur niveau et leurs jeux préférés, pour savoir à quoi s'attendre
// "Who is coming?": signed-up players with their level and favourite games, to know what to expect
function Attendees({ meetup }: { meetup: Meetup }) {
  const { joinedIds } = useExplore();
  const joined = joinedIds.has(meetup.id);
  const count = participantCount(meetup, joinedIds);

  return (
    <details className="rounded-xl border-2 border-line px-3">
      <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-2 text-[15px] font-bold">
        Qui vient ? <span className="text-sm font-medium text-fg-soft">{count} inscrits</span>
      </summary>
      <ul className="m-0 mb-2 flex list-none flex-col gap-2 p-0">
        {joined && (
          <li className="flex items-center justify-between gap-2 text-sm">
            <strong>Vous</strong>
            <span className={`${TAG} ${TAG_SUCCESS}`}>Inscrit·e</span>
          </li>
        )}
        {meetup.participants.map((initials) => {
          const attendee = ATTENDEES[initials];
          return (
            <li key={initials} className="flex items-start justify-between gap-3 text-sm">
              <span className="flex min-w-0 flex-col">
                <strong>{attendee?.name ?? initials}</strong>
                {attendee && <span className="text-fg-soft">{attendee.favorites.join(', ')}</span>}
              </span>
              {attendee && <span className={`${TAG} ${TAG_INFO} shrink-0`}>{LEVEL_LABELS[attendee.level]}</span>}
            </li>
          );
        })}
      </ul>
    </details>
  );
}

// Détail d'une partie sélectionnée sur la carte
// Detail of a meetup selected on the map
export function MeetupDetail({ meetup }: { meetup: Meetup }) {
  const { joinedIds, notify } = useExplore();
  const location = useLocation();
  const count = participantCount(meetup, joinedIds);
  const joined = joinedIds.has(meetup.id);
  // Raisons du choix quand on arrive depuis « Trouve-moi une partie »
  // Reasons for the choice when arriving from "Find me a meetup"
  const reasons = (location.state as { reasons?: string[] } | null)?.reasons;

  return (
    <section aria-labelledby="meetup-title" className="flex flex-col gap-3 px-4 pt-3.5 pb-3.5">
      <div className="relative overflow-hidden rounded-2xl border-2 border-edge">
        <CardImage kind="meetup" label={meetup.game} width={360} height={140} className="h-[140px] w-full" />
        <DateBadge iso={meetup.startsAt} className="absolute top-2.5 left-2.5" />
        <Link to="/explorer" aria-label="Fermer le détail de la partie" className={`${BUTTON_ICON} absolute top-2 right-2`}>
          <Icon name="close" size={22} />
        </Link>
      </div>

      {reasons && reasons.length > 0 && (
        <div role="note" className="flex flex-col gap-1 rounded-xl border-2 border-edge bg-warning-tint p-3 text-sm">
          <strong className="flex items-center gap-2">
            <Icon name="compass" size={20} />
            Choisie pour vous
          </strong>
          <ul className="m-0 list-disc pl-5">
            {reasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 id="meetup-title" className="m-0 text-[22px] leading-tight font-bold">
            {meetup.title}
          </h2>
          <p className="m-0 mt-0.5 text-sm text-fg-soft">{meetup.game}</p>
        </div>
        <div className="mt-1 flex shrink-0 flex-col items-end gap-1">
          <SeatsTag meetup={meetup} />
          {meetup.beginnerFriendly && <BeginnerTag />}
          <ForYouTag meetup={meetup} />
        </div>
      </div>

      <p className="m-0 flex items-center gap-2.5 text-sm leading-tight">
        <span aria-hidden="true" className={`${AVATAR} size-9 bg-link text-[13px]`}>
          {meetup.organizer.initials}
        </span>
        <span>
          <span className="text-fg-soft">Organisé par</span>
          <br />
          <strong className="text-link-text">{meetup.organizer.name}</strong>
        </span>
      </p>

      <ul className="m-0 flex list-none flex-col gap-2 p-0 text-[15px]">
        <li className="flex items-center gap-3">
          <Icon name="users" size={22} className="shrink-0 text-accent" />
          <span>
            {meetup.capacity} joueurs · {count} inscrits
          </span>
        </li>
        <li className="flex items-center gap-3">
          <Icon name="dice" size={22} className="shrink-0 text-accent" />
          <span className="flex items-center gap-2">
            Difficulté <Complexity level={meetup.complexity} />
          </span>
        </li>
        <li className="flex items-center gap-3">
          <Icon name="clock" size={22} className="text-accent" />
          <span>
            {formatLongDate(meetup.startsAt)} · {formatTime(meetup.startsAt)}
          </span>
        </li>
        <li className="flex items-start gap-3">
          <Icon name="pin" size={22} className="mt-px shrink-0 text-accent" />
          <span className="leading-tight">
            {meetup.venueName} · {meetup.venueKind.toLowerCase()}
            <br />
            <span className="text-sm text-fg-soft">
              {meetup.district ? `${meetup.district}, ` : ''}
              {meetup.city} · {formatTravel(meetup.distanceKm)}
            </span>
          </span>
        </li>
      </ul>

      <Attendees meetup={meetup} />

      <div className="mt-0.5 flex gap-2.5 pb-[3px]">
        <button
          type="button"
          onClick={() => notify('La fiche détaillée arrive bientôt.')}
          className={`${BUTTON_OUTLINE} min-h-12 flex-1 text-[15px]`}
        >
          En savoir plus
        </button>
        <JoinButton meetup={meetup} className="min-h-12 flex-1 text-[15px]" />
      </div>

      {joined && (
        <div className="flex gap-2.5 pb-[3px]">
          <button type="button" onClick={() => downloadIcs(meetupToIcs(meetup))} className={`${BUTTON_OUTLINE} flex-1`}>
            <Icon name="calendar" size={20} />
            Ajouter à l'agenda
          </button>
        </div>
      )}
    </section>
  );
}
