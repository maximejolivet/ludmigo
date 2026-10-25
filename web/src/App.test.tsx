import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('App', () => {
  // Vérifie que la page d'accueil affiche le nom de l'application
  // Checks that the home page shows the app name
  it('shows the app name', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Ludmigo' })).toBeTruthy();
  });
});
