import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/fira-sans/400.css';
import '@fontsource/fira-sans/500.css';
import '@fontsource/fira-sans/700.css';
import { App } from './App';
import './tailwind.css';
import './index.css';

// Point d'entrée de l'application web React
// Entry point of the React web app
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
