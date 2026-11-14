import { describe, expect, it } from 'vitest';
import { dateParts, formatLongDate, formatSeats, formatShortDate, formatTime, formatTravel } from './format';

describe('format', () => {
  // Les formats français attendus par les maquettes
  // The French formats expected by the mock-ups
  it('formats dates and times in French', () => {
    expect(formatShortDate('2026-12-12T21:00')).toBe('Sam. 12 déc.');
    expect(formatLongDate('2026-12-12T21:00')).toBe('Samedi 12 décembre');
    expect(formatTime('2026-12-12T21:00')).toBe('21 h 00');
    expect(formatTime('2026-12-13T09:05')).toBe('9 h 05');
  });

  // Les morceaux de date affichés sur la pastille des cartes
  // The date pieces shown on the card badge
  it('splits a date for the badge', () => {
    expect(dateParts('2026-12-12T21:00')).toEqual({ weekday: 'Sam.', day: 12, month: 'déc.' });
  });

  // À pied, à vélo ou en voiture selon la distance
  // On foot, by bike or by car depending on the distance
  it('estimates the travel time', () => {
    expect(formatTravel(1)).toBe('12 min à pied');
    expect(formatTravel(5)).toBe('20 min à vélo');
    expect(formatTravel(9)).toBe('23 min en voiture');
  });

  it('formats seats', () => {
    expect(formatSeats(6, 10)).toBe('6 / 10 joueurs');
  });
});
