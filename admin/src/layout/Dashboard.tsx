import { LinkBase, useCreatePath, useGetIdentity, useGetList } from 'react-admin';
import type { Game, GameDifficulty } from '@ludmigo/shared';
import { difficultyLabels, playersLabel } from '../games/constants';
import { LinkButton } from '../ui/Button';
import { cardClass } from '../ui/classes';
import { PageTitle } from '../ui/PageTitle';
import { Icon } from './Icon';
import { Pawn } from './Pawn';

interface CountCardProps {
  resource: string;
  label: string;
  icon: 'game' | 'player';
  total?: number;
  isPending: boolean;
  failed: boolean;
}

// Une carte par ressource : repère de catégorie, total et lien vers la liste
// One card per resource: category marker, total and link to the list
function CountCard({ resource, label, icon, total, isPending, failed }: CountCardProps) {
  const createPath = useCreatePath();
  // Une erreur ne s'affiche jamais comme « 0 » / An error is never shown as "0"
  const text = isPending ? 'Chargement…' : failed ? 'Indisponible' : `${total ?? 0} au total`;

  return (
    <article className={`${cardClass} flex items-center gap-3 p-3`}>
      <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-beige-tint">
        {icon === 'game' ? <Icon name="dice" size={30} className="text-link-text" /> : <Pawn height={30} className="text-orange-text" />}
      </span>
      <div className="min-w-0 flex-1">
        <h2 className="m-0 text-base leading-tight font-bold">{label}</h2>
        <p className="m-0 text-sm text-fg-soft">{text}</p>
      </div>
      <LinkButton to={createPath({ resource, type: 'list' })} variant="secondary" aria-label={`Voir : ${label}`}>
        Voir
      </LinkButton>
    </article>
  );
}

export function Dashboard() {
  const createPath = useCreatePath();
  const { data: identity } = useGetIdentity();
  // Une seule requête pour les jeux : les 5 derniers et le total
  // A single request for games: the latest 5 and the total
  const games = useGetList<Game>('games', { pagination: { page: 1, perPage: 5 }, sort: { field: 'createdAt', order: 'DESC' } });
  const users = useGetList('users', { pagination: { page: 1, perPage: 1 } });

  return (
    <div>
      <PageTitle title={`Bonjour ${identity?.fullName ?? ''}`.trim()} />

      <section aria-label="Contenu de la plateforme" className="grid gap-3 sm:grid-cols-2">
        <CountCard resource="games" label="Jeux du catalogue" icon="game" total={games.total} isPending={games.isPending} failed={!!games.error} />
        <CountCard resource="users" label="Comptes" icon="player" total={users.total} isPending={users.isPending} failed={!!users.error} />
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

        {games.error ? (
          <p role="alert" className="text-danger-text">
            Impossible de charger les jeux.
          </p>
        ) : !games.isPending && games.data?.length === 0 ? (
          <p className="text-fg-soft">Le catalogue est vide. Ajoutez le premier jeu pour qu'il apparaisse ici.</p>
        ) : (
          <ul className="m-0 grid list-none gap-3 p-0 lg:grid-cols-2">
            {games.data?.map((game) => (
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
