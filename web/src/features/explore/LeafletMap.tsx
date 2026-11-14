import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { Circle, MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import type { Map as LeafletMapInstance } from 'leaflet';
import { participantCount } from './components/JoinButton';
import { clusterIcon, markerIcon, userIcon } from './components/mapMarkers';
import type { SeatsInfo } from './components/mapMarkers';
import { useExplore } from './context';
import { NOW } from './data';
import { isOpenNow } from './venues';
import { MAP_CENTER, MAP_ZOOM, TILE_ATTRIBUTION, TILE_URL } from './mapConfig';
import type { Category, Meetup, MapPoint, UserPosition } from './types';

// Rayon de la zone floue autour d'un joueur, en mètres : la position exacte n'est jamais affichée
// Radius of the blurred area around a player, in metres: the exact position is never shown
const PLAYER_AREA_RADIUS_M = 320;

// Au-delà de cette précision (en mètres), le cercle d'incertitude n'est plus affiché
// Beyond this accuracy (in metres), the uncertainty circle is no longer drawn
const MAX_ACCURACY_CIRCLE_M = 2000;

// Au-delà de ce zoom, les épingles ne sont plus regroupées (la partie sélectionnée reste visible)
// Beyond this zoom, pins are no longer grouped (the selected meetup stays visible)
const UNCLUSTER_ZOOM = 15;

// Recentre la carte sur la partie sélectionnée, sans animation si l'utilisateur la réduit
// Recentres the map on the selected meetup, without animation if the user reduces motion
function FlyToSelected({ point }: { point?: MapPoint }) {
  const map = useMap();
  const lat = point?.lat;
  const lng = point?.lng;

  useEffect(() => {
    if (lat === undefined || lng === undefined) return;
    const reduceMotion =
      typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const zoom = Math.max(map.getZoom(), UNCLUSTER_ZOOM);
    if (reduceMotion) map.setView([lat, lng], zoom, { animate: false });
    else map.flyTo([lat, lng], zoom, { duration: 0.6 });
  }, [map, lat, lng]);

  return null;
}

// Recalcule la taille de la carte quand son conteneur change (le volet du bas monte ou descend)
// Recomputes the map size when its container changes (the bottom sheet moves up or down)
function ResizeWatcher() {
  const map = useMap();
  useEffect(() => {
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(() => map.invalidateSize());
    observer.observe(map.getContainer());
    return () => observer.disconnect();
  }, [map]);
  return null;
}

// Part des sièges occupés et état de l'anneau d'une partie
// Share of occupied seats and ring state of a meetup
function seatsOf(meetup: Meetup, joinedIds: ReadonlySet<string>): SeatsInfo {
  const count = participantCount(meetup, joinedIds);
  const left = meetup.capacity - count;
  return {
    ratio: Math.min(1, count / meetup.capacity),
    tone: left <= 0 ? 'full' : left <= 2 ? 'last' : 'open',
  };
}

// Regroupe les épingles proches d'une même catégorie en une bulle avec leur nombre
// Groups nearby pins of one category into a bubble showing their count
function Cluster({ category, children }: { category: Category; children: ReactNode }) {
  return (
    <MarkerClusterGroup
      chunkedLoading
      showCoverageOnHover={false}
      maxClusterRadius={48}
      disableClusteringAtZoom={UNCLUSTER_ZOOM}
      iconCreateFunction={clusterIcon(category)}
    >
      {children}
    </MarkerClusterGroup>
  );
}

interface LeafletMapProps {
  // Position de l'utilisateur quand il l'a partagée (jamais envoyée ailleurs)
  // The user's position when they shared it (never sent anywhere)
  userPosition?: UserPosition | null;
  selectedId?: string;
  selectedVenueId?: string;
  selectedEventId?: string;
  selectedPlayerId?: string;
  onSelectVenue: (venueId: string) => void;
  onSelectEvent: (eventId: string) => void;
  onSelectPlayer: (playerId: string) => void;
  onSelectMeetup: (meetupId: string) => void;
  onReady: (map: LeafletMapInstance) => void;
}

// Carte Leaflet au style « Snap Map » : fond pastel, pastilles rondes, regroupements, zones floues pour les joueurs
// Leaflet map in "Snap Map" style: pastel base, round bubbles, clusters, blurred areas for players
export function LeafletMap({
  userPosition,
  selectedId,
  selectedVenueId,
  selectedEventId,
  selectedPlayerId,
  onSelectMeetup,
  onSelectVenue,
  onSelectEvent,
  onSelectPlayer,
  onReady,
}: LeafletMapProps) {
  const { data, results, joinedIds } = useExplore();
  // L'élément choisi, cherché dans toutes les données pour que la carte se recentre même s'il est filtré
  // The chosen item, looked up in all the data so the map recentres even if it is filtered out
  const selected =
    data.meetups.find((meetup) => meetup.id === selectedId) ??
    data.venues.find((venue) => venue.id === selectedVenueId) ??
    data.events.find((event) => event.id === selectedEventId) ??
    data.players.find((player) => player.id === selectedPlayerId);

  return (
    <MapContainer
      ref={(map) => {
        if (map) onReady(map);
      }}
      center={MAP_CENTER}
      zoom={MAP_ZOOM}
      minZoom={5}
      maxZoom={18}
      zoomControl={false}
      className="snap-map absolute inset-0"
    >
      <TileLayer url={TILE_URL} attribution={TILE_ATTRIBUTION} maxZoom={19} />

      {results.players.map((player) => (
        <Circle
          key={`area-${player.id}`}
          center={[player.position.lat, player.position.lng]}
          radius={PLAYER_AREA_RADIUS_M}
          pathOptions={{ stroke: false, fillColor: '#e48f39', fillOpacity: 0.2 }}
          interactive={false}
        />
      ))}

      <Cluster category="players">
        {results.players.map((player) => (
          <Marker
            key={player.id}
            position={[player.position.lat, player.position.lng]}
            icon={markerIcon('players', player.id === selectedPlayerId)}
            title={`Joueur : ${player.name}`}
            zIndexOffset={player.id === selectedPlayerId ? 1000 : 0}
            eventHandlers={{ click: () => onSelectPlayer(player.id) }}
          />
        ))}
      </Cluster>
      <Cluster category="venues">
        {results.venues.map((venue) => (
          <Marker
            key={venue.id}
            position={[venue.position.lat, venue.position.lng]}
            icon={markerIcon('venues', venue.id === selectedVenueId, undefined, isOpenNow(venue.schedule, NOW))}
            title={`Établissement : ${venue.name}`}
            zIndexOffset={venue.id === selectedVenueId ? 1000 : 0}
            eventHandlers={{ click: () => onSelectVenue(venue.id) }}
          />
        ))}
      </Cluster>
      <Cluster category="events">
        {results.events.map((event) => (
          <Marker
            key={event.id}
            position={[event.position.lat, event.position.lng]}
            icon={markerIcon('events', event.id === selectedEventId)}
            title={`Événement : ${event.title}`}
            zIndexOffset={event.id === selectedEventId ? 1000 : 0}
            eventHandlers={{ click: () => onSelectEvent(event.id) }}
          />
        ))}
      </Cluster>
      <Cluster category="meetups">
        {results.meetups.map((meetup) => (
          <Marker
            key={meetup.id}
            position={[meetup.position.lat, meetup.position.lng]}
            icon={markerIcon('meetups', meetup.id === selectedId, seatsOf(meetup, joinedIds))}
            title={`Partie : ${meetup.title}`}
            zIndexOffset={meetup.id === selectedId ? 1000 : 0}
            eventHandlers={{ click: () => onSelectMeetup(meetup.id) }}
          />
        ))}
      </Cluster>

      {userPosition && (
        <>
          {userPosition.accuracy <= MAX_ACCURACY_CIRCLE_M && (
            <Circle
              center={[userPosition.lat, userPosition.lng]}
              radius={userPosition.accuracy}
              pathOptions={{ color: '#006ca8', weight: 1, fillColor: '#006ca8', fillOpacity: 0.12 }}
              interactive={false}
            />
          )}
          <Marker
            position={[userPosition.lat, userPosition.lng]}
            icon={userIcon}
            interactive={false}
            keyboard={false}
            zIndexOffset={2000}
          />
        </>
      )}

      <ResizeWatcher />
      <FlyToSelected point={selected?.position} />
    </MapContainer>
  );
}
