import type { Category } from '../types';

// Boutons « jetons » : coins arrondis, contour et ombre dure gris du logo. Au clic, le jeton s'enfonce
// (l'ombre disparaît pendant qu'il descend de 3 px), sauf si l'utilisateur réduit les animations.
// "Token" buttons: rounded corners, outline and hard shadow in the logo grey. On press the token sinks
// (the shadow disappears as it drops 3 px), unless the user reduces motion.
export const BUTTON_BASE =
  'inline-flex min-h-11 cursor-pointer select-none items-center justify-center gap-2 rounded-2xl border-2 border-edge px-5 text-sm font-bold no-underline shadow-[0_3px_0_var(--color-edge)] active:translate-y-[3px] active:shadow-[0_0_0_var(--color-edge)] motion-safe:transition-[transform,box-shadow] motion-safe:duration-100 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:active:translate-y-0';

// Action principale : jaune
// Main action: yellow
export const BUTTON_PRIMARY = `${BUTTON_BASE} bg-primary text-ink`;

// Action secondaire : blanc
// Secondary action: white
export const BUTTON_OUTLINE = `${BUTTON_BASE} bg-surface text-fg`;

// Action de consultation : bleu plein
// Viewing action: solid blue
export const BUTTON_LINK = `${BUTTON_BASE} bg-link text-white`;

// Action réussie, par exemple une participation confirmée : vert
// Successful action, for example a confirmed participation: green
export const BUTTON_SUCCESS = `${BUTTON_BASE} bg-success text-white`;

// Bouton carré flottant (zoom, fermeture) : même famille, plus petit
// Square floating button (zoom, close): same family, smaller
export const BUTTON_ICON =
  'flex size-11 cursor-pointer items-center justify-center rounded-xl border-2 border-edge bg-surface text-fg shadow-[0_2px_0_var(--color-edge)] active:translate-y-0.5 active:shadow-[0_0_0_var(--color-edge)] motion-safe:transition-[transform,box-shadow] motion-safe:duration-100';

// Couleur du pictogramme par catégorie : variantes assombries de la charte, lisibles sur fond blanc
// Pictogram colour per category: darkened brand variants, readable on a white background
export const ICON_COLOR: Record<Category, string> = {
  players: 'text-orange-text',
  meetups: 'text-link-text',
  events: 'text-fg-soft',
  venues: 'text-success-text',
};

// Étiquettes (tags) de statut : coins peu arrondis, contour de la couleur du texte, sans ombre
// (l'ombre est réservée aux éléments sur lesquels on peut agir). La couleur et le texte portent le sens.
// Status tags: slightly rounded corners, outline in the text colour, no shadow
// (shadows are reserved for elements the user can act on). Colour and text carry the meaning.
export const TAG = 'inline-flex items-center gap-1 rounded-lg border-2 px-2 py-0.5 text-xs leading-tight font-bold';
export const TAG_INFO = 'border-accent bg-petrol-tint text-accent';
export const TAG_SUCCESS = 'border-success-text bg-success-tint text-success-text';
export const TAG_WARNING = 'border-edge bg-warning-tint text-fg';
export const TAG_FULL = 'border-edge bg-fg text-surface';

// Puce de catégorie : surélevée (ombre) quand la catégorie est affichée, enfoncée et grisée quand elle est masquée
// Category chip: raised (shadow) when the category is shown, pressed in and greyed out when hidden
const CHIP_BASE =
  'inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-2 rounded-xl border-2 px-3.5 text-sm font-bold motion-safe:transition-[transform,box-shadow] motion-safe:duration-100';
export const CHIP_ON = `${CHIP_BASE} border-edge bg-surface text-fg shadow-[0_3px_0_var(--color-edge)]`;
export const CHIP_OFF = `${CHIP_BASE} translate-y-[3px] border-edge/30 bg-canvas text-fg-soft line-through shadow-[0_0_0_var(--color-edge)]`;

// Choix d'un filtre : enfoncé et plein (pétrole) quand il est retenu, surélevé et blanc sinon
// Filter choice: pressed in and filled (petrol) when selected, raised and white otherwise
const CHOICE_BASE =
  'inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border-2 border-edge px-3.5 text-sm font-bold motion-safe:transition-[transform,box-shadow] motion-safe:duration-100';
export const CHOICE_ON = `${CHOICE_BASE} translate-y-[3px] bg-petrol text-white shadow-[0_0_0_var(--color-edge)]`;
export const CHOICE_OFF = `${CHOICE_BASE} bg-surface text-fg shadow-[0_3px_0_var(--color-edge)]`;

// Avatar rond avec des initiales
// Round avatar with initials
export const AVATAR = 'flex items-center justify-center rounded-full font-bold text-white';
