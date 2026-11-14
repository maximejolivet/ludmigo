import { createContext, useContext } from 'react';
import type { Filters } from './filters';
import type { ExploreData, Profile, UserPosition } from './types';

export interface ExploreContextValue {
  filters: Filters;
  setFilters: (update: (current: Filters) => Filters) => void;
  resetFilters: () => void;
  activeFilterCount: number;
  // Données avec les distances calculées depuis la position de l'utilisateur quand elle est connue
  // Data with distances computed from the user's position when it is known
  data: ExploreData;
  // Données après application des filtres
  // Data after the filters are applied
  results: ExploreData;
  // Position de l'utilisateur, null tant qu'il ne l'a pas partagée ; elle reste dans la page
  // The user's position, null until they share it; it stays in the page
  userPosition: UserPosition | null;
  setUserPosition: (position: UserPosition) => void;
  // Parties auxquelles l'utilisateur fictif participe
  // Meetups the fictional user takes part in
  joinedIds: ReadonlySet<string>;
  toggleJoin: (meetupId: string) => void;
  // Profil donné au premier lancement (niveau et jeux préférés), null tant qu'il n'est pas renseigné
  // Profile given on first launch (level and favourite games), null until filled in
  profile: Profile | null;
  saveProfile: (profile: Profile) => void;
  // « Plus tard » : masque l'invitation à personnaliser pour cette visite
  // "Later": hides the invitation to personalise for this visit
  profileDismissed: boolean;
  dismissProfilePrompt: () => void;
  // Parties complètes pour lesquelles l'utilisateur veut être prévenu si une place se libère
  // Full meetups the user wants to be told about if a seat frees up
  watchedIds: ReadonlySet<string>;
  toggleWatch: (meetupId: string) => void;
  // Jeux pour lesquels l'utilisateur veut être prévenu quand une partie apparaît
  // Games the user wants to be told about when a meetup appears
  gameAlerts: readonly string[];
  toggleGameAlert: (game: string) => void;
  // Mode soirée : thème sombre, suivi du réglage du système puis du choix de l'utilisateur
  // Evening mode: dark theme, following the system setting then the user's choice
  night: boolean;
  toggleNight: () => void;
  // Affiche un message court (toast de 5 s)
  // Shows a short message (5 s toast)
  notify: (message: string) => void;
}

export const ExploreContext = createContext<ExploreContextValue | null>(null);

export function useExplore(): ExploreContextValue {
  const value = useContext(ExploreContext);
  if (!value) throw new Error('useExplore must be used inside ExploreLayout');
  return value;
}
