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

// Point sur le plan de la carte fictive (390 × 560), pointe de l'épingle
// Point on the fictional map plane (390 × 560), tip of the pin
export interface MapPoint {
  x: number;
  y: number;
}

// Taille du plan de la carte fictive
// Size of the fictional map plane
export const MAP_SIZE = { width: 390, height: 560 } as const;

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
export interface Player extends Located {
  id: string;
}

export interface Venue extends Located {
  id: string;
  name: string;
  kind: string;
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
}

export interface ExploreData {
  players: Player[];
  venues: Venue[];
  meetups: Meetup[];
  events: VenueEvent[];
}

export type PeriodFilter = 'any' | 'today' | 'weekend' | 'week';
