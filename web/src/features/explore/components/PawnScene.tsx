import { PAWN_PATH, PAWN_VIEWBOX } from '../../../pawn';

const PAWNS = [
  { x: 22, y: 8, width: 26, height: 58, fill: '#006ca8' },
  { x: 62, y: 0, width: 32, height: 72, fill: '#e48f39' },
  { x: 106, y: 12, width: 24, height: 54, fill: '#4ba674' },
];

// Petite scène pour les écrans vides : trois pions du logo sur un plateau
// Small scene for empty screens: three logo pawns on a board
export function PawnScene({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 152 100" className={className}>
      <path d="M8 76L76 52l68 24-68 24z" fill="none" className="stroke-edge" strokeWidth="3" strokeLinejoin="round" />
      {PAWNS.map((pawn) => (
        <svg key={pawn.fill} x={pawn.x} y={pawn.y + 6} width={pawn.width} height={pawn.height} viewBox={PAWN_VIEWBOX} fill={pawn.fill}>
          <path d={PAWN_PATH} />
        </svg>
      ))}
    </svg>
  );
}
