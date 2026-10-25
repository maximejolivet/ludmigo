import { render } from '@testing-library/react-native';
import App from './App';

// Vérifie que l'écran d'accueil affiche le nom de l'application
// Checks that the home screen shows the app name
it('shows the app name', async () => {
  const { getByText } = await render(<App />);
  expect(getByText('Ludmigo')).toBeTruthy();
});
