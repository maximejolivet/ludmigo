// Lecture du journal des modifications (CHANGELOG.md, format Keep a Changelog) pour la page « Nouveautés »
// Reading the changelog (CHANGELOG.md, Keep a Changelog format) for the "Nouveautés" page

export interface ChangelogSection {
  title: string;
  items: string[];
}

export interface Release {
  version: string;
  date: string | null;
  sections: ChangelogSection[];
}

// Le fichier contient la partie française, puis le libellé anglais, puis la partie anglaise : on garde la première
// The file holds the French part, then the English label, then the English part: we keep the first
export function frenchPart(markdown: string): string {
  const label = markdown.indexOf('<p align="center">');
  if (label === -1) return markdown;
  const before = markdown.lastIndexOf('<br>', label);
  return markdown.slice(0, before === -1 ? label : before);
}

const RELEASE = /^## \[?([^\]\n]+?)\]?(?: - (\d{4}-\d{2}-\d{2}))?\s*$/;

export function parseChangelog(markdown: string): Release[] {
  const releases: Release[] = [];
  let release: Release | null = null;
  let section: ChangelogSection | null = null;

  for (const line of frenchPart(markdown).split('\n')) {
    const releaseMatch = RELEASE.exec(line);
    if (releaseMatch) {
      release = { version: releaseMatch[1].trim(), date: releaseMatch[2] ?? null, sections: [] };
      releases.push(release);
      section = null;
    } else if (line.startsWith('### ') && release) {
      section = { title: line.slice(4).trim(), items: [] };
      release.sections.push(section);
    } else if (line.startsWith('- ') && section) {
      section.items.push(line.slice(2).trim());
    } else if (/^\s+\S/.test(line) && section && section.items.length > 0) {
      // Ligne de suite d'un point de liste / Continuation line of a list item
      section.items[section.items.length - 1] += ' ' + line.trim();
    }
  }
  return releases.filter((r) => r.sections.some((s) => s.items.length > 0));
}

// Découpe un texte en morceaux de texte brut et de code (`...`)
// Splits a text into plain pieces and code pieces (`...`)
export function splitInlineCode(text: string): { code: boolean; text: string }[] {
  return text
    .split(/(`[^`]+`)/)
    .filter((piece) => piece !== '')
    .map((piece) => (piece.startsWith('`') ? { code: true, text: piece.slice(1, -1) } : { code: false, text: piece }));
}
