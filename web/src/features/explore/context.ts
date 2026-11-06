import { createContext, useContext } from 'react';
import type { Filters } from './filters';
import type { ExploreData } from './types';

export interface ExploreContextValue {
  filters: Filters;
  setFilters: (update: (current: Filters) => Filters) => void;
  resetFilters: () => void;
  activeFilterCount: number;
  // Données après application des filtres
  // Data after the filters are applied
  results: ExploreData;
  // Parties auxquelles l'utilisateur fictif participe
  // Meetups the fictional user takes part in
  joinedIds: ReadonlySet<string>;
  toggleJoin: (meetupId: string) => void;
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
