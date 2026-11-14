// Images provisoires fournies par https://placehold.co/ en attendant les visuels des éditeurs et des lieux.
// Chaque image est demandée à un serveur tiers (l'adresse IP du visiteur lui est transmise) : à remplacer
// par de vraies images hébergées par Ludmigo avant la mise en production. Un seul endroit à changer.
// Placeholder images served by https://placehold.co/ until publisher and venue visuals exist.
// Each image is requested from a third-party server (the visitor's IP address is sent to it): replace them
// with real images hosted by Ludmigo before going to production. One single place to change.
export type PlaceholderKind = 'meetup' | 'event' | 'venue';

// Couleurs de fond et de texte (sans #) par type de carte
// Background and text colours (without #) per card type
const COLORS: Record<PlaceholderKind, { background: string; text: string }> = {
  meetup: { background: 'd7b695', text: '3e3e3e' },
  event: { background: 'd9eaee', text: '155767' },
  venue: { background: 'd4ecdf', text: '007a52' },
};

interface PlaceholderOptions {
  kind: PlaceholderKind;
  label: string;
  width: number;
  height: number;
}

// Adresse d'une image provisoire, demandée en double résolution pour les écrans nets
// URL of a placeholder image, requested at double resolution for sharp screens
export function placeholderImage({ kind, label, width, height }: PlaceholderOptions): string {
  const { background, text } = COLORS[kind];
  const query = new URLSearchParams({ text: label, font: 'montserrat' });
  return `https://placehold.co/${width * 2}x${height * 2}/${background}/${text}/png?${query.toString()}`;
}
