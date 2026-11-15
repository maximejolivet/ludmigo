import { useEffect, useState } from 'react';
import { LinkBase, ListBase, Title, useCreatePath, useListContext } from 'react-admin';
import type { Game, GameDifficulty } from '@ludmigo/shared';
import { Complexity } from '../layout/Complexity';
import { Icon } from '../layout/Icon';
import { Pawn } from '../layout/Pawn';
import { Button, LinkButton } from '../ui/Button';
import { CHOICE_OFF, CHOICE_ON, TAG, TAG_INFO, TAG_SUCCESS, TAG_WARNING, cardClass } from '../ui/classes';
import { Pagination } from '../ui/Pagination';
import { DeleteGameDialog } from './DeleteGameDialog';
import { difficultyChoices, difficultyLabels, playersLabel } from './constants';

const DIFFICULTY_LEVEL: Record<GameDifficulty, number> = { beginner: 1, intermediate: 2, expert: 3 };
const DIFFICULTY_TAG: Record<GameDifficulty, string> = { beginner: TAG_SUCCESS, intermediate: TAG_WARNING, expert: TAG_INFO };

// Recherche par nom (avec délai), comme le champ de recherche de l'application web
// Search by name (debounced), like the search field of the web app
function SearchField() {
  const { filterValues, setFilters } = useListContext();
  const [name, setName] = useState<string>(filterValues.name ?? '');

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if ((filterValues.name ?? '') !== name.trim()) {
        setFilters({ ...filterValues, name: name.trim() || undefined }, {});
      }
    }, 300);
    return () => window.clearTimeout(timer);
  }, [name, filterValues, setFilters]);

  return (
    <div role="search" className="relative min-w-0 flex-1">
      <label htmlFor="filter-name" className="sr-only">
        Rechercher un jeu par son nom
      </label>
      <Icon name="search" size={22} className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-fg-soft" />
      <input
        id="filter-name"
        type="search"
        value={name}
        placeholder="Rechercher un jeu"
        onChange={(e) => setName(e.target.value)}
        className="block min-h-12 w-full rounded-full border-2 border-line bg-surface pr-4 pl-12 font-ui text-base text-fg"
      />
    </div>
  );
}

// Puces de difficulté et de tri : enfoncées et pétrole quand elles sont retenues
// Difficulty and sort chips: pressed in and petrol when selected
function Chips() {
  const { filterValues, setFilters, sort, setSort } = useListContext();
  const difficulty = (filterValues.difficulty as string | undefined) ?? '';
  const sortKey = sort.field === 'name' ? 'name' : 'createdAt';

  return (
    <div className="mt-4 mb-5 flex flex-col gap-3">
      <div role="group" aria-label="Difficulté" className="flex flex-wrap gap-2">
        {[{ id: '', name: 'Toutes' }, ...difficultyChoices].map((choice) => (
          <button key={choice.id} type="button" aria-pressed={difficulty === choice.id} onClick={() => setFilters({ ...filterValues, difficulty: choice.id || undefined }, {})} className={difficulty === choice.id ? CHOICE_ON : CHOICE_OFF}>
            {choice.name}
          </button>
        ))}
      </div>
      <div role="group" aria-label="Tri" className="flex flex-wrap gap-2">
        <button type="button" aria-pressed={sortKey === 'createdAt'} onClick={() => setSort({ field: 'createdAt', order: 'DESC' })} className={sortKey === 'createdAt' ? CHOICE_ON : CHOICE_OFF}>
          Plus récents
        </button>
        <button type="button" aria-pressed={sortKey === 'name'} onClick={() => setSort({ field: 'name', order: 'ASC' })} className={sortKey === 'name' ? CHOICE_ON : CHOICE_OFF}>
          Nom (A à Z)
        </button>
      </div>
    </div>
  );
}

