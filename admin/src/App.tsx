import {
  HydraAdmin,
  fetchHydra as baseFetchHydra,
  hydraDataProvider,
} from '@api-platform/admin';
import { Resource } from 'react-admin';
import { parseHydraDocumentation } from '@api-platform/api-doc-parser';
import { API_URL, authHeaders, refresh } from './auth';
import { authProvider } from './authProvider';
import { GameCreate, GameEdit } from './games/GamePages';
import { GameList } from './games/GameList';
import { i18nProvider } from './i18n';
import { Dashboard } from './layout/Dashboard';
import { Layout } from './layout/Layout';
import { LoginPage } from './layout/LoginPage';
import { Toasts } from './ui/Toasts';
import { UserList, UserShow } from './users/UserPages';

// L'API n'a pas de hub Mercure : pas de temps réel
// The API has no Mercure hub: no real time
const ENTRYPOINT = new URL(API_URL, window.location.href).toString();

// Ajoute le JWT à chaque requête ; sur 401, renouvelle le JWT une fois puis rejoue la requête
// Adds the JWT to each request; on 401, renews the JWT once then replays the request
const fetchHydra: typeof baseFetchHydra = async (url, options = {}) => {
  const send = () => baseFetchHydra(url, { ...options, headers: authHeaders });
  try {
    return await send();
  } catch (error) {
    if ((error as { status?: number }).status === 401 && (await refresh())) {
      return send();
    }
    throw error;
  }
};

const dataProvider = hydraDataProvider({
  entrypoint: ENTRYPOINT,
  httpClient: fetchHydra,
  apiDocumentationParser: (entrypointUrl) =>
    parseHydraDocumentation(entrypointUrl, { headers: authHeaders }),
  mercure: false,
});

// Une ressource par entité exposée par l'API (voir /api/docs en dev)
// One resource per entity exposed by the API (see /api/docs in dev)
export default function App() {
  return (
    <HydraAdmin
      entrypoint={ENTRYPOINT}
      dataProvider={dataProvider}
      authProvider={authProvider}
      title="Ludmigo"
      i18nProvider={i18nProvider}
      layout={Layout}
      loginPage={LoginPage}
      dashboard={Dashboard}
      // Remplace la notification Material UI : sinon elle prend les messages avant nos notifications
      // Replaces the Material UI notification: otherwise it takes the messages before ours
      notification={Toasts}
      darkTheme={null}
    >
      <Resource name="games" list={GameList} create={GameCreate} edit={GameEdit} recordRepresentation="name" />
      <Resource name="users" list={UserList} show={UserShow} recordRepresentation="pseudo" />
    </HydraAdmin>
  );
}
