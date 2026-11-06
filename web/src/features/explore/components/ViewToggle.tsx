import { Link } from 'react-router';
import { Icon } from './Icon';

interface ViewToggleProps {
  current: 'map' | 'list';
  className?: string;
}

// Choix de l'affichage : carte ou liste
// Display choice: map or list
export function ViewToggle({ current, className = '' }: ViewToggleProps) {
  const base = 'inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 text-sm font-bold no-underline';
  const active = 'bg-petrol text-white';
  const idle = 'text-ink';

  return (
    <nav aria-label="Mode d'affichage" className={`flex rounded-full p-0.5 ${className}`}>
      <Link to="/explorer" aria-current={current === 'map' ? 'true' : undefined} className={`${base} ${current === 'map' ? active : idle}`}>
        <Icon name="map" size={20} />
        Carte
      </Link>
      <Link to="/explorer/liste" aria-current={current === 'list' ? 'true' : undefined} className={`${base} ${current === 'list' ? active : idle}`}>
        <Icon name="list" size={20} />
        Liste
      </Link>
    </nav>
  );
}
