import { describe, expect, it } from 'vitest';
import { emptyToNull, httpUrl, integer, maxAtLeastMin, safeImageUrl, toGameInput } from './gameRules';

describe('maxAtLeastMin', () => {
  it('refuse un maximum inférieur au minimum / rejects a maximum below the minimum', () => {
    expect(maxAtLeastMin(3, { minPlayers: 4 })).toMatch(/supérieur ou égal/);
  });
  it('accepte un maximum égal ou supérieur, ou une valeur vide / accepts an equal or higher maximum, or an empty value', () => {
    expect(maxAtLeastMin(4, { minPlayers: 4 })).toBeUndefined();
    expect(maxAtLeastMin(6, { minPlayers: 4 })).toBeUndefined();
    expect(maxAtLeastMin(null, { minPlayers: 4 })).toBeUndefined();
    expect(maxAtLeastMin(2, {})).toBeUndefined();
  });
});

describe('integer', () => {
  it('refuse un nombre décimal / rejects a decimal number', () => {
    expect(integer(2.5)).toMatch(/entier/);
  });
  it('accepte un entier, ou rien / accepts a whole number, or nothing', () => {
    expect(integer(2)).toBeUndefined();
    expect(integer(null)).toBeUndefined();
    expect(integer(undefined)).toBeUndefined();
  });
});

describe('httpUrl', () => {
  it('refuse une adresse incomplète ou d\'un autre protocole / rejects an incomplete address or another protocol', () => {
    expect(httpUrl('exemple')).toBeDefined();
    expect(httpUrl('javascript:alert(1)')).toBeDefined();
    expect(httpUrl('ftp://exemple.fr/i.jpg')).toBeDefined();
  });
  it('accepte http, https ou vide / accepts http, https or empty', () => {
    expect(httpUrl('https://exemple.fr/i.jpg')).toBeUndefined();
    expect(httpUrl('http://localhost/i.jpg')).toBeUndefined();
    expect(httpUrl('')).toBeUndefined();
    expect(httpUrl(null)).toBeUndefined();
  });
});

describe('safeImageUrl', () => {
  it('ne garde que http et https / keeps only http and https', () => {
    expect(safeImageUrl('https://exemple.fr/i.jpg')).toBe('https://exemple.fr/i.jpg');
    expect(safeImageUrl('javascript:alert(1)')).toBeNull();
    expect(safeImageUrl('data:image/png;base64,AAAA')).toBeNull();
    expect(safeImageUrl(null)).toBeNull();
  });
});

describe('emptyToNull', () => {
  it('transforme le vide en null et rogne le reste / turns empty into null and trims the rest', () => {
    expect(emptyToNull('')).toBeNull();
    expect(emptyToNull('   ')).toBeNull();
    expect(emptyToNull(undefined)).toBeNull();
    expect(emptyToNull('  texte ')).toBe('texte');
  });
});

describe('toGameInput', () => {
  it('construit le corps envoyé à l\'API / builds the body sent to the API', () => {
    expect(
      toGameInput({ name: '  Catan ', description: '', minPlayers: 3, maxPlayers: 4, durationMinutes: undefined, imageUrl: ' ' }),
    ).toEqual({
      name: 'Catan',
      description: null,
      minPlayers: 3,
      maxPlayers: 4,
      durationMinutes: null,
      difficulty: 'beginner',
      imageUrl: null,
    });
  });
  it('garde la difficulté et la durée saisies / keeps the chosen difficulty and duration', () => {
    const input = toGameInput({ name: 'Azul', minPlayers: 2, maxPlayers: 4, durationMinutes: 45, difficulty: 'expert' });
    expect(input.difficulty).toBe('expert');
    expect(input.durationMinutes).toBe(45);
  });
});
