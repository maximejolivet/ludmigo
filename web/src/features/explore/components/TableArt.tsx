// Pion simple, utilisé dans l'illustration
// Simple pawn used in the illustration
function Pawn({ x, y, width, height, color }: { x: number; y: number; width: number; height: number; color: string }) {
  return (
    <svg x={x} y={y} width={width} height={height} viewBox="0 0 40 56" fill={color}>
      <circle cx="20" cy="10" r="8" />
      <path d="M20 17c-6 4-6 15-11 24-2 4 0 6 4 6h14c4 0 6-2 4-6-5-9-5-20-11-24z" />
    </svg>
  );
}

// Illustration provisoire d'une table de jeu, à remplacer par les visuels des éditeurs ou des lieux
// Placeholder illustration of a game table, to be replaced by publisher or venue visuals
export function TableArt({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      className={className}
    >
      <rect width="400" height="300" fill="#d7b695" />
      <path d="M0 62H400M0 124H400M0 186H400M0 248H400" stroke="#c7a27e" strokeWidth="2" />
      <g transform="rotate(-16 63 72)">
        <rect x="40" y="40" width="46" height="64" rx="5" fill="#fff" />
        <rect x="46" y="46" width="34" height="52" rx="3" fill="#5888b3" />
      </g>
      <g transform="rotate(12 341 82)">
        <rect x="318" y="50" width="46" height="64" rx="5" fill="#fff" />
        <rect x="324" y="56" width="34" height="52" rx="3" fill="#e48f39" />
      </g>
      <polygon points="70,215 200,155 330,215 200,275" fill="#f7efe3" stroke="#3e3e3e" strokeWidth="4" strokeLinejoin="round" />
      <Pawn x={118} y={100} width={56} height={78} color="#5888b3" />
      <Pawn x={175} y={80} width={64} height={90} color="#e48f39" />
      <Pawn x={240} y={108} width={52} height={72} color="#4ba674" />
    </svg>
  );
}
