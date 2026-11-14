/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Modèle d'URL des tuiles de la carte (voir features/explore/mapConfig.ts)
  // Map tile URL template (see features/explore/mapConfig.ts)
  readonly VITE_MAP_TILE_URL?: string;
}
