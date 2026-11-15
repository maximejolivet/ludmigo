import { describe, expect, it } from 'vitest';
import { decodeError } from './decodeError';

// Traduction factice : renvoie la valeur par défaut `_` / Fake translation: returns the default value `_`
const t = (key: string, options?: object) => (options as { _?: string })?._ ?? key;

describe('decodeError', () => {
  it('décode un message de validation de react-admin / decodes a react-admin validation message', () => {
    expect(decodeError('@@react-admin@@{"message":"ra.validation.required"}', t)).toBe('ra.validation.required');
  });
  it('décode un texte entre guillemets / decodes a quoted text', () => {
    expect(decodeError('@@react-admin@@"Le maximum doit être supérieur."', t)).toBe('Le maximum doit être supérieur.');
  });
  it('garde un JSON invalide tel quel après le préfixe / keeps invalid JSON as is after the prefix', () => {
    expect(decodeError('@@react-admin@@pas du json', t)).toBe('pas du json');
  });
  it('renvoie un texte brut sans préfixe / returns plain text without prefix', () => {
    expect(decodeError('Texte simple', t)).toBe('Texte simple');
  });
  it('transmet les arguments à la traduction / passes the arguments to the translation', () => {
    const seen: object[] = [];
    decodeError('@@react-admin@@{"message":"ra.validation.minValue","args":{"min":1}}', (key, options) => {
      seen.push(options ?? {});
      return key;
    });
    expect(seen[0]).toMatchObject({ min: 1 });
  });
});
