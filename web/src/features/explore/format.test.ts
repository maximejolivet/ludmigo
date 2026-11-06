import { describe, expect, it } from 'vitest';
import { formatLongDate, formatSeats, formatShortDate, formatTime } from './format';

describe('format', () => {
  // Les formats français attendus par les maquettes
  // The French formats expected by the mock-ups
  it('formats dates and times in French', () => {
    expect(formatShortDate('2026-12-12T21:00')).toBe('Sam. 12 déc.');
    expect(formatLongDate('2026-12-12T21:00')).toBe('Samedi 12 décembre');
    expect(formatTime('2026-12-12T21:00')).toBe('21 h 00');
    expect(formatTime('2026-12-13T09:05')).toBe('9 h 05');
  });

  it('formats seats', () => {
    expect(formatSeats(6, 10)).toBe('6 / 10 joueurs');
  });
});
