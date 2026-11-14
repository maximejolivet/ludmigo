// Vue de départ : la France entière
// Starting view: the whole of France
export const MAP_CENTER: [number, number] = [46.6, 2.4];
export const MAP_ZOOM = 6;

// Centre de la zone où existent les données de démonstration : Nantes
// Centre of the area where the demo data exists: Nantes
export const DEMO_CENTER: [number, number] = [47.2184, -1.5536];

// Fond de carte gratuit, sans clé : tuiles officielles d'OpenStreetMap.
// Leur politique d'usage (https://operations.osmfoundation.org/policies/tiles/) les réserve à un trafic modéré :
// avant de monter en charge, héberger ses tuiles ou choisir un fournisseur, puis renseigner VITE_MAP_TILE_URL.
// Les tuiles viennent d'un serveur tiers : l'adresse IP du visiteur lui est transmise.
// Free base map, no key: official OpenStreetMap tiles.
// Their usage policy (https://operations.osmfoundation.org/policies/tiles/) limits them to moderate traffic:
// before scaling up, host your own tiles or pick a provider, then set VITE_MAP_TILE_URL.
// Tiles come from a third-party server: the visitor's IP address is sent to it.
export const TILE_URL = import.meta.env.VITE_MAP_TILE_URL ?? 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

export const TILE_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
