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

describe('Explore dashboard, second round of ideas', () => {
  afterEach(cleanup);

  // Le trajet et « Qui vient ? » apparaissent dans le détail d'une partie
  // Travel time and "Who is coming?" appear in the meetup detail
  it('shows the travel time and the attendees', () => {
    renderAt('/explorer/partie/m1');
    expect(screen.getByText(/24 min à pied/)).toBeTruthy();
    expect(screen.getByText('Qui vient ?')).toBeTruthy();
    expect(screen.getByText('Alix L.')).toBeTruthy();
  });

  // Une fois inscrit : confirmation et agenda
  // Once signed up: confirmation and calendar
  it('offers the calendar once signed up', () => {
    renderAt('/explorer/partie/m1');
    expect(screen.queryByRole('button', { name: "Ajouter à l'agenda" })).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Je participe' }));
    expect(screen.getByRole('button', { name: "Ajouter à l'agenda" })).toBeTruthy();
    expect(screen.getByRole('status').textContent).toContain('Vous participez à');
  });

  // « Trouve-moi une partie » ouvre la meilleure partie et explique pourquoi
  // "Find me a meetup" opens the best meetup and explains why
  it('finds a meetup and explains the choice', () => {
    renderAt('/explorer');
    fireEvent.click(screen.getByRole('button', { name: 'Trouve-moi une partie' }));
    expect(screen.getByRole('heading', { name: 'Soirée Skull', level: 2 })).toBeTruthy();
    const note = screen.getByRole('note');
    expect(within(note).getByText('Choisie pour vous')).toBeTruthy();
    expect(within(note).getByText('Ce soir, 20 h 00')).toBeTruthy();
  });

  // Une alerte de recherche se crée depuis le champ « Jeu » des filtres
  // A search alert is created from the "Game" field of the filters
  it('creates a game alert from the filters', () => {
    renderAt('/explorer/filtres');
    const dialog = screen.getByRole('dialog', { hidden: true });
    fireEvent.change(within(dialog).getByLabelText('Jeu', { selector: 'input' }), { target: { value: 'catan' } });
    fireEvent.click(within(dialog).getByRole('button', { name: 'Me prévenir pour « catan »' }));
    expect(within(dialog).getByRole('button', { name: 'Me prévenir pour « catan »', pressed: true })).toBeTruthy();
    // Le panneau contient aussi un <output> (la distance), qui a le rôle « status » : on cherche le message court
    // The panel also holds an <output> (the distance), which has the "status" role: look for the short message
    expect(screen.getAllByRole('status').some((node) => node.textContent?.includes('prévenons'))).toBe(true);
  });

  // « Ouvert » ne garde que les établissements ouverts à l'heure de référence
  // "Open" keeps only the venues open at the reference time
  it('filters venues that are open now', () => {
    renderAt('/explorer');
    expect(screen.getByText(/10 établissements/)).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Ouvert' }));
    expect(screen.getByText(/7 établissements/)).toBeTruthy();
  });

  // La fiche d'un établissement indique s'il est ouvert, son ambiance et son accessibilité
  // A venue page says whether it is open, its atmosphere and accessibility
  it('shows the opening status and the venue tags', () => {
    renderAt('/explorer/lieu/v1');
    expect(screen.getByText("Ouvert jusqu'à 1 h")).toBeTruthy();
    const tags = screen.getByRole('list', { name: 'Ambiance et accessibilité' });
    expect(within(tags).getByText('Animé')).toBeTruthy();
    expect(within(tags).getByText('Accessible PMR')).toBeTruthy();
    cleanup();
    renderAt('/explorer/lieu/v7');
    expect(screen.getByText('Ouvre demain à 10 h')).toBeTruthy();
  });

  // Le point de l'épingle d'un établissement est vert quand il est ouvert, gris sinon
  // A venue pin's dot is green when open, grey otherwise
  it('draws the opening dot on venue pins', () => {
    expect(markerIcon('venues', false, undefined, true).options.html as string).toContain('bg-[#1f9d62]');
    expect(markerIcon('venues', false, undefined, false).options.html as string).toContain('bg-[#8a8a8a]');
  });

  // Premier lancement : niveau et jeux préférés sont enregistrés, puis l'invitation disparaît
  // First launch: level and favourite games are saved, then the invitation goes away
  it('saves the profile from the welcome dialog', () => {
    renderAt('/explorer/bienvenue');
    const dialog = screen.getByRole('dialog', { hidden: true });
    const save = within(dialog).getByRole('button', { name: 'Enregistrer' }) as HTMLButtonElement;
    expect(save.disabled).toBe(true);
    fireEvent.click(within(dialog).getByRole('button', { name: /^Débutant/ }));
    fireEvent.click(within(dialog).getByRole('button', { name: 'Catan' }));
    fireEvent.click(save);
    expect(JSON.parse(window.localStorage.getItem('ludmigo.profile') as string)).toEqual({
      level: 'beginner',
      favorites: ['Catan'],
    });
  });

  // Sans profil, la liste invite à personnaliser ; avec un profil, elle marque les jeux préférés « Pour vous »
  // Without a profile, the list invites to personalise; with one, it marks favourite games "For you"
  it('personalises the list from the profile', () => {
    renderAt('/explorer/liste');
    expect(screen.getByText(/Dites-nous ce que vous aimez/)).toBeTruthy();
    expect(screen.queryByText('Pour vous')).toBeNull();
    cleanup();
    window.localStorage.setItem('ludmigo.profile', JSON.stringify({ level: 'expert', favorites: ['Catan'] }));
    renderAt('/explorer/liste');
    expect(screen.queryByText(/Dites-nous ce que vous aimez/)).toBeNull();
    expect(screen.getAllByText('Pour vous').length).toBeGreaterThan(0);
  });
});
