import { useExplore } from '../context';
import { BUTTON_PRIMARY } from './styles';

// Aucun résultat : on explique pourquoi et on propose d'agir
// No results: explain why and offer a way forward
export function NoResults({ subject = 'résultat' }: { subject?: string }) {
  const { resetFilters } = useExplore();
  return (
    <div className="flex flex-col items-start gap-3 rounded-2xl border border-line bg-white p-4">
      <p className="m-0 text-base">
        Aucun {subject} ne correspond à vos filtres. Élargissez la distance ou changez de période.
      </p>
      <button type="button" onClick={resetFilters} className={BUTTON_PRIMARY}>
        Réinitialiser les filtres
      </button>
    </div>
  );
}
