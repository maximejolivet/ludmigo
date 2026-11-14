import { PAWN_PATH, PAWN_RATIO, PAWN_VIEWBOX } from '../../../pawn';
import type { Category } from '../types';
import { Icon } from './Icon';
import type { IconName } from './Icon';
import { ICON_COLOR } from './styles';

// Un pictogramme par catégorie, le même sur les puces, dans les filtres et sur la carte
// One pictogram per category, the same on the chips, in the filters and on the map
const ICON_NAMES: Record<Exclude<Category, 'players'>, IconName> = {
  meetups: 'dice',
  events: 'calendar',
  venues: 'store',
};

// Pictogramme brut : le pion du logo pour les joueurs, un dé, un calendrier ou une devanture
// Bare pictogram: the brand pawn for players, a die, a calendar or a storefront
export function CategoryIcon({ category, size = 14 }: { category: Category; size?: number }) {
  if (category === 'players') {
    return (
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox={PAWN_VIEWBOX}
        width={Math.round(size * PAWN_RATIO)}
        height={size}
        fill="currentColor"
      >
        <path d={PAWN_PATH} />
      </svg>
    );
  }
  return <Icon name={ICON_NAMES[category]} size={size} />;
}

// Pictogramme seul, sans rond : à la couleur de la catégorie, grisé quand elle est masquée,
// ou blanc quand il se trouve sur un fond foncé
// Pictogram on its own, no circle: in the category colour, greyed out when the category is hidden,
// or white when it sits on a dark background
export function CategoryMark({
  category,
  tone = 'color',
}: {
  category: Category;
  tone?: 'color' | 'muted' | 'inverse';
}) {
  const color = tone === 'color' ? ICON_COLOR[category] : tone === 'muted' ? 'text-[#8a8a8a]' : 'text-white';
  return (
    <span aria-hidden="true" className={`flex shrink-0 items-center justify-center ${color}`}>
      <CategoryIcon category={category} size={24} />
    </span>
  );
}
