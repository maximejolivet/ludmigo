import { BrowserRouter, Route, Routes } from 'react-router';
import { APP_NAME } from '@ludmigo/shared';

// Composant racine avec les routes de l'application web (page de départ pour l'instant)
// Root component with the routes of the web app (starter page for now)
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <h1>{APP_NAME}</h1>
              <p>Démocratisons le jeu !</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
