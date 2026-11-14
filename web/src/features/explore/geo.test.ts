import { describe, expect, it } from 'vitest';
import { EXPLORE_DATA } from './data';
import { distanceKm, isInDemoArea, nearestCity, withDistancesFrom } from './geo';

describe('geo', () => {
  // Nantes – Rennes : environ 95 km à vol d'oiseau
  // Nantes – Rennes: about 95 km as the crow flies
  it('computes the distance between two points', () => {
    const km = distanceKm({ lat: 47.2184, lng: -1.5536 }, { lat: 48.1173, lng: -1.6778 });
    expect(km).toBeGreaterThan(90);
    expect(km).toBeLessThan(105);
    expect(distanceKm({ lat: 47, lng: -1 }, { lat: 47, lng: -1 })).toBe(0);
  });

  it('tells whether a position is inside the demo area', () => {
    expect(isInDemoArea({ lat: 47.22, lng: -1.55 })).toBe(true);
    expect(isInDemoArea({ lat: 48.85, lng: 2.35 })).toBe(false);
  });

  // La commune de l'élément le plus proche : la position du tarot à Rezé donne Rezé
  // The city of the closest item: the position of the tarot meetup in Rezé gives Rezé
  it('finds the closest city', () => {
    const tarot = EXPLORE_DATA.meetups.find((meetup) => meetup.id === 'm4')!;
    expect(nearestCity(tarot.position, EXPLORE_DATA)).toBe('Rezé');
    expect(nearestCity({ lat: 47.22, lng: -1.55 }, EXPLORE_DATA)).toBe('Nantes');
  });

  // Les distances sont recalculées à partir de la position de l'utilisateur
  // Distances are recomputed from the user's position
  it('recomputes the distances from a position', () => {
    const tarot = EXPLORE_DATA.meetups.find((meetup) => meetup.id === 'm4')!;
    const moved = withDistancesFrom(tarot.position, EXPLORE_DATA);
    expect(moved.meetups.find((meetup) => meetup.id === 'm4')?.distanceKm).toBe(0);
    expect(moved.meetups.find((meetup) => meetup.id === 'm5')?.distanceKm).toBeGreaterThan(4);
  });
});
