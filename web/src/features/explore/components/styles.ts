import type { Category } from '../types';

// Classes Tailwind partagées par les boutons, pour garder des actions identiques partout
// Tailwind classes shared by buttons, to keep actions identical everywhere
const BUTTON_BASE =
  'inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full border-2 px-5 text-sm font-bold no-underline disabled:cursor-not-allowed disabled:opacity-40';

// Action principale : jaune, contour et texte gris du logo
// Main action: yellow, outline and text in the logo grey
export const BUTTON_PRIMARY = `${BUTTON_BASE} border-ink bg-primary text-ink`;

// Action secondaire : contour
// Secondary action: outlined
export const BUTTON_OUTLINE = `${BUTTON_BASE} border-ink bg-white text-ink`;

// Action de consultation : bleu plein
// Viewing action: solid blue
export const BUTTON_LINK = `${BUTTON_BASE} border-link bg-link text-white`;

// Couleur de l'épingle par catégorie
// Pin colour per category
export const PIN_COLOR: Record<Category, string> = {
  players: 'text-pin-players',
  meetups: 'text-pin-meetups',
  events: 'text-pin-events',
  venues: 'text-pin-venues',
};

// Puce de statut : places restantes, étiquettes
// Status pill: seats, labels
export const PILL = 'rounded-full bg-petrol-tint px-2.5 py-0.5 text-xs font-bold text-petrol';

// Avatar rond avec des initiales
// Round avatar with initials
export const AVATAR = 'flex items-center justify-center rounded-full font-bold text-white';
