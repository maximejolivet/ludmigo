import { Route } from 'react-router';
import { ExploreLayout } from './ExploreLayout';
import { FiltersDialog } from './FiltersDialog';
import { ListView } from './ListView';
import { MapView } from './MapView';

// Routes de l'exploration : carte, détail d'une partie, liste et filtres (placés sous /explorer)
// Exploration routes: map, meetup detail, list and filters (mounted under /explorer)
export const exploreRoutes = (
  <Route path="explorer" element={<ExploreLayout />}>
    <Route index element={<MapView />} />
    <Route path="partie/:meetupId" element={<MapView />} />
    <Route path="liste" element={<ListView />} />
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
