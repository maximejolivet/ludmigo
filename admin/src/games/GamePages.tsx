import { useState } from 'react';
import { CreateBase, EditBase, useEditContext, useRedirect } from 'react-admin';
import type { Game } from '@ludmigo/shared';
import { PageTitle } from '../ui/PageTitle';
import { DeleteGameDialog } from './DeleteGameDialog';
import { GameForm } from './GameForm';

export function GameCreate() {
  return (
    <CreateBase resource="games">
      <PageTitle title="Ajouter un jeu" />
      <GameForm />
    </CreateBase>
  );
}

function EditContent() {
  const { record, isPending } = useEditContext<Game>();
  const [deleting, setDeleting] = useState<Game | null>(null);
  const redirect = useRedirect();

  // Le titre est posé avant l'état de chargement : le h1 n'est jamais vide
  // The title is set before the loading state: the h1 is never empty
  if (isPending || !record) {
    return (
      <>
        <PageTitle title="Chargement…" />
        <p role="status" className="text-fg-soft">
          Chargement du jeu…
        </p>
      </>
    );
  }

  return (
    <>
      <PageTitle title={`Modifier ${record.name}`} />
      <GameForm record={record} onDelete={() => setDeleting(record)} />
      <DeleteGameDialog game={deleting} onClose={() => setDeleting(null)} onDeleted={() => redirect('list', 'games')} />
    </>
  );
}

export function GameEdit() {
  return (
    <EditBase resource="games" mutationMode="pessimistic">
      <EditContent />
    </EditBase>
  );
}
