import { placeholderImage } from '../placeholderImage';
import type { PlaceholderKind } from '../placeholderImage';

interface CardImageProps {
  kind: PlaceholderKind;
  // Texte affiché dans l'image provisoire : le jeu ou l'événement
  // Text shown in the placeholder image: the game or the event
  label: string;
  // Dimensions d'affichage en pixels, pour réserver la place avant le chargement
  // Display size in pixels, to reserve the space before loading
  width: number;
  height: number;
  className?: string;
}

// Image de carte : décorative, car le titre de la carte porte déjà l'information
// Card image: decorative, because the card title already carries the information
export function CardImage({ kind, label, width, height, className = '' }: CardImageProps) {
  return (
    <img
      src={placeholderImage({ kind, label, width, height })}
      alt=""
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      className={`block bg-beige object-cover ${className}`}
    />
  );
}
