import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { AppRoutes } from '../../App';

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  );
}

describe('Explore dashboard (desktop)', () => {
  // Simule un écran de 1024 px ou plus
  // Simulates a screen of 1024 px or more
  beforeEach(() => {
    vi.stubGlobal('matchMedia', (query: string) => ({
      matches: query.includes('min-width: 1024px'),
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    }));
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  // La liste des résultats est affichée à côté de la carte, sans onglets du bas
  // The results list sits next to the map, without bottom tabs
  it('shows the results panel next to the map', () => {
    renderAt('/explorer');
    const panel = screen.getByRole('complementary', { name: 'Résultats' });
    expect(within(panel).getByRole('heading', { name: 'Les événements près de chez vous' })).toBeTruthy();
    expect(within(panel).getByRole('heading', { name: 'Les parties près de chez vous' })).toBeTruthy();
    expect(within(panel).getByText('19 résultats')).toBeTruthy();
    expect(screen.queryByRole('navigation', { name: 'Navigation principale' })).toBeNull();
    expect(screen.queryByRole('navigation', { name: "Mode d'affichage" })).toBeNull();
  });

  // L'action principale passe dans l'en-tête
  // The main action moves to the header
  it('puts the main action in the header', () => {
    renderAt('/explorer');
    const header = screen.getByRole('banner');
    fireEvent.click(within(header).getByRole('button', { name: /Organiser une partie/ }));
    expect(screen.getByRole('status').textContent).toContain('bientôt');
  });

  // Le détail d'une partie devient une carte flottante, la liste reste visible
  // The meetup detail becomes a floating card, the list stays visible
  it('shows the meetup detail as a floating card', () => {
    renderAt('/explorer/partie/m1');
    // Le titre du détail (niveau 2) existe en plus de la carte de la liste (niveau 3)
    // The detail title (level 2) exists in addition to the list card (level 3)
    expect(screen.getByRole('heading', { name: 'Soirée Loup-Garou !', level: 2 })).toBeTruthy();
    expect(screen.getByRole('complementary', { name: 'Résultats' })).toBeTruthy();
  });

  // La vue liste n'existe pas sur ordinateur : on retombe sur la carte
  // The list view does not exist on desktop: it falls back to the map
  it('redirects the list view to the map', () => {
    renderAt('/explorer/liste');
    expect(screen.getByRole('region', { name: 'Carte' })).toBeTruthy();
    expect(screen.getByRole('complementary', { name: 'Résultats' })).toBeTruthy();
  });
});
