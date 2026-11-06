import { useCallback, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Icon, PinIcon } from './components/Icon';
import { BUTTON_PRIMARY, PIN_COLOR } from './components/styles';
import { useExplore } from './context';
import { CATEGORIES, CATEGORY_LABELS } from './types';
import type { PeriodFilter } from './types';

const PERIODS: ReadonlyArray<{ value: PeriodFilter; label: string }> = [
  { value: 'any', label: 'Toutes les dates' },
  { value: 'today', label: "Aujourd'hui" },
  { value: 'weekend', label: 'Ce week-end' },
  { value: 'week', label: 'Cette semaine' },
];

const FIELD =
  'box-border min-h-12 w-full rounded-full border-2 border-[#8a8a8a] bg-white pr-3.5 pl-11 text-base text-ink';

const CHOICE =
  'inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border-2 px-3.5 text-sm font-bold';

// Panneau de filtres : se superpose à la carte, les réglages s'appliquent en direct
// Filters panel: overlays the map, settings apply live
export function FiltersDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { filters, setFilters, resetFilters, results } = useExplore();
  const total = results.meetups.length + results.events.length;

  // Revient à l'écran précédent, ou à la carte si le panneau a été ouvert directement
  // Goes back to the previous screen, or to the map if the panel was opened directly
  const close = useCallback(() => {
    if (location.key !== 'default') navigate(-1);
    else navigate('/explorer', { replace: true });
  }, [location.key, navigate]);

  // Ouvre la boîte de dialogue native : elle gère le focus et la touche Échap
  // Opens the native dialog: it handles focus and the Escape key
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="filters-title"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
      className="m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-transparent p-0 text-ink backdrop:bg-ink/55"
    >
      <div className="absolute inset-x-0 top-16 bottom-0 mx-auto flex max-w-[480px] flex-col rounded-t-3xl bg-white font-ui shadow-[0_-6px_24px_rgba(0,0,0,.25)]">
        <div aria-hidden="true" className="mx-auto mt-2 h-[5px] w-10 rounded-full bg-[#cfcfcf]" />
        <header className="flex items-center justify-between py-1 pr-2 pl-5">
          <h2 id="filters-title" className="m-0 text-[22px] leading-tight font-bold">
            Filtres
          </h2>
          <div className="flex items-center">
            <button
              type="button"
              onClick={resetFilters}
              className="min-h-11 cursor-pointer border-0 bg-transparent px-3 text-[15px] font-medium text-link"
            >
              Réinitialiser
            </button>
            <button
              type="button"
              aria-label="Fermer les filtres"
              onClick={close}
              className="flex size-11 cursor-pointer items-center justify-center border-0 bg-transparent text-ink"
            >
              <Icon name="close" />
            </button>
          </div>
        </header>

        <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-5 pt-2 pb-4">
          <div role="group" aria-labelledby="filters-categories" className="flex flex-col gap-2.5">
            <span id="filters-categories" className="text-[15px] font-bold">
              Afficher sur la carte
            </span>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => {
                const pressed = filters.categories[category];
                return (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={pressed}
                    onClick={() =>
                      setFilters((current) => ({
                        ...current,
                        categories: { ...current.categories, [category]: !pressed },
                      }))
                    }
                    className={`${CHOICE} ${pressed ? 'border-petrol bg-petrol text-white' : 'border-[#cfcfcf] bg-white text-ink'}`}
                  >
                    <PinIcon className={`h-[19px] w-3.5 ${pressed ? 'text-white' : PIN_COLOR[category]}`} />
                    {CATEGORY_LABELS[category]}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="filter-game" className="text-[15px] font-bold">
              Jeu
            </label>
            <div className="relative">
              <Icon name="search" size={22} className="absolute top-3 left-3.5 text-ink-soft" />
              <input
                id="filter-game"
                type="search"
                value={filters.game}
                onChange={(event) => setFilters((current) => ({ ...current, game: event.target.value }))}
                className={FIELD}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="filter-place" className="text-[15px] font-bold">
              Lieu
            </label>
            <div className="relative">
              <Icon name="pin" size={22} className="absolute top-3 left-3.5 text-ink-soft" />
              <input
                id="filter-place"
                type="search"
                value={filters.place}
                onChange={(event) => setFilters((current) => ({ ...current, place: event.target.value }))}
                className={FIELD}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="filter-distance" className="flex justify-between text-[15px] font-bold">
              <span>Distance</span>
              <output htmlFor="filter-distance" className="font-medium text-ink-soft">
                {filters.maxDistanceKm} km
              </output>
            </label>
            <input
              id="filter-distance"
              type="range"
              min={1}
              max={50}
              value={filters.maxDistanceKm}
              onChange={(event) =>
                setFilters((current) => ({ ...current, maxDistanceKm: Number(event.target.value) }))
              }
              className="m-0 h-11 w-full accent-petrol"
            />
          </div>

          <div role="group" aria-labelledby="filters-period" className="flex flex-col gap-2.5">
            <span id="filters-period" className="text-[15px] font-bold">
              Date
            </span>
            <div className="flex flex-wrap gap-2">
              {PERIODS.map((period) => {
                const pressed = filters.period === period.value;
                return (
                  <button
                    key={period.value}
                    type="button"
                    aria-pressed={pressed}
                    onClick={() => setFilters((current) => ({ ...current, period: period.value }))}
                    className={`${CHOICE} px-4 ${pressed ? 'border-petrol bg-petrol text-white' : 'border-[#cfcfcf] bg-white text-ink'}`}
                  >
                    {period.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-line px-5 pt-3 pb-[max(1.875rem,env(safe-area-inset-bottom))]">
          <button type="button" onClick={close} className={`${BUTTON_PRIMARY} min-h-[52px] w-full text-[17px]`}>
            Voir {total} {total > 1 ? 'résultats' : 'résultat'}
          </button>
        </div>
      </div>
    </dialog>
  );
}
