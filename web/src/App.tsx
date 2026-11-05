import { useLayoutEffect, useRef } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { APP_NAME } from '@ludmigo/shared';
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

// Forme exacte d'un pion du logo (SVG des personnages), réutilisée pour tous les pions du fond
// Exact shape of a pawn from the logo (people SVG), reused for every background pawn
const PAWN_PATH =
  'M131.319 162.828 C131.319 167.043 130.575 171.258 128.096 174.605 C125.369 178.325 120.906 180.06 116.691 181.424 C107.269 184.151 97.475 184.771 87.805 184.027 C80.739 183.531 73.548 182.292 67.35 178.82 C65.118 177.581 62.887 175.969 61.647 173.614 C60.655 171.63 60.407 169.151 60.283 166.919 C58.672 136.422 73.424 108.033 80.119 78.279 C80.119 78.279 75.036 74.188 74.54 73.692 C72.805 71.833 71.317 69.725 70.077 67.494 C67.598 63.031 66.11 57.824 65.986 52.617 C65.738 42.079 71.193 32.41 79.499 26.831 C83.714 23.98 88.673 22.368 93.756 22.244 C106.153 21.996 118.054 31.418 121.402 44.063 C124.749 56.708 119.17 71.337 108.384 77.907 C113.839 96.007 119.294 114.231 124.749 132.331 C126.98 139.893 129.336 147.58 130.699 155.39 C130.947 157.993 131.319 160.473 131.319 162.828 Z';
const PAWN_VIEWBOX = '58.6 21.9 72.8 163';

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

// Composant racine avec les routes de l'application web
// Root component with the routes of the web app
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
