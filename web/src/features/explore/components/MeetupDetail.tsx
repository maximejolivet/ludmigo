import { Link } from 'react-router';
import { useExplore } from '../context';
import { formatLongDate, formatTime } from '../format';
import type { Meetup } from '../types';
import { Icon } from './Icon';
import { JoinButton, participantCount } from './JoinButton';
import { AVATAR, BUTTON_OUTLINE, PILL } from './styles';
import { TableArt } from './TableArt';

// Nombre maximal d'avatars affichés avant le « +N »
// Maximum number of avatars shown before the "+N"
const MAX_AVATARS = 2;

const AVATAR_TONES = ['bg-[#0b7577]', 'bg-success', 'bg-ink'];

// Détail d'une partie sélectionnée sur la carte
// Detail of a meetup selected on the map
export function MeetupDetail({ meetup }: { meetup: Meetup }) {
  const { joinedIds, notify } = useExplore();
  const count = participantCount(meetup, joinedIds);
  const shown = meetup.participants.slice(0, MAX_AVATARS);
  const extra = count - shown.length;

  return (
    <section aria-labelledby="meetup-title" className="flex flex-col gap-3 px-4 pt-2 pb-3.5">
      <div className="relative h-[108px] overflow-hidden rounded-2xl bg-beige">
        <TableArt className="block size-full" />
        <Link
          to="/explorer"
          aria-label="Fermer le détail de la partie"
          className="absolute top-1 right-1 flex size-11 items-center justify-center rounded-full bg-white text-ink shadow"
        >
          <Icon name="close" size={22} />
        </Link>
      </div>

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 id="meetup-title" className="m-0 text-[22px] leading-tight font-bold">
            {meetup.title}
          </h2>
          <p className="m-0 mt-0.5 text-sm text-ink-soft">{meetup.game}</p>
        </div>
        {meetup.beginnerFriendly && <span className={`${PILL} mt-1 shrink-0`}>Débutants bienvenus</span>}
      </div>

      <p className="m-0 flex items-center gap-2.5 text-sm leading-tight">
        <span aria-hidden="true" className={`${AVATAR} size-9 bg-link text-[13px]`}>
          {meetup.organizer.initials}
        </span>
        <span>
          <span className="text-ink-soft">Organisé par</span>
          <br />
          <strong className="text-link">{meetup.organizer.name}</strong>
        </span>
      </p>

      <ul className="m-0 flex list-none flex-col gap-2 p-0 text-[15px]">
        <li className="flex items-center gap-3">
          <Icon name="users" size={22} className="text-petrol" />
          <span>
            {meetup.capacity} joueurs · {count} inscrits
          </span>
          <span aria-hidden="true" className="ml-auto flex">
            {shown.map((initials, index) => (
              <span
                key={initials}
                className={`${AVATAR} size-[26px] border-2 border-white text-[10px] ${AVATAR_TONES[index]} ${index > 0 ? '-ml-2' : ''}`}
              >
                {initials}
              </span>
            ))}
            {extra > 0 && (
              <span className={`${AVATAR} -ml-2 size-[26px] border-2 border-white bg-ink text-[10px]`}>+{extra}</span>
            )}
          </span>
        </li>
        <li className="flex items-center gap-3">
          <Icon name="clock" size={22} className="text-petrol" />
          <span>
            {formatLongDate(meetup.startsAt)} · {formatTime(meetup.startsAt)}
          </span>
        </li>
        <li className="flex items-start gap-3">
          <Icon name="pin" size={22} className="mt-px shrink-0 text-petrol" />
          <span className="leading-tight">
            {meetup.venueName} · {meetup.venueKind.toLowerCase()}
            <br />
            <span className="text-sm text-ink-soft">
              {meetup.district ? `${meetup.district}, ` : ''}
              {meetup.city}
            </span>
          </span>
        </li>
      </ul>

      <div className="mt-0.5 flex gap-2.5">
        <button
          type="button"
          onClick={() => notify('La fiche détaillée arrive bientôt.')}
          className={`${BUTTON_OUTLINE} min-h-12 flex-1 text-[15px]`}
        >
          En savoir plus
        </button>
        <JoinButton meetup={meetup} className="min-h-12 flex-1 text-[15px]" />
      </div>
    </section>
  );
}
