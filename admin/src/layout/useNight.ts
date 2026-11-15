import { useCallback, useLayoutEffect, useState } from 'react';

// Mode soirée : thème sombre pour travailler le soir ; le choix est mémorisé, sinon on suit le système
// Evening mode: dark theme for working at night; the choice is remembered, otherwise we follow the system
const NIGHT_KEY = 'ludmigo.admin.night';

function initialNight(): boolean {
  try {
    const saved = window.localStorage.getItem(NIGHT_KEY);
    if (saved !== null) return saved === '1';
  } catch {
    // Stockage indisponible : on continue sans / Storage unavailable: carry on without it
  }
  return typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function useNight() {
  const [night, setNight] = useState(initialNight);

  // La classe va sur <html> : les boîtes de dialogue en héritent aussi
  // The class goes on <html>: dialogs inherit it too
  useLayoutEffect(() => {
    document.documentElement.classList.toggle('night', night);
  }, [night]);

  const toggle = useCallback(() => {
    const next = !night;
    setNight(next);
    try {
      window.localStorage.setItem(NIGHT_KEY, next ? '1' : '0');
    } catch {
      // Le choix ne sera pas mémorisé, mais le thème change quand même
      // Not remembered, but the theme still changes
    }
  }, [night]);

  return { night, toggle };
}
