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
  const [error, setError] = useState<string | null>(null);

  const close = () => {
    setError(null);
    onClose();
  };

  const confirm = async () => {
    if (!game) return;
    setBusy(true);
    setError(null);
    try {
      await deleteOne('games', { id: game.id, previousData: game }, { returnPromise: true });
      notify(`« ${game.name} » est supprimé.`, { type: 'success' });
      close();
      refresh();
      onDeleted?.();
    } catch (e) {
      // L'erreur s'affiche dans la boîte : la page derrière est inerte tant qu'elle est ouverte
      // The error shows inside the box: the page behind is inert while it is open
      setError((e as Error).message || 'La suppression a échoué. Réessayez dans un instant.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <ConfirmDialog open={game !== null} title="Supprimer ce jeu ?" confirmLabel="Supprimer" busy={busy} onConfirm={confirm} onCancel={close}>
      <p className="m-0">
        « {game?.name} » sera retiré du catalogue. Cette action est définitive.
      </p>
      {error && (
        <p role="alert" className="mt-3 mb-0 text-danger-text">
          {error}
        </p>
      )}
    </ConfirmDialog>
  );
}
