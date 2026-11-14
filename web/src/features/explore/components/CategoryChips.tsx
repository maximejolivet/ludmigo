import { useExplore } from '../context';
import { CATEGORIES, CATEGORY_LABELS } from '../types';
import { CategoryMark } from './CategoryIcon';
import { CHIP_OFF, CHIP_ON } from './styles';

interface CategoryChipsProps {
  className?: string;
}

// Puces de catégories : chacune affiche ou masque une famille d'éléments
// Category chips: each one shows or hides a family of items
export function CategoryChips({ className = '' }: CategoryChipsProps) {
  const { filters, setFilters } = useExplore();

  return (
    <div role="group" aria-label="Catégories affichées" className={`flex gap-2 ${className}`}>
      {CATEGORIES.map((category) => {
        const pressed = filters.categories[category];
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
            className={pressed ? CHIP_ON : CHIP_OFF}
          >
            <CategoryMark category={category} tone={pressed ? 'color' : 'muted'} />
            {CATEGORY_LABELS[category]}
          </button>
        );
      })}
    </div>
  );
}
