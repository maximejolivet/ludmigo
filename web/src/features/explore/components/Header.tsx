import { Link } from 'react-router';
import logoUrl from '../../../assets/logos/logo-baseline-ludmigo-couleur-noir.svg';
import { useExplore } from '../context';
import { Icon } from './Icon';

// Barre du haut : logo, notifications, compte, puis recherche et bouton Filtres
// Top bar: logo, notifications, account, then search and the Filters button
export function Header() {
  const { filters, activeFilterCount, notify } = useExplore();
  const summary = [filters.place.trim(), filters.game.trim()].filter(Boolean).join(', ');

  return (
    <div className="bg-white">
      <header className="flex items-center gap-1 px-3 pt-2 pb-1">
        <Link to="/explorer" className="mr-auto flex min-h-12 items-center">
          <img src={logoUrl} alt="Ludmigo, accueil" width={112} height={32} className="h-8 w-auto" />
        </Link>
        <button
          type="button"
          aria-label="Notifications, 2 non lues"
          onClick={() => notify('Les notifications arrivent bientôt.')}
          className="relative flex size-11 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent text-ink"
        >
          <Icon name="bell" size={26} />
          <span className="absolute top-2 right-2 size-[11px] rounded-full border-2 border-white bg-primary" />
        </button>
        <button
          type="button"
          aria-label="Mon compte"
          onClick={() => notify('Le compte arrive bientôt.')}
          className="size-11 cursor-pointer rounded-full border-2 border-ink bg-beige text-[15px] font-bold text-ink"
        >
          LD
        </button>
      </header>

      <div className="flex gap-2 px-3 pb-2.5">
        <Link
          to="/explorer/filtres"
          className="flex min-h-12 min-w-0 flex-1 items-center gap-2.5 rounded-full border-2 border-[#cfcfcf] bg-white px-4 text-ink no-underline"
        >
          <Icon name="search" size={24} className="shrink-0 text-ink-soft" />
          <span className="truncate">{summary || 'Rechercher un jeu ou un lieu'}</span>
        </Link>
        <Link
          to="/explorer/filtres"
          aria-label={
            activeFilterCount > 0
              ? `Filtres, ${activeFilterCount} ${activeFilterCount > 1 ? 'actifs' : 'actif'}`
              : 'Filtres'
          }
          className="relative flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-white text-ink"
        >
          <Icon name="filter" size={24} />
          {activeFilterCount > 0 && (
            <span
              aria-hidden="true"
              className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-petrol text-xs font-bold text-white"
            >
              {activeFilterCount}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
}
