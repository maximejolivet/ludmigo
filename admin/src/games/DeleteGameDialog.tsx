import { useState } from 'react';
import { useDelete, useNotify, useRefresh } from 'react-admin';
import type { Game } from '@ludmigo/shared';
import { ConfirmDialog } from '../ui/ConfirmDialog';

// Confirmation de suppression d'un jeu ; `game` à null = fermée
// Confirmation to delete a game; `game` null = closed
export function DeleteGameDialog({ game, onClose, onDeleted }: { game: Game | null; onClose: () => void; onDeleted?: () => void }) {
  const [deleteOne] = useDelete();
  const notify = useNotify();
  const refresh = useRefresh();
  const [busy, setBusy] = useState(false);

  const confirm = async () => {
    if (!game) return;
    setBusy(true);
    try {
      await deleteOne('games', { id: game.id, previousData: game }, { returnPromise: true });
      notify(`« ${game.name} » est supprimé.`, { type: 'success' });
      onClose();
      refresh();
      onDeleted?.();
    } catch (error) {
      notify((error as Error).message || 'La suppression a échoué. Réessayez dans un instant.', { type: 'error' });
    } finally {
      setBusy(false);
    }
  };

  return (
    <ConfirmDialog open={game !== null} title="Supprimer ce jeu ?" confirmLabel="Supprimer" busy={busy} onConfirm={confirm} onCancel={onClose}>
      <p className="m-0">
        « {game?.name} » sera retiré du catalogue. Cette action est définitive.
      </p>
    </ConfirmDialog>
  );
}
