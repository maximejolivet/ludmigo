import type { Meetup, VenueEvent } from './types';

// Durée par défaut d'un rendez-vous, en heures, pour l'heure de fin de l'agenda
// Default length of an appointment, in hours, for the calendar end time
const DEFAULT_DURATION_H = 2;

// Ce dont un fichier d'agenda a besoin, que ce soit une partie ou un événement
// What a calendar file needs, whether it is a meetup or an event
export interface IcsSource {
  id: string;
  title: string;
  startsAt: string;
  location: string;
  description: string;
}

// Une partie vue comme un rendez-vous d'agenda
// A meetup seen as a calendar appointment
export function meetupToIcs(meetup: Meetup): IcsSource {
  return {
    id: meetup.id,
    title: meetup.title,
    startsAt: meetup.startsAt,
    location: `${meetup.venueName}, ${meetup.district ?? meetup.city}`,
    description: `${meetup.game}, organisé par ${meetup.organizer.name}`,
  };
}

// Un événement vu comme un rendez-vous d'agenda
// An event seen as a calendar appointment
export function eventToIcs(event: VenueEvent): IcsSource {
  return {
    id: event.id,
    title: event.title,
    startsAt: event.startsAt,
    location: `${event.organizerName}, ${event.district ?? event.city}`,
    description: event.description,
  };
}

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

// Date locale au format iCalendar : 20261212T210000 (sans fuseau, l'heure reste celle du lieu)
// Local date in iCalendar format: 20261212T210000 (no time zone, the time stays the venue's)
function icsDate(date: Date): string {
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}00`;
}

// Échappe les caractères spéciaux d'un texte iCalendar
// Escapes special characters of an iCalendar text
function icsText(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

// Contenu d'un fichier .ics pour ajouter un rendez-vous à son agenda
// Content of an .ics file to add an appointment to a calendar
export function buildIcs(source: IcsSource): string {
  const start = new Date(source.startsAt);
  const end = new Date(start.getTime() + DEFAULT_DURATION_H * 3_600_000);
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Ludmigo//Explore//FR',
    'BEGIN:VEVENT',
    `UID:${source.id}@ludmigo`,
    `DTSTAMP:${icsDate(new Date())}`,
    `DTSTART:${icsDate(start)}`,
    `DTEND:${icsDate(end)}`,
    `SUMMARY:${icsText(source.title)}`,
    `LOCATION:${icsText(source.location)}`,
    `DESCRIPTION:${icsText(source.description)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

// Télécharge le fichier .ics dans le navigateur
// Downloads the .ics file in the browser
export function downloadIcs(source: IcsSource): void {
  const blob = new Blob([buildIcs(source)], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `ludmigo-${source.id}.ics`;
  link.click();
  URL.revokeObjectURL(url);
}
