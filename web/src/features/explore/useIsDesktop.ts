import { useSyncExternalStore } from 'react';

// Point de rupture « ordinateur » de docs/07_UI_UX_DESIGN.md : 1024 px
// "Desktop" breakpoint from docs/07_UI_UX_DESIGN.md: 1024 px
const DESKTOP_QUERY = '(min-width: 1024px)';

function subscribe(onChange: () => void): () => void {
  if (typeof window.matchMedia !== 'function') return () => {};
  const media = window.matchMedia(DESKTOP_QUERY);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}

function getSnapshot(): boolean {
  return typeof window.matchMedia === 'function' && window.matchMedia(DESKTOP_QUERY).matches;
}

// Indique si l'écran est assez large pour la mise en page ordinateur
// Tells whether the screen is wide enough for the desktop layout
export function useIsDesktop(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
