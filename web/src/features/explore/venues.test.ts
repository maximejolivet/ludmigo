import { describe, expect, it } from 'vitest';
import { EXPLORE_DATA, NOW } from './data';
import { isOpenNow, openStatus } from './venues';

const schedule = (id: string) => EXPLORE_DATA.venues.find((venue) => venue.id === id)!.schedule;

describe('venue opening hours', () => {
  // Jeudi 10 décembre, 18 h 30 : le bar est ouvert, la ludothèque fermée depuis 18 h
  // Thursday 10 December, 6:30 pm: the bar is open, the game library closed since 6 pm
  it('tells open from closed at the reference time', () => {
    expect(isOpenNow(schedule('v1'), NOW)).toBe(true);
    expect(isOpenNow(schedule('v7'), NOW)).toBe(false);
  });

  // Fermeture après minuit : encore ouvert à 0 h 30 le lendemain, fermé à 2 h
  // Closing after midnight: still open at 12:30 am the next day, closed at 2 am
  it('handles closing after midnight', () => {
    expect(isOpenNow(schedule('v1'), new Date('2026-12-11T00:30:00'))).toBe(true);
    expect(isOpenNow(schedule('v1'), new Date('2026-12-11T02:00:00'))).toBe(false);
  });

  it('writes a readable status', () => {
    expect(openStatus(schedule('v1'), NOW)).toEqual({ open: true, label: "Ouvert jusqu'à 1 h" });
    expect(openStatus(schedule('v7'), NOW)).toEqual({ open: false, label: 'Ouvre demain à 10 h' });
    expect(openStatus(schedule('v8'), NOW).label).toBe('Ouvre demain à 18 h');
    expect(openStatus(schedule('v3'), NOW).label).toBe('Ouvre samedi à 14 h');
  });
});
