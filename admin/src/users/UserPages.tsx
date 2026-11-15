import { LinkBase, ListBase, ShowBase, useCreatePath, useListContext, useShowContext } from 'react-admin';
import type { AdminUser } from '@ludmigo/shared';
import { Button, LinkButton } from '../ui/Button';
import { PageTitle } from '../ui/PageTitle';
import { TAG, TAG_FULL, TAG_INFO, TAG_SUCCESS, cardClass } from '../ui/classes';
import { Pagination } from '../ui/Pagination';

const date = (value: string | null) => (value ? new Date(value).toLocaleDateString('fr-FR') : '-');
const isAdmin = (roles: string[]) => roles.includes('ROLE_ADMIN');
const initials = (pseudo: string) => pseudo.slice(0, 2).toUpperCase();

function RoleTag({ roles }: { roles: string[] }) {
  return <span className={`${TAG} ${isAdmin(roles) ? TAG_INFO : TAG_SUCCESS}`}>{isAdmin(roles) ? 'Administrateur' : 'Joueur'}</span>;
}

// Comptes en lecture seule : l'API n'expose que la liste et la fiche ; toute la carte est cliquable
// Read-only accounts: the API only exposes the list and the detail; the whole card is clickable
function UserCards() {
  const { data, total, isPending, error, refetch, page, perPage, setPage } = useListContext<AdminUser>();
  const createPath = useCreatePath();

  if (isPending) {
    return (
      <p role="status" className="text-fg-soft">
        Chargement des comptes…
      </p>
    );
  }
  if (error) {
    return (
      <div role="alert" className={`${cardClass} p-5`}>
        <p className="mt-0">Impossible de charger les comptes.</p>
        <Button variant="secondary" onClick={() => refetch()}>
          Réessayer
        </Button>
      </div>
    );
  }
  if (!data || data.length === 0) return <p className={`${cardClass} p-5`}>Aucun compte pour le moment.</p>;

  return (
    <>
      <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 xl:grid-cols-3">
        {data.map((user) => (
          <li key={user.id}>
            <article className={`${cardClass} relative flex items-center gap-3 p-2.5 ${user.deletedAt ? 'border-dashed' : ''}`}>
              <span aria-hidden="true" className="flex size-12 shrink-0 items-center justify-center rounded-full bg-petrol font-bold text-white">
                {initials(user.pseudo)}
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <h2 className="m-0 text-base leading-tight font-bold">
                  <LinkBase to={createPath({ resource: 'users', type: 'show', id: user.id })} className="text-fg no-underline after:absolute after:inset-0">
                    {user.pseudo}
                  </LinkBase>
                </h2>
                <span className="truncate text-sm text-fg-soft">{user.email}</span>
                <span className="mt-1 flex flex-wrap items-center gap-2">
                  <RoleTag roles={user.roles} />
                  {user.deletedAt && <span className={`${TAG} ${TAG_FULL}`}>Supprimé</span>}
                </span>
              </div>
            </article>
          </li>
        ))}
      </ul>
      <Pagination page={page} perPage={perPage} total={total ?? 0} onPage={setPage} />
    </>
  );
}

export function UserList() {
  return (
    <ListBase resource="users" perPage={12}>
      <PageTitle title="Utilisateurs" />
      <UserCards />
    </ListBase>
  );
}

function UserDetail() {
  const { record, isPending } = useShowContext<AdminUser>();
  if (isPending || !record) {
    return (
      <>
        <PageTitle title="Chargement…" />
        <p role="status" className="text-fg-soft">
          Chargement du compte…
        </p>
      </>
    );
  }

  const rows: [string, string][] = [
    ['Email', record.email],
    ['Ville', record.city ?? '-'],
    ['Inscrit le', date(record.createdAt)],
    ['Supprimé le', date(record.deletedAt)],
  ];

  return (
    <>
      <PageTitle title={record.pseudo} />
      <div className={`${cardClass} max-w-2xl p-5`}>
        <div className="mb-4 flex items-center gap-3">
          <span aria-hidden="true" className="flex size-14 items-center justify-center rounded-full bg-petrol text-lg font-bold text-white">
            {initials(record.pseudo)}
          </span>
          <RoleTag roles={record.roles} />
        </div>
        <dl className="m-0 grid gap-x-6 gap-y-3 sm:grid-cols-[10rem_1fr]">
          {rows.map(([label, value]) => (
            <div key={label} className="contents">
              <dt className="text-sm font-semibold text-fg-soft">{label}</dt>
              <dd className="m-0">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="mt-6">
        <LinkButton to="/users" variant="secondary">
          Retour à la liste
        </LinkButton>
      </div>
    </>
  );
}

export function UserShow() {
  return (
    <ShowBase resource="users">
      <UserDetail />
    </ShowBase>
  );
}
