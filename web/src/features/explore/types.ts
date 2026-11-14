// Catégories affichables sur la carte d'exploration
// Categories shown on the exploration map
export type Category = 'players' | 'meetups' | 'events' | 'venues';

export const CATEGORIES: readonly Category[] = ['players', 'meetups', 'events', 'venues'];

export const CATEGORY_LABELS: Record<Category, string> = {
  players: 'Joueurs',
  meetups: 'Parties',
  events: 'Événements',
  venues: 'Établissements',
};

// Coordonnées géographiques d'un élément de la carte
// Geographic coordinates of a map item
export interface MapPoint {
  lat: number;
  lng: number;
}

// Lieu de rattachement commun à tous les éléments de la carte
// Location shared by every map item
interface Located {
  city: string;
  district?: string;
  distanceKm: number;
  position: MapPoint;
}

export interface Person {
  name: string;
  initials: string;
}

// Joueur : seule une position approximative est affichée, jamais d'identité
// Player: only an approximate position is shown, never an identity
// Profil public d'un joueur : seulement ce qu'il a choisi de partager, avec une position approximative
// Public profile of a player: only what they chose to share, with an approximate position
export interface Player extends Located {
  id: string;
  // Prénom et initiale du nom, jamais le nom complet
  // First name and surname initial, never the full name
  name: string;
  level: Level;
  favorites: string[];
  // Ce que le joueur cherche en ce moment, ou null
  // What the player is looking for right now, or null
  status: string | null;
  lastSeen: string;
}

// Horaires d'ouverture : jours (0 = dimanche), heure d'ouverture et de fermeture ; au-delà de 24, la fermeture tombe après minuit
// Opening hours: days (0 = Sunday), opening and closing hour; above 24, closing falls after midnight
export interface Schedule {
  days: number[];
  from: number;
  to: number;
}

export interface Venue extends Located {
  id: string;
  name: string;
  kind: string;
  // Horaires d'ouverture et nombre de jeux disponibles sur place
  // Opening hours and number of games available on site
  hours: string;
  gamesCount: number;
  schedule: Schedule;
  // Ambiance et accessibilité du lieu : « Calme », « Accessible PMR », « Sans alcool »…
  // Venue atmosphere and accessibility: "Calm", "Wheelchair accessible", "Alcohol-free"…
  tags: string[];
}

export interface Meetup extends Located {
  id: string;
  title: string;
  game: string;
  startsAt: string;
  venueName: string;
  venueKind: string;
  organizer: Person;
  capacity: number;
  // Difficulté du jeu, de 1 (facile) à 5 (expert)
  // Game difficulty, from 1 (easy) to 5 (expert)
  complexity: 1 | 2 | 3 | 4 | 5;
  // Initiales des joueurs déjà inscrits
  // Initials of the players already signed up
  participants: string[];
  beginnerFriendly: boolean;
}

export interface VenueEvent extends Located {
  id: string;
  title: string;
  startsAt: string;
  organizerName: string;
  description: string;
  // « Gratuit » ou un prix en euros
  // "Free" or a price in euros
  price: string;
}

export interface ExploreData {
  players: Player[];
  venues: Venue[];
  meetups: Meetup[];
  events: VenueEvent[];
}

export type PeriodFilter = 'any' | 'today' | 'weekend' | 'week';

// Niveau de jeu déclaré par un joueur
// Playing level declared by a player
export type Level = 'beginner' | 'expert';

// Un joueur inscrit à une partie, tel qu'il apparaît dans « Qui vient ? »
// A player signed up for a meetup, as shown in "Who is coming?"
export interface Attendee {
  name: string;
  level: Level;
  favorites: string[];
}

// Ce que l'utilisateur a dit aimer au premier lancement
// What the user said they like on first launch
export interface Profile {
  level: Level;
  favorites: string[];
}

// Position de l'utilisateur quand il a accepté de la partager, avec sa précision en mètres
// The user's position when they agreed to share it, with its accuracy in metres
export interface UserPosition extends MapPoint {
  accuracy: number;
}
