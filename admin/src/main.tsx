import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from './ErrorBoundary';
import './index.css';

// L'application se charge à part : l'écran de chargement et le message d'erreur ne dépendent pas de tout le paquet
// The app loads separately: the loading screen and the error message do not depend on the whole bundle
const App = lazy(() => import('./App'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<p role="status" style={{ padding: '2rem', fontFamily: "'Fira Sans', system-ui, sans-serif" }}>Chargement…</p>}>
        <App />
      </Suspense>
    </ErrorBoundary>
  </StrictMode>,
);
