import { useExplore } from '../context';
import { CATEGORIES, CATEGORY_LABELS } from '../types';
import { PinIcon } from './Icon';
import { PIN_COLOR } from './styles';

interface CategoryChipsProps {
  // « map » : puces flottantes sur la carte ; « bar » : barre sous la recherche
  // "map": chips floating over the map; "bar": bar under the search
  variant: 'map' | 'bar';
  className?: string;
}

// Puces de catégories : chacune affiche ou masque une famille d'éléments
// Category chips: each one shows or hides a family of items
export function CategoryChips({ variant, className = '' }: CategoryChipsProps) {
  const { filters, setFilters } = useExplore();

  return (
    <div
      role="group"
      aria-label="Catégories affichées"
      className={`flex gap-2 overflow-x-auto [scrollbar-width:none] ${className}`}
    >
      {CATEGORIES.map((category) => {
        const pressed = filters.categories[category];
        const tone =
          variant === 'map'
            ? 'border-transparent shadow-[0_2px_8px_rgba(62,62,62,.25)]'
            : 'border-ink';
        return (
          <button
            key={category}
            type="button"
            aria-pressed={pressed}
            onClick={() =>
              setFilters((current) => ({
                ...current,
                categories: { ...current.categories, [category]: !pressed },
              }))
            }
            className={`inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-2 rounded-full border-2 px-3.5 text-sm font-bold ${tone} ${
              pressed ? 'bg-white text-ink' : 'bg-white/80 text-ink-soft line-through'
            }`}
          >
            <PinIcon className={`h-[19px] w-3.5 ${pressed ? PIN_COLOR[category] : 'text-[#b9b9b9]'}`} />
            {CATEGORY_LABELS[category]}
          </button>
        );
      })}
    </div>
  );
}
