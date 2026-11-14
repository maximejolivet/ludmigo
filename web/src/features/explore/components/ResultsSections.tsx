import { useExplore } from '../context';
import { EventCard, MeetupListCard } from './Cards';
import { NoResults } from './NoResults';
import { ProfilePrompt } from './ProfilePrompt';

// Événements puis parties qui correspondent aux filtres, partagés par la vue liste et le panneau ordinateur
// Events then meetups matching the filters, shared by the list view and the desktop panel
export function ResultsSections() {
  const { results } = useExplore();
  const total = results.meetups.length + results.events.length;

  return (
    <>
      <ProfilePrompt />
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
    </>
  );
}
