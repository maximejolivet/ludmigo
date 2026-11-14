import { useExplore } from '../context';
import { formatSeats } from '../format';
import { matchesFavorite } from '../recommend';
import type { Meetup } from '../types';
import { Icon } from './Icon';
import { participantCount } from './JoinButton';
import { TAG, TAG_FULL, TAG_INFO, TAG_SUCCESS, TAG_WARNING } from './styles';

// Dernières places : en dessous de ce nombre de places libres, l'étiquette passe en alerte
// Last seats: below this number of free seats, the tag switches to a warning
const LAST_SEATS_THRESHOLD = 2;

// Étiquette des places : neutre, « dernières places » ou « complet », selon ce qu'il reste
// Seats tag: neutral, "last seats" or "full", depending on what is left
export function SeatsTag({ meetup, className = '' }: { meetup: Meetup; className?: string }) {
  const { joinedIds } = useExplore();
  const count = participantCount(meetup, joinedIds);
  const left = meetup.capacity - count;

  if (left <= 0) {
    return <span className={`${TAG} ${TAG_FULL} ${className}`}>Complet</span>;
  }
  if (left <= LAST_SEATS_THRESHOLD) {
    return (
      <span className={`${TAG} ${TAG_WARNING} ${className}`}>
        <Icon name="users" size={14} />
        Plus que {left} {left > 1 ? 'places' : 'place'}
      </span>
    );
  }
  return (
    <span className={`${TAG} ${TAG_INFO} ${className}`}>
      <Icon name="users" size={14} />
      {formatSeats(count, meetup.capacity)}
    </span>
  );
}

// Étiquette « Débutants bienvenus »
// "Beginners welcome" tag
export function BeginnerTag({ className = '' }: { className?: string }) {
  return (
    <span className={`${TAG} ${TAG_SUCCESS} ${className}`}>
      <Icon name="check" size={14} />
      Débutants bienvenus
    </span>
  );
}

// Étiquette « Pour vous » : le jeu fait partie des jeux préférés du profil
// "For you" tag: the game is one of the profile's favourite games
export function ForYouTag({ meetup, className = '' }: { meetup: Meetup; className?: string }) {
  const { profile } = useExplore();
  if (!matchesFavorite(meetup, profile)) return null;
  return (
    <span className={`${TAG} ${TAG_WARNING} ${className}`}>
      <Icon name="compass" size={14} />
      Pour vous
    </span>
  );
}
