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

describe('Event detail', () => {
  afterEach(cleanup);

  // Le détail d'un événement : titre, prix, description, date, lieu et lien vers l'établissement
  // Event detail: title, price, description, date, place and a link to the venue
  it('shows the event detail', () => {
    renderAt('/explorer/evenement/e1');
    expect(screen.getByRole('heading', { name: 'Soirée Blind Test !', level: 2 })).toBeTruthy();
    expect(screen.getByText('Gratuit')).toBeTruthy();
    expect(screen.getByText(/huit manches musicales/)).toBeTruthy();
    expect(screen.getByText('Mercredi 16 décembre · 20 h 30')).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Le Bistro Le Parisien' }).getAttribute('href')).toBe('/explorer/lieu/v1');
    expect(screen.getByRole('button', { name: "Ajouter à l'agenda" })).toBeTruthy();
  });

  // « Voir » sur une carte d'événement ouvre son détail
  // "View" on an event card opens its detail
  it('opens the detail from the event card', () => {
    renderAt('/explorer/liste');
    fireEvent.click(screen.getByRole('link', { name: 'Voir Soirée Blind Test !' }));
    expect(screen.getByRole('heading', { name: 'Soirée Blind Test !', level: 2 })).toBeTruthy();
  });

  // L'épingle d'un événement ouvre aussi son détail
  // An event pin also opens its detail
  it('opens the detail from the map pin', () => {
    renderAt('/explorer');
    fireEvent.click(screen.getByRole('button', { name: 'Événement : Soirée Blind Test !' }));
    expect(screen.getByRole('heading', { name: 'Soirée Blind Test !', level: 2 })).toBeTruthy();
  });

  it('handles an unknown event', () => {
    renderAt('/explorer/evenement/inconnu');
    expect(screen.getByText("Cet événement n'existe plus.")).toBeTruthy();
  });
});

describe('Player card', () => {
  afterEach(cleanup);

  // Une épingle de joueur ouvre sa fiche : ce qu'il partage, avec une position approximative
  // A player pin opens their card: what they share, with an approximate position
  it('opens the player card from the map pin', () => {
    renderAt('/explorer');
    fireEvent.click(screen.getByRole('button', { name: 'Joueur : Alix L.' }));
    expect(screen.getByRole('heading', { name: 'Alix L.', level: 2 })).toBeTruthy();
    expect(screen.getByText('Confirmé')).toBeTruthy();
    expect(screen.getByText('Cherche une partie ce soir')).toBeTruthy();
    const games = screen.getByRole('heading', { name: 'Jeux préférés' }).parentElement as HTMLElement;
    expect(within(games).getByText('Catan')).toBeTruthy();
    expect(within(games).getByText('Wingspan')).toBeTruthy();
    expect(screen.getByText(/Position approximative/)).toBeTruthy();
  });

  // Un joueur qui ne cherche rien n'affiche pas de statut
  // A player who is not looking for anything shows no status
  it('hides the status when the player is not looking for a meetup', () => {
    renderAt('/explorer/joueur/p2');
    expect(screen.getByRole('heading', { name: 'Samir M.', level: 2 })).toBeTruthy();
    expect(screen.queryByText(/Cherche/)).toBeNull();
  });

  // Inviter un joueur confirme par un message court
  // Inviting a player confirms with a short message
  it('invites a player', () => {
    renderAt('/explorer/joueur/p1');
    fireEvent.click(screen.getByRole('button', { name: 'Inviter Alix à jouer' }));
    expect(screen.getByRole('status').textContent).toContain('Invitation envoyée à Alix');
  });

  it('handles an unknown player', () => {
    renderAt('/explorer/joueur/inconnu');
    expect(screen.getByText("Ce joueur n'est plus visible.")).toBeTruthy();
  });
});