function GameCard({ game, onDelete }: { game: Game; onDelete: (game: Game) => void }) {
  const createPath = useCreatePath();
  const edit = createPath({ resource: 'games', type: 'edit', id: game.id });
  const label = difficultyLabels[game.difficulty as GameDifficulty] ?? game.difficulty;

  return (
    <article className={`${cardClass} flex flex-col gap-2.5 p-2.5`}>
      <div className="flex gap-3">
        <div className="flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-beige">
          {game.imageUrl ? <img src={game.imageUrl} alt="" width={96} height={96} loading="lazy" referrerPolicy="no-referrer" className="size-24 object-cover" /> : <Pawn height={52} className="text-beige-tint" />}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <h3 className="m-0 text-base leading-tight font-bold">{game.name}</h3>
          <span className="text-sm text-fg-soft">
            {playersLabel(game.minPlayers, game.maxPlayers)}
            {game.durationMinutes ? ` · ${game.durationMinutes} min` : ''}
          </span>
          <span className="mt-1 flex flex-wrap items-center gap-2">
            <Complexity level={DIFFICULTY_LEVEL[game.difficulty as GameDifficulty] ?? 1} label={label} />
            <span className={`${TAG} ${DIFFICULTY_TAG[game.difficulty as GameDifficulty] ?? TAG_INFO}`}>{label}</span>
          </span>
          <span className="text-sm text-fg-soft">Ajouté le {new Date(game.createdAt).toLocaleDateString('fr-FR')}</span>
        </div>
      </div>
      <div className="flex items-center gap-2.5 pb-[3px]">
        <LinkButton to={edit} variant="secondary" className="flex-1">
          Modifier
        </LinkButton>
        <button type="button" onClick={() => onDelete(game)} aria-label={`Supprimer ${game.name}`} className="min-h-11 cursor-pointer rounded-xl border-0 bg-transparent px-3 font-ui text-sm font-bold text-danger-text underline underline-offset-4">
          Supprimer
        </button>
      </div>
    </article>
  );
}

function GameCards({ onDelete }: { onDelete: (game: Game) => void }) {
  const { data, total, isPending, page, perPage, setPage, filterValues, setFilters } = useListContext<Game>();
  const createPath = useCreatePath();
  const filtered = Object.values(filterValues).some(Boolean);

  if (isPending) return <p className="text-fg-soft">Chargement des jeux…</p>;

  if (!data || data.length === 0) {
    return (
      <div className={`${cardClass} p-5`}>
        {filtered ? (
          <>
            <p className="mt-0">Aucun jeu ne correspond à cette recherche.</p>
            <Button variant="secondary" onClick={() => setFilters({}, {})}>
              Effacer les filtres
            </Button>
          </>
        ) : (
          <>
            <p className="mt-0">Le catalogue est vide. Ajoutez le premier jeu.</p>
            <LinkButton to={createPath({ resource: 'games', type: 'create' })}>Ajouter un jeu</LinkButton>
          </>
        )}
      </div>
    );
  }

  return (
    <>
      <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 xl:grid-cols-3">
        {data.map((game) => (
          <li key={game.id}>
            <GameCard game={game} onDelete={onDelete} />
          </li>
        ))}
      </ul>
      <Pagination page={page} perPage={perPage} total={total ?? 0} onPage={setPage} />
    </>
  );
}

export function GameList() {
  const [toDelete, setToDelete] = useState<Game | null>(null);
  const createPath = useCreatePath();

  return (
    <ListBase resource="games" perPage={12} sort={{ field: 'createdAt', order: 'DESC' }}>
      <Title title="Jeux" />
      <div className="flex items-center gap-3">
        <SearchField />
        <LinkButton to={createPath({ resource: 'games', type: 'create' })} className="shrink-0">
          <Icon name="plus" size={20} />
          <span className="hidden sm:inline">Ajouter un jeu</span>
          <span className="sr-only sm:hidden">Ajouter un jeu</span>
        </LinkButton>
      </div>
      <Chips />
      <GameCards onDelete={setToDelete} />
      <DeleteGameDialog game={toDelete} onClose={() => setToDelete(null)} />
    </ListBase>
  );
}
