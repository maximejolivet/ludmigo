// Remplace `query-string`, importé sans être déclaré par @api-platform/admin (fournisseur OpenAPI, non utilisé ici).
// Évite une dépendance supplémentaire (la v7 a une faille connue, la v10 n'exporte plus `stringify`).
// Replaces `query-string`, imported without being declared by @api-platform/admin (OpenAPI provider, unused here).
// Avoids an extra dependency (v7 has a known vulnerability, v10 no longer exports `stringify`).
export function stringify(params: Record<string, unknown>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    for (const item of Array.isArray(value) ? value : [value]) {
      if (item !== undefined && item !== null) {
        search.append(key, String(item));
      }
    }
  }
  return search.toString();
}
