import { useMemo, useState } from 'react';
import { hydraSchemaAnalyzer } from '@api-platform/admin';
import { Form, type HttpError, maxLength, minValue, required, useCreate, useNotify, useRedirect, useUpdate } from 'react-admin';
import type { Game } from '@ludmigo/shared';
import { Button, LinkButton } from '../ui/Button';
import { cardClass } from '../ui/classes';
import { NumberInput, SelectInput, TextAreaInput, TextInput } from '../ui/Field';
import { difficultyChoices } from './constants';
import { httpUrl, integer, maxAtLeastMin, toGameInput } from './gameRules';

const validateName = [required(), maxLength(180)];
const validateMin = [required(), minValue(1), integer];
const validateMax = [required(), minValue(1), integer, maxAtLeastMin];
const validateDuration = [minValue(1), integer];
const validateUrl = [httpUrl];

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
    const data = toGameInput(values);
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
      <p className="mt-0 mb-5 text-sm text-fg-soft">Les champs marqués d'une * sont obligatoires.</p>
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
