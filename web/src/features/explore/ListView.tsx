import { CategoryChips } from './components/CategoryChips';
import { EventCard, MeetupListCard } from './components/Cards';
import { NoResults } from './components/NoResults';
import { ViewToggle } from './components/ViewToggle';
import { useExplore } from './context';

// Vue liste : la même information que la carte, accessible sans la carte
// List view: the same information as the map, usable without the map
export function ListView() {
  const { results } = useExplore();
  const total = results.meetups.length + results.events.length;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="bg-white">
        <div className="flex items-center justify-between gap-3 px-3 pb-2.5">
          <ViewToggle current="list" className="bg-canvas" />
          <span className="text-sm text-ink-soft" aria-live="polite">
            {total} {total > 1 ? 'résultats' : 'résultat'}
          </span>
        </div>
        <CategoryChips variant="bar" className="border-b border-line px-3 pb-3" />
      </div>

      <main className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto bg-canvas px-4 pt-4 pb-6">
        {total === 0 && <NoResults />}

        {results.events.length > 0 && (
          <section aria-labelledby="events-title" className="flex flex-col gap-2.5">
            <h2 id="events-title" className="m-0 text-lg leading-snug font-bold">
              Les événements près de chez vous
            </h2>
            {results.events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </section>
        )}

        {results.meetups.length > 0 && (
          <section aria-labelledby="meetups-title" className="flex flex-col gap-2.5">
            <h2 id="meetups-title" className="m-0 text-lg leading-snug font-bold">
              Les parties près de chez vous
            </h2>
            {results.meetups.map((meetup) => (
              <MeetupListCard key={meetup.id} meetup={meetup} />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
