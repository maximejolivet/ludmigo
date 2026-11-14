import { Link } from 'react-router';
import logoDark from '../../../assets/logos/logo-baseline-ludmigo-couleur-noir.svg';
import logoLight from '../../../assets/logos/logo-baseline-ludmigo-couleur-blanc.svg';
import { useExplore } from '../context';
import { useIsDesktop } from '../useIsDesktop';
import { Icon } from './Icon';
import { NightToggle } from './NightToggle';
import { BUTTON_PRIMARY } from './styles';

function Logo() {
  // Le logo blanc sur fond sombre (mode soirée), le logo noir sinon
  // The white logo on a dark background (evening mode), the black logo otherwise
  const { night } = useExplore();
  return (
    <Link to="/explorer" className="flex min-h-12 items-center">
      {/* Les lettres occupent le haut du SVG (le « g » et le plateau dépassent en bas) : */}
      {/* on décale de 2 px pour centrer visuellement le mot sur l'axe des boutons voisins. */}
      {/* The letters sit in the upper part of the SVG (the "g" and the board hang below): */}
      {/* shift by 2 px to visually centre the word on the axis of the neighbouring buttons. */}
      <img
        src={night ? logoLight : logoDark}
        alt="Ludmigo, accueil"
        width={112}
        height={32}
        className="h-8 w-auto translate-y-0.5"
      />
    </Link>
  );
}

function NotificationsButton() {
  const { notify } = useExplore();
  return (
    <button
      type="button"
      aria-label="Notifications, 2 non lues"
      onClick={() => notify('Les notifications arrivent bientôt.')}
      className="relative flex size-11 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent text-fg"
    >
      <Icon name="bell" size={26} />
      <span className="absolute top-2 right-2 size-[11px] rounded-full border-2 border-white bg-primary" />
    </button>
  );
}

function AccountButton() {
  const { notify } = useExplore();
  return (
    <button
      type="button"
      aria-label="Mon compte"
      onClick={() => notify('Le compte arrive bientôt.')}
      className="size-11 cursor-pointer rounded-full border-2 border-edge bg-beige text-[15px] font-bold text-ink"
    >
      LD
    </button>
  );
}

// Champ de recherche et bouton Filtres : ils ouvrent tous deux le panneau de filtres
// Search field and Filters button: both open the filters panel
function SearchBar({ className = '' }: { className?: string }) {
  const { filters, activeFilterCount } = useExplore();
  const summary = [filters.place.trim(), filters.game.trim()].filter(Boolean).join(', ');

  return (
    <div className={`flex gap-2 ${className}`}>
      <Link
        to="/explorer/filtres"
        className="flex min-h-12 min-w-0 flex-1 items-center gap-2.5 rounded-full border-2 border-line bg-surface px-4 text-fg no-underline"
      >
        <Icon name="search" size={24} className="shrink-0 text-fg-soft" />
        <span className="truncate">{summary || 'Rechercher un jeu ou un lieu'}</span>
      </Link>
      <Link
        to="/explorer/filtres"
        aria-label={
          activeFilterCount > 0
            ? `Filtres, ${activeFilterCount} ${activeFilterCount > 1 ? 'actifs' : 'actif'}`
            : 'Filtres'
        }
        className="relative flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-edge bg-surface text-fg"
      >
        <Icon name="filter" size={24} />
        {activeFilterCount > 0 && (
          <span
            aria-hidden="true"
            className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-md border-2 border-edge bg-primary text-[11px] leading-none font-bold text-ink"
          >
            {activeFilterCount}
          </span>
        )}
      </Link>
    </div>
  );
}

// En-tête : sur mobile en deux lignes, sur ordinateur en une seule avec l'action principale
// Header: two rows on mobile, a single row with the main action on desktop
export function Header() {
  const { notify } = useExplore();
  const isDesktop = useIsDesktop();

  if (isDesktop) {
    return (
      <header className="flex items-center gap-4 border-b border-line bg-surface px-6 py-2.5">
        <Logo />
        <SearchBar className="mx-4 max-w-xl flex-1" />
        <button
          type="button"
          onClick={() => notify("L'organisation d'une partie arrive bientôt.")}
          className={`${BUTTON_PRIMARY} ml-auto min-h-12 px-5 text-base`}
        >
          <Icon name="plus" size={22} />
          Organiser une partie
        </button>
        <NightToggle />
        <NotificationsButton />
        <AccountButton />
      </header>
    );
  }

  return (
    <div className="bg-surface">
      <header className="flex items-center gap-1 px-3 pt-2 pb-1">
        <div className="mr-auto">
          <Logo />
        </div>
        <NightToggle />
        <NotificationsButton />
        <AccountButton />
      </header>
      <SearchBar className="px-3 pb-2.5" />
    </div>
  );
}
