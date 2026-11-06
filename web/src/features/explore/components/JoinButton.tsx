import { useExplore } from '../context';
import type { Meetup } from '../types';
import { Icon } from './Icon';
import { BUTTON_PRIMARY } from './styles';

// Nombre de joueurs inscrits, en comptant l'utilisateur fictif s'il participe
// Number of players signed up, counting the fictional user if they take part
export function participantCount(meetup: Meetup, joinedIds: ReadonlySet<string>): number {
  return meetup.participants.length + (joinedIds.has(meetup.id) ? 1 : 0);
}

// Bouton « Je participe » : bascule la participation, désactivé quand la partie est complète
// "Join" button: toggles participation, disabled when the meetup is full
export function JoinButton({ meetup, className = '' }: { meetup: Meetup; className?: string }) {
  const { joinedIds, toggleJoin } = useExplore();
  const joined = joinedIds.has(meetup.id);
  const full = !joined && participantCount(meetup, joinedIds) >= meetup.capacity;

  return (
    <button
      type="button"
      aria-pressed={joined}
      disabled={full}
      onClick={() => toggleJoin(meetup.id)}
      className={`${BUTTON_PRIMARY} ${className}`}
    >
      {joined ? (
        <>
          <Icon name="check" size={20} />
          Vous participez
        </>
      ) : full ? (
        'Complet'
      ) : (
        'Je participe'
      )}
    </button>
  );
}
