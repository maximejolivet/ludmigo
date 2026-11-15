import { useEffect, useId, useRef, type ReactNode } from 'react';
import { Button } from './Button';

// Boîte de confirmation : élément <dialog> natif (focus piégé, Échap pour annuler)
// Confirmation box: native <dialog> element (focus trapped, Escape to cancel)
export function ConfirmDialog({
  open,
  title,
  children,
  confirmLabel,
  busy = false,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  children: ReactNode;
  confirmLabel: string;
  busy?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onCancel}
      aria-labelledby={titleId}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border-2 border-edge bg-surface p-5 font-ui text-fg backdrop:bg-black/60"
    >
      <h2 id={titleId} className="m-0 text-xl font-bold">
        {title}
      </h2>
      <div className="mt-3 text-base">{children}</div>
      <div className="mt-6 flex flex-wrap justify-end gap-3">
        <Button variant="secondary" onClick={onCancel} disabled={busy}>
          Annuler
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={busy}>
          {confirmLabel}
        </Button>
      </div>
    </dialog>
  );
}
