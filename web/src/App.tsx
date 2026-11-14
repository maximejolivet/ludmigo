import { useLayoutEffect, useRef } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { APP_NAME } from '@ludmigo/shared';
import { exploreRoutes } from './features/explore/routes';
import { PAWN_PATH, PAWN_VIEWBOX } from './pawn';
import logoSvg from './assets/logos/logo-baseline-ludmigo-couleur-noir.svg?raw';
import peopleLogo from './assets/logos/logo-ludmigo-people-noir.svg';

// Dépôt GitHub du projet
// Project GitHub repository
const GITHUB_URL = 'https://github.com/maximejolivet/ludmigo';

// SVG du logo mis en ligne dans la page pour animer ses formes (fichier local de confiance)
// Logo SVG inlined in the page so its shapes can be animated (trusted local file)
const LOGO_MARKUP = logoSvg
  .replace(/<\?xml[^>]*\?>/, '')
  .replace(/<title>[^<]*<\/title>/, '')
  .replace('<svg ', '<svg aria-hidden="true" focusable="false" ');

// Pions du fond : position horizontale (%), taille (px), couleur du pion, durée et délai (s)
// Background pawns: horizontal position (%), size (px), pawn colour, duration and delay (s)
const BACKGROUND_PAWNS = [
  { left: 6, size: 26, color: '#146ca8', duration: 22, delay: -4 },
  { left: 16, size: 17, color: '#f28a15', duration: 17, delay: -12 },
  { left: 27, size: 34, color: '#2a986d', duration: 27, delay: -20 },
  { left: 38, size: 19, color: '#146ca8', duration: 19, delay: -8 },
  { left: 49, size: 29, color: '#f28a15', duration: 25, delay: -15 },
  { left: 58, size: 16, color: '#2a986d', duration: 16, delay: -2 },
  { left: 68, size: 36, color: '#146ca8', duration: 29, delay: -22 },
  { left: 77, size: 20, color: '#f28a15', duration: 20, delay: -10 },
  { left: 86, size: 28, color: '#2a986d', duration: 24, delay: -17 },
  { left: 94, size: 18, color: '#f28a15', duration: 18, delay: -6 },
];

// Page d'accueil provisoire : uniquement le logo, centré
// Temporary home page: the logo only, centred
function LogoPage() {
  const logoRef = useRef<HTMLDivElement>(null);

  // Décale l'apparition de chaque forme selon sa position, de gauche à droite
  // Staggers each shape's entrance by its position, left to right
  useLayoutEffect(() => {
    const shapes = logoRef.current?.querySelectorAll<SVGGraphicsElement>('.cls-1');
    shapes?.forEach((shape) => {
      if (typeof shape.getBBox !== 'function') return;
      const { x } = shape.getBBox();
      shape.style.animationDelay = `${Math.round((x / 879) * 450)}ms`;
    });
  }, []);

  return (
    <main className="logo-page">
      <div className="logo-page__pawns" aria-hidden="true">
        {BACKGROUND_PAWNS.map((pawn) => (
          <svg
            key={`${pawn.left}-${pawn.color}`}
            className="logo-page__pawn"
            viewBox={PAWN_VIEWBOX}
            style={{
              left: `${pawn.left}%`,
              width: pawn.size,
              height: Math.round(pawn.size * 2.24),
              fill: pawn.color,
              animationDuration: `${pawn.duration}s`,
              animationDelay: `${pawn.delay}s`,
            }}
          >
            <path d={PAWN_PATH} />
          </svg>
        ))}
      </div>
      <h1 className="visually-hidden">{APP_NAME}</h1>
      <div className="logo-page__brand">
        <div
          ref={logoRef}
          className="logo-page__logo"
          dangerouslySetInnerHTML={{ __html: LOGO_MARKUP }}
        />
        <p className="logo-page__baseline">Démocratisons le jeu !</p>
      </div>
      <a
        className="logo-page__github"
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Ludmigo sur GitHub (nouvel onglet)"
      >
        <img src={peopleLogo} alt="" />
      </a>
    </main>
  );
}

// Routes de l'application web (séparées du routeur pour pouvoir les tester)
// Routes of the web app (kept apart from the router so they can be tested)
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LogoPage />} />
      {exploreRoutes}
    </Routes>
  );
}

// Composant racine avec le routeur de l'application web
// Root component with the router of the web app
export function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
