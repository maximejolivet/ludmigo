import { Icon } from './Icon';

// Difficulté d'un jeu en dés : de 1 (facile) à 5 (expert)
// Game difficulty shown as dice: from 1 (easy) to 5 (expert)
export function Complexity({ level, className = '' }: { level: number; className?: string }) {
  return (
    <span role="img" aria-label={`Difficulté ${level} sur 5`} className={`inline-flex gap-0.5 text-fg ${className}`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Icon key={n} name="dice" size={18} className={n <= level ? '' : 'opacity-25'} />
      ))}
    </span>
  );
}
