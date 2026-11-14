import { Link } from 'react-router';
import { useExplore } from '../context';
import { formatTravel } from '../format';
import type { Level, Player } from '../types';
import { Icon } from './Icon';
import { AVATAR, BUTTON_ICON, BUTTON_PRIMARY, TAG, TAG_INFO, TAG_SUCCESS, TAG_WARNING } from './styles';

const LEVEL_LABELS: Record<Level, string> = { beginner: 'Débutant', expert: 'Confirmé' };

// Initiales d'un nom abrégé : « Alix L. » devient « AL »
// Initials of an abbreviated name: "Alix L." becomes "AL"
function initialsOf(name: string): string {
  return name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase();
}

// Fiche d'un joueur : ce qu'il a choisi de partager (niveau, jeux, ce qu'il cherche), sans position exacte
// Player card: what they chose to share (level, games, what they look for), without an exact position
export function PlayerDetail({ player }: { player: Player }) {
  const { notify } = useExplore();
  const firstName = player.name.split(' ')[0];

  return (
    <section aria-labelledby="player-title" className="flex flex-col gap-3 px-4 pt-3.5 pb-3.5">
      <div className="flex items-start gap-3">
        <span aria-hidden="true" className={`${AVATAR} size-14 shrink-0 bg-pin-players text-xl text-ink`}>
          {initialsOf(player.name)}
        </span>
        <div className="min-w-0 flex-1">
          <h2 id="player-title" className="m-0 text-[22px] leading-tight font-bold">
            {player.name}
          </h2>
          <p className="m-0 mt-0.5 text-sm text-fg-soft">Actif·ve {player.lastSeen}</p>
        </div>
        <Link to="/explorer" aria-label="Fermer la fiche du joueur" className={BUTTON_ICON}>
          <Icon name="close" size={22} />
        </Link>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <span className={`${TAG} ${TAG_INFO}`}>{LEVEL_LABELS[player.level]}</span>
        {player.status && (
          <span className={`${TAG} ${TAG_WARNING}`}>
            <Icon name="compass" size={14} />
            {player.status}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <h3 className="m-0 text-[15px] font-bold">Jeux préférés</h3>
        <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
          {player.favorites.map((game) => (
            <li key={game} className={`${TAG} ${TAG_SUCCESS}`}>
              {game}
            </li>
          ))}
        </ul>
      </div>

      <p className="m-0 flex items-start gap-3 text-[15px]">
        <Icon name="pin" size={22} className="mt-px shrink-0 text-accent" />
        <span className="leading-tight">
          Autour de {player.district ?? player.city}
          <br />
          <span className="text-sm text-fg-soft">
            Position approximative, à {formatTravel(player.distanceKm)} de vous
          </span>
        </span>
      </p>

      <div className="pb-[3px]">
        <button
          type="button"
          onClick={() => notify(`Invitation envoyée à ${firstName}.`)}
          className={`${BUTTON_PRIMARY} min-h-12 w-full text-[15px]`}
        >
          <Icon name="users" size={20} />
          Inviter {firstName} à jouer
        </button>
      </div>
    </section>
  );
}
