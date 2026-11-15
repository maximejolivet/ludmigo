import { PAWN_PATH, PAWN_RATIO, PAWN_VIEWBOX } from './pawnShape';

// Pion du logo, à la hauteur donnée / Logo pawn, at the given height
export function Pawn({ height = 24, className }: { height?: number; className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox={PAWN_VIEWBOX} width={Math.round(height * PAWN_RATIO)} height={height} fill="currentColor" className={className}>
      <path d={PAWN_PATH} />
    </svg>
  );
}
