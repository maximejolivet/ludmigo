import { Navigate } from 'react-router';
import { FilterChips } from './components/FilterChips';
import { ResultsSections } from './components/ResultsSections';
import { ViewToggle } from './components/ViewToggle';
import { useExplore } from './context';
import { useIsDesktop } from './useIsDesktop';

// Vue liste (mobile) : la même information que la carte, accessible sans la carte
// List view (mobile): the same information as the map, usable without the map
export function ListView() {
  const { results } = useExplore();
  const isDesktop = useIsDesktop();
  const total = results.meetups.length + results.events.length;

  // Sur ordinateur, la liste est déjà affichée à côté de la carte
  // On desktop, the list is already shown next to the map
  if (isDesktop) return <Navigate to="/explorer" replace />;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="bg-surface">
        <div className="flex items-center justify-between gap-3 px-3 pb-2.5">
          <ViewToggle current="list" className="bg-canvas" />
          <span className="text-sm text-fg-soft" aria-live="polite">
            {total} {total > 1 ? 'résultats' : 'résultat'}
          </span>
        </div>
        <FilterChips className="border-b border-line px-3 pb-3" />
      </div>

      <main className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto bg-canvas px-4 pt-4 pb-6">
        <ResultsSections />
      </main>
    </div>
  );
}
