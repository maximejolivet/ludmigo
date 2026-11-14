import { describe, expect, it } from 'vitest';
import { EXPLORE_DATA, NOW } from './data';
import { DEFAULT_FILTERS, applyFilters } from './filters';
import { recommendMeetup } from './recommend';

const meetups = applyFilters(EXPLORE_DATA, DEFAULT_FILTERS, NOW).meetups;

describe('recommendMeetup', () => {
  // Sans profil : la partie la plus proche dans le temps et dans l'espace
  // Without a profile: the closest meetup in time and space
  it('picks the soonest close meetup without a profile', () => {
    const result = recommendMeetup(meetups, null, new Set(), NOW);
    expect(result?.meetup.id).toBe('m10');
    expect(result?.reasons).toContain('Ce soir, 20 h 00');
    expect(result?.reasons).toContain('24 min à pied');
    expect(result?.reasons).toContain('2 places libres');
  });

  // Un jeu préféré et le niveau débutant font passer Catan devant
  // A favourite game and the beginner level bring Catan to the front
  it('uses the profile', () => {
    const result = recommendMeetup(meetups, { level: 'beginner', favorites: ['Catan'] }, new Set(), NOW);
    expect(result?.meetup.id).toBe('m2');
    expect(result?.reasons).toContain('Vous aimez Catan');
    expect(result?.reasons).toContain('Débutants bienvenus');
  });

  // On ne propose pas une partie déjà rejointe, ni une partie complète
  // A meetup already joined or already full is not proposed
  it('skips joined and full meetups', () => {
    expect(recommendMeetup(meetups, null, new Set(['m10']), NOW)?.meetup.id).toBe('m1');
    expect(recommendMeetup(EXPLORE_DATA.meetups.filter((item) => item.id === 'm4'), null, new Set(), NOW)).toBeNull();
    expect(recommendMeetup([], null, new Set(), NOW)).toBeNull();
  });
});
