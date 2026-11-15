import { describe, expect, it } from 'vitest';
import { difficultyChoices, difficultyLabels, playersLabel } from './constants';

describe('playersLabel', () => {
  it('écrit une plage ou un nombre fixe / writes a range or a fixed number', () => {
    expect(playersLabel(3, 4)).toBe('3 à 4 joueurs');
    expect(playersLabel(2, 2)).toBe('2 joueurs');
  });
});

describe('difficulty', () => {
  it('propose les trois niveaux, en français / offers the three levels, in French', () => {
    expect(difficultyChoices.map((c) => c.id)).toEqual(['beginner', 'intermediate', 'expert']);
    expect(difficultyLabels.beginner).toBe('Débutant');
  });
});
