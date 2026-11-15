// Classes Tailwind partagées par les écrans du back office, reprises de l'application web
// Tailwind classes shared by the back office screens, taken from the web app

// Boutons « jetons » : coins arrondis, contour et ombre dure ; au clic, le jeton s'enfonce
// "Token" buttons: rounded corners, outline and hard shadow; on press the token sinks
const BUTTON_BASE =
  'inline-flex min-h-11 cursor-pointer select-none font-ui items-center justify-center gap-2 rounded-2xl border-2 border-edge px-5 text-sm font-bold no-underline shadow-[0_3px_0_var(--color-edge)] active:translate-y-[3px] active:shadow-[0_0_0_var(--color-edge)] motion-safe:transition-[transform,box-shadow] motion-safe:duration-100 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:active:translate-y-0';

export const buttonClass = {
  // Action principale : jaune / Main action: yellow
  primary: `${BUTTON_BASE} bg-primary text-ink`,
  // Action secondaire : surface / Secondary action: surface
  secondary: `${BUTTON_BASE} bg-surface text-fg`,
  // Consultation : bleu plein / Viewing: solid blue
  link: `${BUTTON_BASE} bg-link text-white`,
  // Action destructrice : rouge, jamais collée à l'action principale / Destructive: red, never next to the main action
  danger: `${BUTTON_BASE} bg-danger text-white`,
};

// Carte : contour de la couleur du texte, coins arrondis / Card: outline in the text colour, rounded corners
export const cardClass = 'rounded-2xl border-2 border-edge bg-surface';

// Étiquettes de statut : contour de la couleur du texte, sans ombre / Status tags: outline in the text colour, no shadow
export const TAG = 'inline-flex items-center gap-1 rounded-lg border-2 px-2 py-0.5 text-xs leading-tight font-bold';
export const TAG_INFO = 'border-accent bg-petrol-tint text-accent';
export const TAG_SUCCESS = 'border-success-text bg-success-tint text-success-text';
export const TAG_WARNING = 'border-edge bg-warning-tint text-fg';
export const TAG_FULL = 'border-edge bg-fg text-surface';

// Choix d'un filtre : enfoncé et plein (pétrole) quand il est retenu, surélevé sinon
// Filter choice: pressed in and filled (petrol) when selected, raised otherwise
const CHOICE_BASE =
  'inline-flex min-h-11 cursor-pointer items-center gap-2 font-ui rounded-xl border-2 border-edge px-3.5 text-sm font-bold motion-safe:transition-[transform,box-shadow] motion-safe:duration-100';
export const CHOICE_ON = `${CHOICE_BASE} translate-y-[3px] bg-petrol text-white shadow-[0_0_0_var(--color-edge)]`;
export const CHOICE_OFF = `${CHOICE_BASE} bg-surface text-fg shadow-[0_3px_0_var(--color-edge)]`;

export const linkClass = 'rounded-sm text-link-text underline underline-offset-4 hover:no-underline';
