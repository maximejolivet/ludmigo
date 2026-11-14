import { divIcon } from 'leaflet';
import type { DivIcon, MarkerCluster } from 'leaflet';
import 'leaflet.markercluster';
import { PAWN_PATH, PAWN_RATIO, PAWN_VIEWBOX } from '../../../pawn';
import type { Category } from '../types';

// Pastilles de carte façon « Snap Map » : rondes, bordure blanche, ombre et petite pointe
// "Snap Map"-style map bubbles: round, white border, shadow and a small tail
const GLYPH_ATTRS = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';

const GLYPHS: Record<Category, string> = {
  players: `<svg viewBox="${PAWN_VIEWBOX}" width="${Math.round(20 * PAWN_RATIO)}" height="20" fill="currentColor"><path d="${PAWN_PATH}"/></svg>`,
  meetups: `<svg ${GLYPH_ATTRS} width="22" height="22"><rect x="4" y="4" width="16" height="16" rx="3.5"/><circle cx="8.5" cy="8.5" r="2" fill="currentColor" stroke="none"/><circle cx="15.5" cy="15.5" r="2" fill="currentColor" stroke="none"/></svg>`,
  events: `<svg ${GLYPH_ATTRS} width="22" height="22"><rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 10h16M8 3v4M16 3v4"/></svg>`,
  venues: `<svg ${GLYPH_ATTRS} width="22" height="22"><path d="M4 10l1.5-5h13L20 10M4 10v10h16V10M4 10a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0 2.7 2.7 0 0 0 5.3 0M10 20v-5h4v5"/></svg>`,
};

// Noms de classes écrits en entier pour que Tailwind les détecte
// Class names written in full so Tailwind detects them
const BACKGROUNDS: Record<Category, string> = {
  players: 'bg-pin-players',
  meetups: 'bg-pin-meetups',
  events: 'bg-pin-events',
  venues: 'bg-pin-venues',
};

// Les joueurs sont des pastilles plus petites : seule une zone approximative est montrée
// Players are smaller bubbles: only an approximate area is shown
const SIZES: Record<Category, number> = { players: 36, meetups: 44, events: 44, venues: 44 };

// Épaisseur de l'anneau de places autour d'une pastille de partie
// Thickness of the seats ring around a meetup bubble
const RING = 5;

// Places d'une partie : part des sièges occupés (0 à 1) et état, pour colorer l'anneau
// Seats of a meetup: share of occupied seats (0 to 1) and state, to colour the ring
export interface SeatsInfo {
  ratio: number;
  tone: 'open' | 'last' | 'full';
}

const RING_COLORS: Record<SeatsInfo['tone'], string> = { open: '#006ca8', last: '#f8a00d', full: '#3e3e3e' };

// Couleur du halo d'une bulle de regroupement, par catégorie
// Halo colour of a cluster bubble, per category
const HALOS: Record<Category, string> = {
  players: 'bg-pin-players/30',
  meetups: 'bg-pin-meetups/30',
  events: 'bg-pin-events/30',
  venues: 'bg-pin-venues/30',
};

// Halo animé de la pastille sélectionnée, par catégorie
// Animated halo of the selected bubble, per category
const PING_HALOS: Record<Category, string> = {
  players: 'bg-pin-players/40',
  meetups: 'bg-pin-meetups/40',
  events: 'bg-pin-events/40',
  venues: 'bg-pin-venues/40',
};

// Bulle de regroupement : même style que les pastilles, avec le nombre d'éléments regroupés
// Cluster bubble: same style as the pins, showing the number of grouped items
export function clusterIcon(category: Category): (cluster: MarkerCluster) => DivIcon {
  return (cluster) => {
    const count = cluster.getChildCount();
    return divIcon({
      className: '',
      iconSize: [60, 60],
      html: `<div class="flex size-[60px] items-center justify-center rounded-full ${HALOS[category]}">
        <span class="flex size-11 items-center justify-center rounded-full border-[3px] border-white text-base font-bold text-white shadow-[0_4px_10px_rgba(0,0,0,.3)] ${BACKGROUNDS[category]}" aria-label="${count} éléments regroupés">${count}</span>
      </div>`,
    });
  };
}

const cache = new Map<string, DivIcon>();

// Icône Leaflet d'une catégorie : halo animé si la partie est sélectionnée,
// anneau de places autour des parties (il se remplit à mesure que la table se remplit)
// Leaflet icon for a category: animated halo if the meetup is selected,
// seats ring around meetups (it fills up as the table fills up)
export function markerIcon(category: Category, selected = false, seats?: SeatsInfo, venueOpen?: boolean): DivIcon {
  // Le remplissage est arrondi à 10 % près pour limiter le nombre d'icônes en cache
  // The fill is rounded to 10% to limit the number of cached icons
  const percent = seats ? Math.round(seats.ratio * 10) * 10 : 0;
  const key = `${category}:${selected}:${seats ? `${percent}:${seats.tone}` : '-'}:${venueOpen ?? '-'}`;
  const cached = cache.get(key);
  if (cached) return cached;

  const bubble = SIZES[category];
  const ring = seats ? bubble + RING * 2 : bubble;
  const width = ring;
  const height = ring + 12;
  const background = BACKGROUNDS[category];
  const halo = selected
    ? `<span class="absolute top-0 rounded-full ${PING_HALOS[category]} motion-safe:animate-ping" style="width:${ring}px;height:${ring}px"></span>`
    : '';
  // Point d'ouverture d'un établissement : vert quand il est ouvert, gris quand il est fermé
  // Opening dot of a venue: green when open, grey when closed
  const openDot =
    venueOpen === undefined
      ? ''
      : `<span class="absolute top-0 right-0 z-20 size-3.5 rounded-full border-2 border-white ${venueOpen ? 'bg-[#1f9d62]' : 'bg-[#8a8a8a]'}"></span>`;
  const ringBackground = seats
    ? `background:conic-gradient(${RING_COLORS[seats.tone]} ${percent}%, #d8d8d8 0)`
    : '';

  const icon = divIcon({
    className: '',
    iconSize: [width, height],
    iconAnchor: [width / 2, height],
    html: `<div class="relative flex flex-col items-center ${selected ? 'origin-bottom scale-125' : ''}" style="width:${width}px;height:${height}px">
      ${halo}
      ${openDot}
      <span class="relative z-10 flex items-center justify-center rounded-full shadow-[0_4px_10px_rgba(0,0,0,.3)]" style="width:${ring}px;height:${ring}px;${ringBackground}">
        <span class="flex items-center justify-center rounded-full border-[3px] border-white text-white ${background}" style="width:${bubble}px;height:${bubble}px">${GLYPHS[category]}</span>
      </span>
      <span class="-mt-2 size-3 rotate-45 rounded-sm ${background}"></span>
    </div>`,
  });
  cache.set(key, icon);
  return icon;
}

// Point bleu de la position de l'utilisateur, avec un halo qui pulse (désactivé si les animations sont réduites)
// Blue dot for the user's position, with a pulsing halo (off when animations are reduced)
export const userIcon: DivIcon = divIcon({
  className: '',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
  html: `<div class="relative flex size-7 items-center justify-center">
    <span class="absolute size-7 rounded-full bg-link/30 motion-safe:animate-ping"></span>
    <span class="relative size-[18px] rounded-full border-[3px] border-white bg-link shadow-[0_2px_6px_rgba(0,0,0,.4)]"></span>
  </div>`,
});
