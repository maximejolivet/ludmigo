import { useCallback, useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router';
import { BottomNav } from './components/BottomNav';
import { Header } from './components/Header';
import { ExploreContext } from './context';
import type { ExploreContextValue } from './context';
import { EXPLORE_DATA, NOW } from './data';
import { DEFAULT_FILTERS, applyFilters, countActiveFilters } from './filters';
import type { Filters } from './filters';
import type { Profile, UserPosition } from './types';
import { isInDemoArea, withDistancesFrom } from './geo';
import { useIsDesktop } from './useIsDesktop';

// Clé de stockage du choix du mode soirée
// Storage key of the evening mode choice
const NIGHT_KEY = 'ludmigo.night';

// Mode soirée au départ : le choix déjà fait, sinon le thème sombre du système
// Initial evening mode: the choice already made, otherwise the system dark theme
function initialNight(): boolean {
  try {
    const saved = window.localStorage.getItem(NIGHT_KEY);
    if (saved !== null) return saved === '1';
  } catch {
    // Stockage indisponible (navigation privée, données bloquées) : on continue sans
    // Storage unavailable (private window, blocked data): carry on without it
  }
  return typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Clé de stockage du profil (niveau et jeux préférés)
// Storage key of the profile (level and favourite games)
const PROFILE_KEY = 'ludmigo.profile';

function initialProfile(): Profile | null {
  try {
    const saved = window.localStorage.getItem(PROFILE_KEY);
    return saved ? (JSON.parse(saved) as Profile) : null;
  } catch {
    // Stockage indisponible ou contenu abîmé : on repart sans profil
    // Storage unavailable or corrupted content: start without a profile
    return null;
  }
}

// Durée d'affichage d'un message court, en millisecondes
// How long a short message stays visible, in milliseconds
const TOAST_DURATION_MS = 5000;

// Structure commune des écrans d'exploration : en-tête, contenu, onglets du bas et état partagé
// Shared structure of the exploration screens: header, content, bottom tabs and shared state
export function ExploreLayout() {
  const [filters, setFiltersState] = useState<Filters>(DEFAULT_FILTERS);
  const [joinedIds, setJoinedIds] = useState<ReadonlySet<string>>(new Set());
  const [notice, setNotice] = useState('');
  const isDesktop = useIsDesktop();
  const [night, setNight] = useState(initialNight);
  const [profile, setProfile] = useState<Profile | null>(initialProfile);
  const [profileDismissed, setProfileDismissed] = useState(false);
  const [watchedIds, setWatchedIds] = useState<ReadonlySet<string>>(new Set());
  const [gameAlerts, setGameAlerts] = useState<readonly string[]>([]);

  const [userPosition, setUserPosition] = useState<UserPosition | null>(null);

  // Une fois localisé dans la zone de démonstration, les distances partent de la vraie position
  // Once located inside the demo area, distances start from the real position
  const data = useMemo(
    () => (userPosition && isInDemoArea(userPosition) ? withDistancesFrom(userPosition, EXPLORE_DATA) : EXPLORE_DATA),
    [userPosition],
  );
  const results = useMemo(() => applyFilters(data, filters, NOW), [data, filters]);

  // Efface le message après 5 secondes
  // Clears the message after 5 seconds
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(''), TOAST_DURATION_MS);
    return () => clearTimeout(timer);
  }, [notice]);

  const toggleNight = useCallback(() => {
    setNight((current) => {
      try {
        window.localStorage.setItem(NIGHT_KEY, current ? '0' : '1');
      } catch {
        // Le choix ne sera pas mémorisé, mais le thème change quand même
        // The choice will not be remembered, but the theme still changes
      }
      return !current;
    });
  }, []);

  const saveProfile = useCallback((next: Profile) => {
    setProfile(next);
    try {
      window.localStorage.setItem(PROFILE_KEY, JSON.stringify(next));
    } catch {
      // Le profil ne sera pas mémorisé d'une visite à l'autre
      // The profile will not be remembered from one visit to the next
    }
  }, []);

  const toggleWatch = useCallback((meetupId: string) => {
    setWatchedIds((current) => {
      const next = new Set(current);
      if (!next.delete(meetupId)) next.add(meetupId);
      return next;
    });
  }, []);

  const toggleGameAlert = useCallback((game: string) => {
    setGameAlerts((current) => (current.includes(game) ? current.filter((item) => item !== game) : [...current, game]));
  }, []);

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
      data,
      results,
      userPosition,
      setUserPosition,
      joinedIds,
      toggleJoin,
      profile,
      saveProfile,
      profileDismissed,
      dismissProfilePrompt: () => setProfileDismissed(true),
      watchedIds,
      toggleWatch,
      gameAlerts,
      toggleGameAlert,
      night,
      toggleNight,
      notify: setNotice,
    }),
    [
      filters,
      data,
      results,
      userPosition,
      joinedIds,
      toggleJoin,
      profile,
      saveProfile,
      profileDismissed,
      watchedIds,
      toggleWatch,
      gameAlerts,
      toggleGameAlert,
      night,
      toggleNight,
    ],
  );

  return (
    <ExploreContext.Provider value={value}>
      <div className={`${night ? 'night ' : ''}relative mx-auto flex h-dvh max-w-[480px] flex-col overflow-hidden bg-surface font-ui text-base text-fg md:shadow-[0_0_0_1px_var(--color-line),0_12px_40px_rgba(0,0,0,.12)] lg:max-w-none lg:shadow-none`}>
        <Header />
        <Outlet />
        {!isDesktop && <BottomNav />}
        {/* Message court (toast) : annoncé aux lecteurs d'écran */}
        {/* Short message (toast): announced to screen readers */}
        <div
          role="status"
          className="pointer-events-none absolute inset-x-4 bottom-24 z-30 flex justify-center lg:bottom-6"
        >
          {notice && (
            <p className="m-0 rounded-full bg-fg px-4 py-3 text-sm font-medium text-surface shadow-lg">{notice}</p>
          )}
        </div>
      </div>
    </ExploreContext.Provider>
  );
}
