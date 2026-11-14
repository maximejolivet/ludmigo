import { afterEach, vi } from 'vitest';

// Le mode soirée est mémorisé dans le stockage local : on le vide entre deux tests
// Evening mode is remembered in local storage: clear it between tests
afterEach(() => {
  window.localStorage.clear();
});

// jsdom n'a pas de mise en page : la carte y a une taille nulle et le regroupement n'afficherait aucune épingle.
// On rend donc les épingles telles quelles ; le regroupement lui-même est celui de leaflet.markercluster.
// jsdom has no layout: the map has a zero size there and clustering would show no pins.
// Pins are therefore rendered as they are; the clustering itself is leaflet.markercluster's.
vi.mock('react-leaflet-cluster', () => ({
  default: ({ children }: { children?: unknown }) => children ?? null,
}));
