import { LinkBase, Title, useCreatePath, useGetIdentity, useGetList } from 'react-admin';
import type { Game, GameDifficulty } from '@ludmigo/shared';
import { difficultyLabels, playersLabel } from '../games/constants';
import { LinkButton } from '../ui/Button';
import { cardClass } from '../ui/classes';
import { Icon } from './Icon';
import { Pawn } from './Pawn';

// Une carte par ressource : repère de catégorie, total et lien vers la liste
// One card per resource: category marker, total and link to the list
function CountCard({ resource, label, icon }: { resource: string; label: string; icon: 'game' | 'player' }) {
  const createPath = useCreatePath();
  const { total, isPending } = useGetList(resource, { pagination: { page: 1, perPage: 1 } });

  return (
    <article className={`${cardClass} flex items-center gap-3 p-3`}>
      <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-beige-tint">
        {icon === 'game' ? <Icon name="dice" size={30} className="text-link-text" /> : <Pawn height={30} className="text-orange-text" />}
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="m-0 text-base leading-tight font-bold">{label}</h3>
        <p className="m-0 text-sm text-fg-soft">{isPending ? 'Chargement…' : `${total ?? 0} au total`}</p>
      </div>
      <LinkButton to={createPath({ resource, type: 'list' })} variant="secondary">
        Voir
      </LinkButton>
    </article>
  );
}

export function Dashboard() {
  const createPath = useCreatePath();
  const { data: identity } = useGetIdentity();
  const { data: games, isPending } = useGetList<Game>('games', {
    pagination: { page: 1, perPage: 5 },
    sort: { field: 'createdAt', order: 'DESC' },
  });

  return (
    <div>
      <Title title={`Bonjour ${identity?.fullName ?? ''}`.trim()} />

      <section aria-label="Contenu de la plateforme" className="grid gap-3 sm:grid-cols-2">
        <CountCard resource="games" label="Jeux du catalogue" icon="game" />
        <CountCard resource="users" label="Joueurs inscrits" icon="player" />
      </section>

      <section aria-labelledby="derniers-jeux" className="mt-8">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h2 id="derniers-jeux" className="m-0 text-xl font-bold">
            Derniers jeux ajoutés
          </h2>
          <LinkButton to={createPath({ resource: 'games', type: 'create' })}>
            <Icon name="plus" size={20} />
            Ajouter un jeu
          </LinkButton>
        </div>

        {!isPending && games?.length === 0 ? (
          <p className="text-fg-soft">Le catalogue est vide. Ajoutez le premier jeu pour qu'il apparaisse ici.</p>
        ) : (
          <ul className="m-0 grid list-none gap-3 p-0 lg:grid-cols-2">
            {games?.map((game) => (
              <li key={game.id}>
                <article className={`${cardClass} relative flex items-center gap-3 p-2.5`}>
                  <div className="min-w-0 flex-1">
                    <h3 className="m-0 text-base leading-tight font-bold">
                      <LinkBase to={createPath({ resource: 'games', type: 'edit', id: game.id })} className="text-fg no-underline after:absolute after:inset-0">
                        {game.name}
                      </LinkBase>
                    </h3>
                    <p className="m-0 text-sm text-fg-soft">
                      {playersLabel(game.minPlayers, game.maxPlayers)}
                      {game.durationMinutes ? ` · ${game.durationMinutes} min` : ''} · {difficultyLabels[game.difficulty as GameDifficulty]}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
