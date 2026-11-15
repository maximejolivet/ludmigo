import type { Game, GameInput } from '@ludmigo/shared';

// Règles de saisie d'un jeu, sans dépendance à React : testées à part
// Game input rules, with no dependency on React: tested on their own

// Un nombre entier, ou rien / A whole number, or nothing
export const integer = (value: number | null | undefined): string | undefined =>
  value != null && !Number.isInteger(value) ? 'Saisissez un nombre entier.' : undefined;

// Le maximum ne peut pas être inférieur au minimum (même règle que l'API)
// The maximum cannot be lower than the minimum (same rule as the API)
export const maxAtLeastMin = (value: number | null | undefined, values: Partial<Game>): string | undefined =>
  value != null && values.minPlayers != null && value < values.minPlayers
    ? 'Le maximum doit être supérieur ou égal au minimum.'
    : undefined;

// Adresse http(s) complète, ou vide / Full http(s) address, or empty
export const httpUrl = (value: string | null | undefined): string | undefined => {
  if (!value) return undefined;
  try {
    return /^https?:$/.test(new URL(value).protocol) ? undefined : URL_MESSAGE;
  } catch {
    return URL_MESSAGE;
  }
};
const URL_MESSAGE = 'Saisissez une adresse complète en http ou https, par exemple https://exemple.fr/image.jpg.';

// Image affichée seulement si l'adresse est en http(s) / Image shown only for an http(s) address
export const safeImageUrl = (value: string | null | undefined): string | null =>
  value && /^https?:\/\//i.test(value) ? value : null;

export const emptyToNull = (value: string | null | undefined): string | null =>
  value && value.trim() !== '' ? value.trim() : null;

// Corps envoyé à l'API à partir des valeurs du formulaire / Body sent to the API from the form values
export const toGameInput = (values: Partial<Game>): GameInput => ({
  name: (values.name ?? '').trim(),
  description: emptyToNull(values.description),
  minPlayers: Number(values.minPlayers),
  maxPlayers: Number(values.maxPlayers),
  durationMinutes: values.durationMinutes ?? null,
  difficulty: values.difficulty ?? 'beginner',
  imageUrl: emptyToNull(values.imageUrl),
});
