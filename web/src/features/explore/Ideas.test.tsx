import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { AppRoutes } from '../../App';
import { markerIcon } from './components/mapMarkers';

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  );
}

describe('Explore dashboard ideas', () => {
  afterEach(cleanup);

  // La difficulté du jeu est annoncée avec une valeur lisible
  // The game difficulty is announced with a readable value
  it('shows the game difficulty', () => {
    renderAt('/explorer/partie/m1');
    expect(screen.getByRole('img', { name: 'Difficulté 2 sur 5' })).toBeTruthy();
  });

  // Une épingle d'établissement ouvre sa fiche, avec horaires et jeux sur place
  // A venue pin opens its page, with opening hours and games on site
  it('opens the venue page from its pin', () => {
    renderAt('/explorer');
    fireEvent.click(screen.getByRole('button', { name: 'Établissement : Le Bistro Le Parisien' }));
    expect(screen.getByRole('heading', { name: 'Le Bistro Le Parisien', level: 2 })).toBeTruthy();
    expect(screen.getByText('180 jeux disponibles sur place')).toBeTruthy();
    expect(screen.getByText('Mar.–dim., 17 h–1 h')).toBeTruthy();
  });

  // Un établissement inconnu renvoie vers la carte
  // An unknown venue sends the user back to the map
  it('handles an unknown venue', () => {
    renderAt('/explorer/lieu/inconnu');
    expect(screen.getByText("Cet établissement n'existe plus.")).toBeTruthy();
  });

  // « Ce soir » ne garde que les rendez-vous d'aujourd'hui, et un second appui les remet tous
  // "Tonight" keeps only today's appointments, and a second press brings everything back
  it('filters to tonight with the shortcut chip', () => {
    renderAt('/explorer/liste');
    fireEvent.click(screen.getByRole('button', { name: 'Ce soir' }));
    expect(screen.getByText('2 résultats')).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Soirée Skull' })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Ce soir' }));
    expect(screen.getByText('19 résultats')).toBeTruthy();
  });

  // Le volet passe par trois hauteurs : moitié, plein, réduit, et se règle au clavier
  // The sheet cycles through three heights: half, full, peeking, and can be set with the keyboard
  it('cycles the nearby sheet through its three heights', () => {
    renderAt('/explorer');
    // En plein écran, la liste complète ajoute une seconde région du même nom : on cible le volet par son état
    // At full height, the full list adds a second region with the same name: target the sheet by its state
    const sheet = () => document.querySelector('[data-state]') as HTMLElement;
    expect(sheet().getAttribute('data-state')).toBe('half');

    fireEvent.click(screen.getByRole('button', { name: 'Agrandir la liste des parties' }));
    expect(sheet().getAttribute('data-state')).toBe('full');
    expect(within(sheet()).getByRole('heading', { name: 'Les événements près de chez vous' })).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Réduire la liste des parties' }));
    expect(sheet().getAttribute('data-state')).toBe('peek');

    const handle = screen.getByRole('button', { name: 'Agrandir la liste des parties' });
    fireEvent.keyDown(handle, { key: 'ArrowUp' });
    expect(sheet().getAttribute('data-state')).toBe('half');
    fireEvent.keyDown(handle, { key: 'ArrowDown' });
    expect(sheet().getAttribute('data-state')).toBe('peek');
  });

  // Le mode soirée applique le thème sombre et se souvient du choix
  // Evening mode applies the dark theme and remembers the choice
  it('switches to evening mode and remembers it', () => {
    renderAt('/explorer');
    expect(document.querySelector('.night')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Mode soirée' }));
    expect(document.querySelector('.night')).toBeTruthy();
    expect(window.localStorage.getItem('ludmigo.night')).toBe('1');
    expect(screen.getByRole('button', { name: 'Mode soirée' }).getAttribute('aria-pressed')).toBe('true');
    fireEvent.click(screen.getByRole('button', { name: 'Mode soirée' }));
    expect(document.querySelector('.night')).toBeNull();
  });

  // L'anneau de places de la carte se remplit et passe en jaune pour les dernières places
  // The map seats ring fills up and turns yellow for the last seats
  it('draws the seats ring on meetup pins', () => {
    const open = markerIcon('meetups', false, { ratio: 0.6, tone: 'open' }).options.html as string;
    const last = markerIcon('meetups', false, { ratio: 0.9, tone: 'last' }).options.html as string;
    const selected = markerIcon('meetups', true).options.html as string;
    expect(open).toContain('conic-gradient(#006ca8 60%');
    expect(last).toContain('conic-gradient(#f8a00d 90%');
    expect(selected).toContain('animate-ping');
  });
});
