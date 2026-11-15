// Code partagé entre web et mobile (types, client API, validation)
// Code shared between web and mobile (types, API client, validation)
export const APP_NAME = 'Ludmigo';

// Niveau de difficulté d'un jeu (api/src/Enum/GameDifficulty.php)
// Difficulty level of a game (api/src/Enum/GameDifficulty.php)
export type GameDifficulty = 'beginner' | 'intermediate' | 'expert';

// Jeu du catalogue, tel que l'expose l'API (api/src/Entity/Game.php)
// Catalogue game, as exposed by the API (api/src/Entity/Game.php)
export interface Game {
  id: string;
  name: string;
  description: string | null;
  minPlayers: number;
  maxPlayers: number;
  durationMinutes: number | null;
  difficulty: GameDifficulty;
  imageUrl: string | null;
  createdAt: string;
}

// Corps envoyé pour créer ou modifier un jeu / Body sent to create or update a game
export type GameInput = Omit<Game, 'id' | 'createdAt'>;

// Compte utilisateur vu par l'administration, sans mot de passe (api/src/Entity/User.php)
// User account as seen by the administration, without password (api/src/Entity/User.php)
export interface AdminUser {
  id: string;
  email: string;
  roles: string[];
  pseudo: string;
  city: string | null;
  createdAt: string;
  deletedAt: string | null;
}
