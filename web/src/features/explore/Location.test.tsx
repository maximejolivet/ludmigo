import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { AppRoutes } from '../../App';

function renderMap() {
  return render(
    <MemoryRouter initialEntries={['/explorer']}>
      <AppRoutes />
    </MemoryRouter>,
  );
}

// jsdom n'a pas de géolocalisation : on la simule, ou on la retire
// jsdom has no geolocation: simulate it, or remove it
function stubGeolocation(value: unknown) {
  Object.defineProperty(navigator, 'geolocation', { value, configurable: true });
}

describe('Locate me', () => {
  afterEach(() => {
    cleanup();
    // On retire la simulation pour ne pas influencer les autres tests
    // Remove the stub so other tests are not affected
    Reflect.deleteProperty(navigator, 'geolocation');
  });

  // La position n'est demandée qu'à l'appui du bouton, puis montrée sur la carte
  // The position is requested only when the button is pressed, then shown on the map
  it('shows the position on the map after pressing the button', () => {
    let requested = 0;
    stubGeolocation({
      getCurrentPosition: (success: (position: unknown) => void) => {
        requested += 1;
        success({ coords: { latitude: 47.22, longitude: -1.55, accuracy: 40 } });
      },
    });
    renderMap();
    expect(requested).toBe(0);
    expect(screen.queryByText(/Votre position est affichée sur la carte/)).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'Me localiser' }));
    expect(requested).toBe(1);
    expect(screen.getByText(/Votre position est affichée sur la carte/)).toBeTruthy();
    expect(screen.getByRole('status').textContent).toContain('Votre position reste sur votre appareil');
  });

  // Hors de Nantes, on prévient que les parties de démonstration sont ailleurs
  // Outside Nantes, say that the demo meetups are elsewhere
  it('warns when the user is far from the demo area', () => {
    stubGeolocation({
      getCurrentPosition: (success: (position: unknown) => void) =>
        success({ coords: { latitude: 48.85, longitude: 2.35, accuracy: 25 } }),
    });
    renderMap();
    fireEvent.click(screen.getByRole('button', { name: 'Me localiser' }));
    expect(screen.getByRole('status').textContent).toContain('autour de Nantes');
  });

  // Un refus explique quoi faire, sans afficher de position
  // A refusal explains what to do, without showing a position
  it('explains a refused permission', () => {
    stubGeolocation({
      getCurrentPosition: (_success: unknown, failure: (error: { code: number }) => void) => failure({ code: 1 }),
    });
    renderMap();
    fireEvent.click(screen.getByRole('button', { name: 'Me localiser' }));
    expect(screen.getByRole('status').textContent).toContain('refusée');
    expect(screen.queryByText(/Votre position est affichée sur la carte/)).toBeNull();
  });

  // Un navigateur sans géolocalisation le dit
  // A browser without geolocation says so
  it('handles a browser without geolocation', () => {
    renderMap();
    fireEvent.click(screen.getByRole('button', { name: 'Me localiser' }));
    expect(screen.getByRole('status').textContent).toContain('ne sait pas vous localiser');
  });

  // Au départ, le lieu est la France entière
  // At the start, the place is the whole of France
  it('starts on the whole of France', () => {
    renderMap();
    expect(screen.getByText('France')).toBeTruthy();
  });

  // Localisé près de Nantes, le lieu devient Nantes
  // Located near Nantes, the place becomes Nantes
  it('sets the place to the closest city', () => {
    stubGeolocation({
      getCurrentPosition: (success: (position: unknown) => void) =>
        success({ coords: { latitude: 47.22, longitude: -1.55, accuracy: 30 } }),
    });
    renderMap();
    fireEvent.click(screen.getByRole('button', { name: 'Me localiser' }));
    expect(screen.getByText('Nantes')).toBeTruthy();
    expect(screen.queryByText('France')).toBeNull();
    expect(screen.getByRole('status').textContent).toContain('réglé sur « Nantes »');
  });

  // Localisé à Rezé, le lieu devient Rezé et la liste ne garde que ses parties
  // Located in Rezé, the place becomes Rezé and the list keeps only its meetups
  it('follows the user to another city', () => {
    stubGeolocation({
      getCurrentPosition: (success: (position: unknown) => void) =>
        success({ coords: { latitude: 47.2142, longitude: -1.5863, accuracy: 30 } }),
    });
    renderMap();
    fireEvent.click(screen.getByRole('button', { name: 'Me localiser' }));
    expect(screen.getByText('Rezé')).toBeTruthy();
    expect(screen.getByText('2 parties')).toBeTruthy();
  });

  // Hors de la zone de démonstration, le lieu reste la France
  // Outside the demo area, the place stays France
  it('keeps France when the user is far from the demo area', () => {
    stubGeolocation({
      getCurrentPosition: (success: (position: unknown) => void) =>
        success({ coords: { latitude: 48.85, longitude: 2.35, accuracy: 25 } }),
    });
    renderMap();
    fireEvent.click(screen.getByRole('button', { name: 'Me localiser' }));
    expect(screen.getByText('France')).toBeTruthy();
  });
});
