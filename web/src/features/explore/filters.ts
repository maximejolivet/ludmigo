import { CATEGORIES } from './types';
import type { Category, ExploreData, PeriodFilter } from './types';

export interface Filters {
  categories: Record<Category, boolean>;
  game: string;
  place: string;
  maxDistanceKm: number;
  period: PeriodFilter;
}

export const DEFAULT_FILTERS: Filters = {
  categories: { players: true, meetups: true, events: true, venues: true },
  game: '',
  place: 'Nantes',
  maxDistanceKm: 10,
  period: 'any',
};

// Minuscules sans accents, pour comparer « Rezé » et « reze »
// Lowercase without accents, to compare "Rezé" and "reze"
export function normalize(text: string): string {
  return text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim();
}

// Nombre de réglages qui diffèrent des valeurs par défaut (pastille du bouton Filtres)
// Number of settings that differ from the defaults (Filters button badge)
export function countActiveFilters(filters: Filters): number {
  let count = 0;
  if (filters.game.trim() !== '') count += 1;
  if (normalize(filters.place) !== normalize(DEFAULT_FILTERS.place)) count += 1;
  if (filters.maxDistanceKm !== DEFAULT_FILTERS.maxDistanceKm) count += 1;
  if (filters.period !== DEFAULT_FILTERS.period) count += 1;
  if (CATEGORIES.some((category) => !filters.categories[category])) count += 1;
  return count;
}

// Début de journée, pour comparer des dates sans l'heure
// Start of day, to compare dates without the time
function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

const DAY_MS = 24 * 60 * 60 * 1000;

// Indique si une date tombe dans la période choisie, par rapport à « maintenant »
// Tells whether a date falls inside the chosen period, relative to "now"
export function isInPeriod(iso: string, period: PeriodFilter, now: Date): boolean {
  if (period === 'any') return true;
  const day = startOfDay(new Date(iso)).getTime();
  const today = startOfDay(now).getTime();
  if (period === 'today') return day === today;
  if (period === 'week') return day >= today && day < today + 7 * DAY_MS;
  // Week-end : le samedi et le dimanche à venir (ou en cours)
  // Weekend: the coming (or current) Saturday and Sunday
  const weekday = now.getDay();
  const daysToSaturday = weekday === 0 ? -1 : (6 - weekday + 7) % 7;
  const saturday = today + daysToSaturday * DAY_MS;
  return day >= saturday && day < saturday + 2 * DAY_MS;
}

// Applique les filtres aux données fictives
// Applies the filters to the fictional data
export function applyFilters(data: ExploreData, filters: Filters, now: Date): ExploreData {
  const place = normalize(filters.place);
  const game = normalize(filters.game);

  const inArea = (item: { city: string; district?: string; distanceKm: number }, extra = ''): boolean => {
    if (item.distanceKm > filters.maxDistanceKm) return false;
    if (place === '') return true;
    return normalize(`${item.city} ${item.district ?? ''} ${extra}`).includes(place);
  };

  return {
    players: filters.categories.players ? data.players.filter((item) => inArea(item)) : [],
    venues: filters.categories.venues ? data.venues.filter((item) => inArea(item, item.name)) : [],
    meetups: filters.categories.meetups
      ? data.meetups.filter(
          (item) =>
            inArea(item, item.venueName) &&
            isInPeriod(item.startsAt, filters.period, now) &&
            (game === '' || normalize(`${item.title} ${item.game}`).includes(game)),
        )
      : [],
    events: filters.categories.events
      ? data.events.filter(
          (item) =>
            inArea(item, item.organizerName) &&
            isInPeriod(item.startsAt, filters.period, now) &&
            (game === '' || normalize(item.title).includes(game)),
        )
      : [],
  };
}
