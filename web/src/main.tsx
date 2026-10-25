import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

// Point d'entrée de l'application web React
// Entry point of the React web app
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
