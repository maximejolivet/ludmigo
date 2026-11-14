import { useExplore } from '../context';
import { Icon } from './Icon';

// Bascule du mode soirée : thème sombre pour jouer dans un bar
// Evening mode switch: dark theme for playing in a bar
export function NightToggle() {
  const { night, toggleNight } = useExplore();
  return (
    <button
      type="button"
      aria-pressed={night}
      aria-label="Mode soirée"
      onClick={toggleNight}
      className="flex size-11 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent text-fg"
    >
      <Icon name={night ? 'sun' : 'moon'} size={24} />
    </button>
  );
}
