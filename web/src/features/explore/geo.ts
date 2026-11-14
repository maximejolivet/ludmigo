import { DEMO_CENTER } from './mapConfig';
import type { ExploreData, MapPoint, UserPosition } from './types';

// Rayon de la Terre, en kilomètres
// Earth radius, in kilometres
const EARTH_RADIUS_KM = 6371;

// Distance (en degrés) au-delà de laquelle une position est hors de la zone de démonstration (Nantes)
// Distance (in degrees) beyond which a position is outside the demo area (Nantes)
const DEMO_AREA_DEGREES = 0.3;

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

// Distance à vol d'oiseau entre deux points, en kilomètres (formule de haversine)
// As-the-crow-flies distance between two points, in kilometres (haversine formula)
export function distanceKm(a: MapPoint, b: MapPoint): number {
  const dLat = toRadians(b.lat - a.lat);
  const dLng = toRadians(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(toRadians(a.lat)) * Math.cos(toRadians(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h));
}

// La position est-elle dans la zone où les données de démonstration existent ?
// Is the position inside the area where the demo data exists?
export function isInDemoArea(position: MapPoint): boolean {
  return Math.abs(position.lat - DEMO_CENTER[0]) <= DEMO_AREA_DEGREES && Math.abs(position.lng - DEMO_CENTER[1]) <= DEMO_AREA_DEGREES;
}

// Commune de l'élément le plus proche : c'est le « lieu » proposé quand on se localise
// City of the closest item: this is the "place" suggested when the user locates themselves
export function nearestCity(origin: MapPoint, data: ExploreData): string {
  const items = [...data.players, ...data.venues, ...data.meetups, ...data.events];
  let best = items[0];
  for (const item of items) {
    if (distanceKm(origin, item.position) < distanceKm(origin, best.position)) best = item;
  }
  return best.city;
}

// Recalcule les distances à partir de la position de l'utilisateur, au dixième de kilomètre
// Recomputes the distances from the user's position, to a tenth of a kilometre
export function withDistancesFrom(origin: MapPoint, data: ExploreData): ExploreData {
  const update = <T extends { position: MapPoint; distanceKm: number }>(item: T): T => ({
    ...item,
    distanceKm: Math.round(distanceKm(origin, item.position) * 10) / 10,
  });
  return {
    players: data.players.map(update),
    venues: data.venues.map(update),
    meetups: data.meetups.map(update),
    events: data.events.map(update),
  };
}

export type { UserPosition };
