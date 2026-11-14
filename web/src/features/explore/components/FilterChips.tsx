import { useExplore } from '../context';
import { CategoryChips } from './CategoryChips';
import { Icon } from './Icon';
import { CHOICE_OFF, CHOICE_ON } from './styles';

// Raccourci « Ce soir » : ne garde que ce qui se passe aujourd'hui (la liste est triée par heure)
// "Tonight" shortcut: keeps only what happens today (the list is sorted by time)
function TonightChip() {
  const { filters, setFilters } = useExplore();
  const pressed = filters.period === 'today';
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={() => setFilters((current) => ({ ...current, period: pressed ? 'any' : 'today' }))}
      className={pressed ? CHOICE_ON : CHOICE_OFF}
    >
      <Icon name="moon" size={24} />
      Ce soir
    </button>
  );
}

// Puce « Ouvert » : ne montre que les établissements ouverts maintenant
// "Open" chip: shows only the venues open right now
function OpenChip() {
  const { filters, setFilters } = useExplore();
  const pressed = filters.openNow;
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={() => setFilters((current) => ({ ...current, openNow: !pressed }))}
      className={pressed ? CHOICE_ON : CHOICE_OFF}
    >
      <Icon name="clock" size={24} />
      Ouvert
    </button>
  );
}

// Rangée de puces : les raccourcis « Ce soir » et « Ouvert », puis les catégories affichées
// Row of chips: the "Tonight" and "Open" shortcuts, then the displayed categories
export function FilterChips({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-start gap-2 overflow-x-auto [scrollbar-width:none] ${className}`}>
      <TonightChip />
      <OpenChip />
      <CategoryChips />
    </div>
  );
}
