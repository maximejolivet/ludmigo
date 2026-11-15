import { useState } from 'react';
import { CreateBase, EditBase, Title, useEditContext, useRedirect } from 'react-admin';
import type { Game } from '@ludmigo/shared';
import { DeleteGameDialog } from './DeleteGameDialog';
import { GameForm } from './GameForm';

export function GameCreate() {
  return (
    <CreateBase resource="games">
      <Title title="Ajouter un jeu" />
      <GameForm />
    </CreateBase>
  );
}

function EditContent() {
  const { record, isPending } = useEditContext<Game>();
  const [deleting, setDeleting] = useState<Game | null>(null);
  const redirect = useRedirect();

  if (isPending || !record) return <p className="text-fg-soft">Chargement du jeu…</p>;

  return (
    <>
      <Title title={`Modifier ${record.name}`} />
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
