import { useMemo, useState } from 'react';
import { hydraSchemaAnalyzer } from '@api-platform/admin';
import { Form, type HttpError, maxLength, minValue, required, useCreate, useNotify, useRedirect, useUpdate } from 'react-admin';
import type { Game, GameInput } from '@ludmigo/shared';
import { Button, LinkButton } from '../ui/Button';
import { cardClass } from '../ui/classes';
import { NumberInput, SelectInput, TextAreaInput, TextInput } from '../ui/Field';
import { difficultyChoices } from './constants';

const validateName = [required(), maxLength(180)];
const validateMin = [required(), minValue(1)];
const validateMax = [
  required(),
  minValue(1),
  // Le maximum ne peut pas être inférieur au minimum (même règle que l'API)
  // The maximum cannot be lower than the minimum (same rule as the API)
  (value: number | null, values: Partial<Game>) =>
    value != null && values.minPlayers != null && value < values.minPlayers ? 'Le maximum doit être supérieur ou égal au minimum.' : undefined,
];
const validateDuration = [minValue(1)];
const validateUrl = [
  (value: string | null) => {
    if (!value) return undefined;
    try {
      new URL(value);
      return undefined;
    } catch {
      return 'Saisissez une adresse complète, par exemple https://exemple.fr/image.jpg.';
    }
  },
];

const empty = (value: string | null | undefined) => (value && value.trim() !== '' ? value.trim() : null);

// Création (sans record) ou modification (avec record) d'un jeu ; les erreurs de l'API s'affichent sous les champs
// Creation (no record) or update (with record) of a game; API errors show under the fields
export function GameForm({ record, onDelete }: { record?: Game; onDelete?: () => void }) {
  const [create] = useCreate();
  const [update] = useUpdate();
  const notify = useNotify();
  const redirect = useRedirect();
  const analyzer = useMemo(() => hydraSchemaAnalyzer(), []);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (values: Partial<Game>) => {
    const data: GameInput = {
      name: (values.name ?? '').trim(),
      description: empty(values.description),
      minPlayers: Number(values.minPlayers),
      maxPlayers: Number(values.maxPlayers),
      durationMinutes: values.durationMinutes ?? null,
      difficulty: values.difficulty ?? 'beginner',
      imageUrl: empty(values.imageUrl),
    };
    setBusy(true);
    try {
      if (record) {
        await update('games', { id: record.id, data, previousData: record }, { returnPromise: true });
      } else {
        await create('games', { data }, { returnPromise: true });
      }
      notify(record ? `« ${data.name} » est enregistré.` : `« ${data.name} » est ajouté au catalogue.`, { type: 'success' });
      redirect('list', 'games');
      return undefined;
    } catch (error) {
      const submissionErrors = analyzer.getSubmissionErrors(error as HttpError);
      if (submissionErrors) return submissionErrors;
      notify((error as Error).message || "L'enregistrement a échoué. Réessayez dans un instant.", { type: 'error' });
      return undefined;
    } finally {
      setBusy(false);
    }
  };

  return (
    <Form
      record={record}
      defaultValues={{ minPlayers: 2, maxPlayers: 4, difficulty: 'beginner' }}
      onSubmit={onSubmit}
      noValidate
      className={`${cardClass} max-w-2xl p-5`}
    >
      <div className="grid gap-5 sm:grid-cols-3">
        <TextInput source="name" label="Nom" validate={validateName} className="sm:col-span-3" />
        <TextAreaInput source="description" label="Description" className="sm:col-span-3" />
        <NumberInput source="minPlayers" label="Joueurs min." validate={validateMin} />
        <NumberInput source="maxPlayers" label="Joueurs max." validate={validateMax} />
        <NumberInput source="durationMinutes" label="Durée (minutes)" validate={validateDuration} />
        <SelectInput source="difficulty" label="Difficulté" choices={difficultyChoices} className="sm:col-span-3" />
        <TextInput
          source="imageUrl"
          label="Image"
          hint="Adresse complète du visuel du jeu."
          type="url"
          validate={validateUrl}
          className="sm:col-span-3"
        />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={busy}>
          {busy ? 'Enregistrement…' : 'Enregistrer'}
        </Button>
        <LinkButton to="/games" variant="secondary">
          Annuler
        </LinkButton>
        {onDelete && (
          <Button variant="danger" onClick={onDelete} className="sm:ml-auto">
            Supprimer
          </Button>
        )}
      </div>
    </Form>
  );
}
