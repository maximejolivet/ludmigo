import { describe, expect, it } from 'vitest';
import { buildIcs, eventToIcs, meetupToIcs } from './calendar';
import { EXPLORE_DATA } from './data';

describe('buildIcs', () => {
  // Fichier d'agenda : heure de début et de fin (2 h), titre et lieu échappés
  // Calendar file: start and end time (2 h), escaped title and place
  it('builds a calendar event for a meetup', () => {
    const ics = buildIcs(meetupToIcs(EXPLORE_DATA.meetups[0]));
    expect(ics.startsWith('BEGIN:VCALENDAR\r\n')).toBe(true);
    expect(ics).toContain('DTSTART:20261212T210000');
    expect(ics).toContain('DTEND:20261212T230000');
    expect(ics).toContain('SUMMARY:Soirée Loup-Garou !');
    expect(ics).toContain('LOCATION:Chez ta mère\\, Chantenay');
    expect(ics.endsWith('END:VCALENDAR')).toBe(true);
  });

  // Un événement se met aussi à l'agenda, avec sa description
  // An event can also be added to the calendar, with its description
  it('builds a calendar event for an event', () => {
    const ics = buildIcs(eventToIcs(EXPLORE_DATA.events[0]));
    expect(ics).toContain('SUMMARY:Soirée Blind Test !');
    expect(ics).toContain('DTSTART:20261216T203000');
    expect(ics).toContain('LOCATION:Le Bistro Le Parisien\\, Hauts-Pavés');
  });
});
