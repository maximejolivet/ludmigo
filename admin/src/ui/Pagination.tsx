import { Button } from './Button';

// Pagination : position puis boutons Précédent / Suivant
// Pagination: position, then Previous / Next buttons
export function Pagination({
  page,
  perPage,
  total,
  onPage,
}: {
  page: number;
  perPage: number;
  total: number;
  onPage: (page: number) => void;
}) {
  if (total === 0) return null;
  const from = (page - 1) * perPage + 1;
  const to = Math.min(page * perPage, total);

  return (
    <nav aria-label="Pagination" className="mt-4 flex flex-wrap items-center justify-between gap-3">
      <p className="m-0 text-sm text-fg-soft">
        {from} à {to} sur {total}
      </p>
      <div className="flex gap-3">
        <Button variant="secondary" disabled={page <= 1} onClick={() => onPage(page - 1)}>
          Précédent
        </Button>
        <Button variant="secondary" disabled={to >= total} onClick={() => onPage(page + 1)}>
          Suivant
        </Button>
      </div>
    </nav>
  );
}
