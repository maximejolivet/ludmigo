import { useCallback, useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router';
import { BottomNav } from './components/BottomNav';
import { Header } from './components/Header';
import { ExploreContext } from './context';
import type { ExploreContextValue } from './context';
import { EXPLORE_DATA, NOW } from './data';
import { DEFAULT_FILTERS, applyFilters, countActiveFilters } from './filters';
import type { Filters } from './filters';

// Durée d'affichage d'un message court, en millisecondes
// How long a short message stays visible, in milliseconds
const TOAST_DURATION_MS = 5000;

// Structure commune des écrans d'exploration : en-tête, contenu, onglets du bas et état partagé
// Shared structure of the exploration screens: header, content, bottom tabs and shared state
export function ExploreLayout() {
  const [filters, setFiltersState] = useState<Filters>(DEFAULT_FILTERS);
  const [joinedIds, setJoinedIds] = useState<ReadonlySet<string>>(new Set());
  const [notice, setNotice] = useState('');

  const results = useMemo(() => applyFilters(EXPLORE_DATA, filters, NOW), [filters]);

  // Efface le message après 5 secondes
  // Clears the message after 5 seconds
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(''), TOAST_DURATION_MS);
    return () => clearTimeout(timer);
  }, [notice]);

  const toggleJoin = useCallback((meetupId: string) => {
    setJoinedIds((current) => {
      const next = new Set(current);
      if (!next.delete(meetupId)) next.add(meetupId);
      return next;
    });
  }, []);

  const value = useMemo<ExploreContextValue>(
    () => ({
      filters,
      setFilters: setFiltersState,
      resetFilters: () => setFiltersState(DEFAULT_FILTERS),
      activeFilterCount: countActiveFilters(filters),
      results,
      joinedIds,
      toggleJoin,
      notify: setNotice,
    }),
    [filters, results, joinedIds, toggleJoin],
  );

  return (
    <ExploreContext.Provider value={value}>
      <div className="relative mx-auto flex h-dvh max-w-[480px] flex-col overflow-hidden bg-white font-ui text-base text-ink md:shadow-[0_0_0_1px_var(--color-line),0_12px_40px_rgba(0,0,0,.12)]">
        <Header />
        <Outlet />
        <BottomNav />
        {/* Message court (toast) : annoncé aux lecteurs d'écran */}
        {/* Short message (toast): announced to screen readers */}
        <div
          role="status"
          className="pointer-events-none absolute inset-x-4 bottom-24 z-30 flex justify-center"
        >
          {notice && (
            <p className="m-0 rounded-full bg-ink px-4 py-3 text-sm font-medium text-white shadow-lg">{notice}</p>
          )}
        </div>
      </div>
    </ExploreContext.Provider>
  );
}
