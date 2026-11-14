import { describe, expect, it } from 'vitest';
import { EXPLORE_DATA, NOW } from './data';
import { DEFAULT_FILTERS, applyFilters, countActiveFilters, isInPeriod, normalize } from './filters';

describe('filters', () => {
  // Par défaut, le lieu est « France » : rien n'est écarté, et la liste est triée par heure de début
  // By default the place is "France": nothing is left out, and the list is sorted by start time
  it('covers the whole country by default', () => {
    const results = applyFilters(EXPLORE_DATA, DEFAULT_FILTERS, NOW);
    expect(results.meetups.map((item) => item.id)).toEqual(['m10', 'm1', 'm2', 'm6', 'm3', 'm8', 'm4', 'm5', 'm7', 'm9']);
    expect(results.events.map((item) => item.id)).toEqual(['e9', 'e1', 'e5', 'e7', 'e2', 'e3', 'e4', 'e6', 'e8']);
    expect(results.venues).toHaveLength(10);
    expect(results.players).toHaveLength(24);
  });

  // Choisir une commune ne garde que ses éléments
  // Choosing a city keeps only its items
  it('narrows to a city when one is chosen', () => {
    const results = applyFilters(EXPLORE_DATA, { ...DEFAULT_FILTERS, place: 'Nantes' }, NOW);
    expect(results.meetups.map((item) => item.id)).toEqual(['m10', 'm1', 'm2', 'm6', 'm3', 'm7']);
    expect(results.events.map((item) => item.id)).toEqual(['e9', 'e1', 'e5', 'e2', 'e3', 'e6']);
  });

  // La distance maximale écarte les éléments trop éloignés
  // The maximum distance leaves out items that are too far
  it('limits by distance', () => {
    const near = applyFilters(EXPLORE_DATA, { ...DEFAULT_FILTERS, place: '', maxDistanceKm: 5 }, NOW);
    expect(near.meetups.map((item) => item.id)).toEqual(['m10', 'm1', 'm2', 'm6', 'm3', 'm8', 'm4', 'm7']);
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

  // « Ouvert » ne garde que les établissements ouverts jeudi à 18 h 30
  // "Open" keeps only the venues open on Thursday at 6:30 pm
  it('keeps only the open venues when asked', () => {
    const all = applyFilters(EXPLORE_DATA, DEFAULT_FILTERS, NOW);
    expect(all.venues).toHaveLength(10);
    const open = applyFilters(EXPLORE_DATA, { ...DEFAULT_FILTERS, openNow: true }, NOW);
    expect(open.venues.map((item) => item.id)).toEqual(['v1', 'v2', 'v4', 'v5', 'v6', 'v9', 'v10']);
  });

  // La pastille compte les réglages qui s'écartent des valeurs par défaut
  // The badge counts settings that differ from the defaults
  it('counts active filters', () => {
    expect(countActiveFilters(DEFAULT_FILTERS)).toBe(0);
    expect(countActiveFilters({ ...DEFAULT_FILTERS, place: 'Nantes' })).toBe(1);
    expect(countActiveFilters({ ...DEFAULT_FILTERS, game: 'Catan', period: 'week' })).toBe(2);
    expect(countActiveFilters({ ...DEFAULT_FILTERS, openNow: true })).toBe(1);
    expect(
      countActiveFilters({
        ...DEFAULT_FILTERS,
        maxDistanceKm: 20,
        categories: { ...DEFAULT_FILTERS.categories, venues: false },
      }),
    ).toBe(2);
  });
});
