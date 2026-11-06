import { describe, expect, it } from 'vitest';
import { EXPLORE_DATA, NOW } from './data';
import { DEFAULT_FILTERS, applyFilters, countActiveFilters, isInPeriod, normalize } from './filters';

describe('filters', () => {
  // Les valeurs par défaut gardent Nantes et 10 km : Rezé et Saint-Herblain sont exclus
  // Defaults keep Nantes and 10 km: Rezé and Saint-Herblain are excluded
  it('keeps only Nantes items by default', () => {
    const results = applyFilters(EXPLORE_DATA, DEFAULT_FILTERS, NOW);
    expect(results.meetups.map((item) => item.id)).toEqual(['m1', 'm2', 'm3']);
    expect(results.events.map((item) => item.id)).toEqual(['e1', 'e2', 'e3']);
  });

  // Vider le lieu élargit aux communes voisines, dans la limite de la distance
  // Clearing the place widens to neighbouring towns, within the distance limit
  it('widens the area when the place is empty', () => {
    const results = applyFilters(EXPLORE_DATA, { ...DEFAULT_FILTERS, place: '' }, NOW);
    expect(results.meetups).toHaveLength(5);
    const near = applyFilters(EXPLORE_DATA, { ...DEFAULT_FILTERS, place: '', maxDistanceKm: 5 }, NOW);
    expect(near.meetups.map((item) => item.id)).toEqual(['m1', 'm2', 'm3', 'm4']);
  });

  // Le lieu et le jeu ignorent la casse et les accents
  // Place and game ignore case and accents
  it('matches place and game without case or accents', () => {
    const results = applyFilters(EXPLORE_DATA, { ...DEFAULT_FILTERS, place: 'REZE', game: 'tarot' }, NOW);
    expect(results.meetups.map((item) => item.id)).toEqual(['m4']);
    expect(normalize('  Rezé ')).toBe('reze');
  });

  // Le week-end à partir du jeudi 10 décembre couvre les 12 et 13 décembre
  // The weekend from Thursday 10 December covers 12 and 13 December
  it('filters by period', () => {
    expect(isInPeriod('2026-12-12T21:00', 'weekend', NOW)).toBe(true);
    expect(isInPeriod('2026-12-13T15:00', 'weekend', NOW)).toBe(true);
    expect(isInPeriod('2026-12-18T20:30', 'weekend', NOW)).toBe(false);
    expect(isInPeriod('2026-12-10T20:00', 'today', NOW)).toBe(true);
    expect(isInPeriod('2026-12-16T20:30', 'week', NOW)).toBe(true);
    expect(isInPeriod('2026-12-18T20:30', 'week', NOW)).toBe(false);
    const weekend = applyFilters(EXPLORE_DATA, { ...DEFAULT_FILTERS, period: 'weekend' }, NOW);
    expect(weekend.meetups.map((item) => item.id)).toEqual(['m1', 'm2']);
  });

  // Une catégorie masquée disparaît des résultats
  // A hidden category disappears from the results
  it('hides categories that are switched off', () => {
    const categories = { ...DEFAULT_FILTERS.categories, players: false, meetups: false };
    const results = applyFilters(EXPLORE_DATA, { ...DEFAULT_FILTERS, categories }, NOW);
    expect(results.players).toEqual([]);
    expect(results.meetups).toEqual([]);
    expect(results.events.length).toBeGreaterThan(0);
  });

  // La pastille compte les réglages qui s'écartent des valeurs par défaut
  // The badge counts settings that differ from the defaults
  it('counts active filters', () => {
    expect(countActiveFilters(DEFAULT_FILTERS)).toBe(0);
    expect(countActiveFilters({ ...DEFAULT_FILTERS, game: 'Catan', period: 'week' })).toBe(2);
    expect(
      countActiveFilters({
        ...DEFAULT_FILTERS,
        maxDistanceKm: 20,
        categories: { ...DEFAULT_FILTERS.categories, venues: false },
      }),
    ).toBe(2);
  });
});
