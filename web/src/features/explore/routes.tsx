import { Route } from 'react-router';
import { ExploreLayout } from './ExploreLayout';
import { FiltersDialog } from './FiltersDialog';
import { ListView } from './ListView';
import { MapView } from './MapView';
import { OnboardingDialog } from './OnboardingDialog';

// Routes de l'exploration : carte, détail d'une partie, fiche d'un établissement, d'un événement ou d'un joueur, liste et filtres (placés sous /explorer)
// Exploration routes: map, meetup detail, venue, event or player page, list and filters (mounted under /explorer)
export const exploreRoutes = (
  <Route path="explorer" element={<ExploreLayout />}>
    <Route index element={<MapView />} />
    <Route path="partie/:meetupId" element={<MapView />} />
    <Route path="lieu/:venueId" element={<MapView />} />
    <Route path="evenement/:eventId" element={<MapView />} />
    <Route path="joueur/:playerId" element={<MapView />} />
    <Route path="liste" element={<ListView />} />
    <Route
      path="bienvenue"
      element={
        <>
          <MapView />
          <OnboardingDialog />
        </>
      }
    />
    <Route
      path="filtres"
      element={
        <>
          <MapView />
          <FiltersDialog />
        </>
      }
    />
  </Route>
);
