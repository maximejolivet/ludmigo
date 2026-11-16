import { describe, expect, it } from 'vitest';
import changelog from '../../../CHANGELOG.md?raw';
import { frenchPart, parseChangelog, splitInlineCode } from './parseChangelog';

const SAMPLE = `# Journal

Texte d'introduction.

## [Non publié]

### Ajouté

- Une chose avec \`du code\`.
- Une autre chose
  sur deux lignes.

### Corrigé

- Un bug.

## [1.0.0] - 2026-11-20

### Sécurité

- Un correctif.

### Modifié

## [0.0.1] - 2026-01-01

<br>

<p align="center">
  <img height="32" alt="🇬🇧 English">
</p>

<br>

# Changelog

## [Unreleased]

### Added

- English item.
`;

describe('frenchPart', () => {
  it('garde la partie française, avant le libellé anglais / keeps the French part, before the English label', () => {
    const part = frenchPart(SAMPLE);
    expect(part).toContain('Une chose');
    expect(part).not.toContain('English item');
    expect(part).not.toContain('<p align="center">');
  });
  it('renvoie le texte entier sans libellé / returns the whole text without a label', () => {
    expect(frenchPart('# Titre\n\n- a')).toBe('# Titre\n\n- a');
  });
});

describe('parseChangelog', () => {
  const releases = parseChangelog(SAMPLE);

  it('lit les versions, avec ou sans date / reads releases, with or without a date', () => {
    expect(releases.map((r) => r.version)).toEqual(['Non publié', '1.0.0']);
    expect(releases[0].date).toBeNull();
    expect(releases[1].date).toBe('2026-11-20');
  });
  it('lit les sections et leurs points / reads sections and their items', () => {
    expect(releases[0].sections.map((s) => s.title)).toEqual(['Ajouté', 'Corrigé']);
    expect(releases[0].sections[0].items).toHaveLength(2);
  });
  it('joint les lignes de suite d\'un point / joins the continuation lines of an item', () => {
    expect(releases[0].sections[0].items[1]).toBe('Une autre chose sur deux lignes.');
  });
  it('ignore les versions et sections vides, et la partie anglaise / ignores empty releases and sections, and the English part', () => {
    expect(releases.some((r) => r.version === '0.0.1')).toBe(false);
    expect(releases.some((r) => r.version === 'Unreleased')).toBe(false);
    expect(releases[1].sections.map((s) => s.title)).toContain('Sécurité');
  });
});

describe('splitInlineCode', () => {
  it('sépare le texte et le code / splits text and code', () => {
    expect(splitInlineCode('Voir `npm run lint` ici')).toEqual([
      { code: false, text: 'Voir ' },
      { code: true, text: 'npm run lint' },
      { code: false, text: ' ici' },
    ]);
  });
});

describe('CHANGELOG.md du dépôt / the repository CHANGELOG.md', () => {
  const real = parseChangelog(changelog);
  it('contient au moins une version avec des changements / has at least one release with changes', () => {
    expect(real.length).toBeGreaterThan(0);
    expect(real[0].sections.every((s) => s.items.length > 0)).toBe(true);
  });
  it('utilise les types de changement connus / uses the known change types', () => {
    const known = ['Ajouté', 'Modifié', 'Corrigé', 'Sécurité'];
    for (const release of real) for (const section of release.sections) expect(known).toContain(section.title);
  });
});
