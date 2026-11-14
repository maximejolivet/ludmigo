import { describe, expect, it } from 'vitest';
import { placeholderImage } from './placeholderImage';

describe('placeholderImage', () => {
  // L'image est demandée en double résolution, avec les couleurs du type de carte
  // The image is requested at double resolution, with the card type colours
  it('builds a placehold.co URL at double resolution', () => {
    const url = new URL(placeholderImage({ kind: 'meetup', label: 'Loup-Garou', width: 96, height: 96 }));
    expect(url.origin).toBe('https://placehold.co');
    expect(url.pathname).toBe('/192x192/d7b695/3e3e3e/png');
    expect(url.searchParams.get('text')).toBe('Loup-Garou');
  });

  // Les accents et les espaces du texte sont encodés
  // Accents and spaces in the text are encoded
  it('encodes the label', () => {
    const url = placeholderImage({ kind: 'event', label: 'Soirée Blind Test !', width: 88, height: 88 });
    expect(url).toContain('/176x176/d9eaee/155767/png?');
    expect(new URL(url).searchParams.get('text')).toBe('Soirée Blind Test !');
  });
});
