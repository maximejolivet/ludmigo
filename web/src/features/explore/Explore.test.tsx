import { afterEach, describe, expect, it } from 'vitest';
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

describe('Explore dashboard', () => {
  afterEach(cleanup);

  // L'écran d'ouverture montre la carte et le volet des parties proches
  // The opening screen shows the map and the nearby meetups sheet
  it('shows the map with the nearby meetups', () => {
    renderAt('/explorer');
    expect(screen.getByRole('region', { name: 'Carte' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Les parties près de chez vous' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Partie : Soirée Loup-Garou !' })).toBeTruthy();
  });

  // Cliquer une épingle ouvre le détail de la partie
  // Clicking a pin opens the meetup detail
  it('opens the detail when a pin is selected', () => {
    renderAt('/explorer');
    fireEvent.click(screen.getByRole('button', { name: 'Partie : Soirée Loup-Garou !' }));
    expect(screen.getByRole('heading', { name: 'Soirée Loup-Garou !' })).toBeTruthy();
    expect(screen.getByText('Samedi 12 décembre · 21 h 00')).toBeTruthy();
    expect(screen.getByText(/10 joueurs · 6 inscrits/)).toBeTruthy();
  });

  // « Je participe » bascule la participation et met à jour le nombre d'inscrits
  // "Join" toggles participation and updates the signed-up count
  it('lets the user join and leave a meetup', () => {
    renderAt('/explorer/partie/m1');
    fireEvent.click(screen.getByRole('button', { name: 'Je participe' }));
    expect(screen.getByRole('button', { name: 'Vous participez' }).getAttribute('aria-pressed')).toBe('true');
    expect(screen.getByText(/10 joueurs · 7 inscrits/)).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Vous participez' }));
    expect(screen.getByText(/10 joueurs · 6 inscrits/)).toBeTruthy();
  });

  // Une partie complète ne peut plus être rejointe
  // A full meetup can no longer be joined
  it('disables joining a full meetup', () => {
    // m4 (Tarot) a 4 places pour 4 inscrits
    // m4 (Tarot) has 4 seats for 4 players
    renderAt('/explorer/partie/m4');
    const button = screen.getByRole('button', { name: 'Complet' }) as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });

  // La vue liste donne la même information que la carte
  // The list view gives the same information as the map
  it('lists events and meetups in the list view', () => {
    renderAt('/explorer/liste');
    expect(screen.getByRole('heading', { name: 'Les événements près de chez vous' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Les parties près de chez vous' })).toBeTruthy();
    expect(screen.getByText('6 résultats')).toBeTruthy();
  });

  // Masquer une catégorie retire ses éléments de la liste
  // Hiding a category removes its items from the list
  it('hides events when the Événements chip is switched off', () => {
    renderAt('/explorer/liste');
    const chips = screen.getByRole('group', { name: 'Catégories affichées' });
    fireEvent.click(within(chips).getByRole('button', { name: 'Événements' }));
    expect(screen.queryByRole('heading', { name: 'Les événements près de chez vous' })).toBeNull();
    expect(screen.getByText('3 résultats')).toBeTruthy();
  });

  // Le panneau de filtres s'applique en direct et propose de réinitialiser
  // The filters panel applies live and offers a reset
  it('applies filters live in the filters panel', () => {
    renderAt('/explorer/filtres');
    const dialog = screen.getByRole('dialog', { hidden: true });
    const game = within(dialog).getByLabelText('Jeu', { selector: 'input' });
    fireEvent.change(game, { target: { value: 'catan' } });
    expect(within(dialog).getByRole('button', { name: 'Voir 2 résultats' })).toBeTruthy();
    fireEvent.click(within(dialog).getByRole('button', { name: 'Réinitialiser' }));
    expect(within(dialog).getByRole('button', { name: 'Voir 6 résultats' })).toBeTruthy();
  });

  // Une action pas encore disponible l'indique par un message court
  // A not-yet-available action says so with a short message
  it('announces features that are not available yet', () => {
    renderAt('/explorer');
    fireEvent.click(screen.getByRole('button', { name: /Organiser une partie/ }));
    expect(screen.getByRole('status').textContent).toContain('bientôt');
  });

  // Une partie inconnue renvoie vers la carte
  // An unknown meetup sends the user back to the map
  it('handles an unknown meetup', () => {
    renderAt('/explorer/partie/inconnue');
    expect(screen.getByText("Cette partie n'existe plus.")).toBeTruthy();
  });
});
