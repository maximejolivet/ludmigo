import { useExplore } from '../context';
import type { Meetup } from '../types';
import { Icon } from './Icon';
import { BUTTON_OUTLINE, BUTTON_PRIMARY, BUTTON_SUCCESS } from './styles';

// Nombre de joueurs inscrits, en comptant l'utilisateur fictif s'il participe
// Number of players signed up, counting the fictional user if they take part
export function participantCount(meetup: Meetup, joinedIds: ReadonlySet<string>): number {
  return meetup.participants.length + (joinedIds.has(meetup.id) ? 1 : 0);
}

// Bouton « Je participe » : bascule la participation. Le libellé ne change pas ; l'état est porté par
// aria-pressed, la coche et la couleur (jaune, puis vert une fois inscrit). Quand la partie est complète,
// il devient « Me prévenir » : liste d'attente, avec une alerte si une place se libère.
// "Join" button: toggles participation. The label does not change; the state is carried by
// aria-pressed, the check mark and the colour (yellow, then green once signed up). When the meetup is full,
// it becomes "Notify me": a waiting list with an alert if a seat frees up.
export function JoinButton({ meetup, className = '' }: { meetup: Meetup; className?: string }) {
  const { joinedIds, toggleJoin, watchedIds, toggleWatch, notify } = useExplore();
  const joined = joinedIds.has(meetup.id);
  const full = !joined && participantCount(meetup, joinedIds) >= meetup.capacity;

  if (full) {
    const watching = watchedIds.has(meetup.id);
    return (
      <button
        type="button"
        aria-pressed={watching}
        onClick={() => {
          toggleWatch(meetup.id);
          if (!watching) notify(`Nous vous prévenons si une place se libère pour « ${meetup.title} ».`);
        }}
        className={`${watching ? BUTTON_SUCCESS : BUTTON_OUTLINE} ${className}`}
      >
        <Icon name={watching ? 'check' : 'bell'} size={20} />
        Me prévenir
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-pressed={joined}
      onClick={() => {
        toggleJoin(meetup.id);
        if (!joined) {
          // Petit retour tactile et message court pour confirmer l'inscription
          // Light haptic feedback and a short message to confirm the sign-up
          navigator.vibrate?.(15);
          notify(`Vous participez à « ${meetup.title} ».`);
        }
      }}
      className={`${joined ? BUTTON_SUCCESS : BUTTON_PRIMARY} ${className}`}
    >
      {joined && <Icon name="check" size={20} />}
      Je participe
    </button>
  );
}
