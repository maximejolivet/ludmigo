import { Icon } from './Icon';

// Difficulté d'un jeu en dés : de 1 (débutant) à 3 (expert)
// Game difficulty shown as dice: from 1 (beginner) to 3 (expert)
export function Complexity({ level, label }: { level: number; label: string }) {
  return (
    <span role="img" aria-label={`Difficulté : ${label}`} className="inline-flex gap-0.5 text-fg">
      {[1, 2, 3].map((n) => (
        <Icon key={n} name="dice" size={18} className={n <= level ? '' : 'opacity-25'} />
      ))}
    </span>
  );
}
