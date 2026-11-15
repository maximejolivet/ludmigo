import type { GameDifficulty } from '@ludmigo/shared';

// Libellés français des niveaux de difficulté / French labels of the difficulty levels
export const difficultyLabels: Record<GameDifficulty, string> = {
  beginner: 'Débutant',
  intermediate: 'Intermédiaire',
  expert: 'Expert',
};

export const difficultyChoices = (Object.keys(difficultyLabels) as GameDifficulty[]).map((id) => ({
  id,
  name: difficultyLabels[id],
}));

// « 3 à 4 joueurs » ou « 2 joueurs » / "3 to 4 players" or "2 players"
export const playersLabel = (min: number, max: number) => (min === max ? `${min} joueurs` : `${min} à ${max} joueurs`);
