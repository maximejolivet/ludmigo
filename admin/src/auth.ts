// Authentification du back office : JWT + refresh token de l'API (/api/auth/*)
// Back office authentication: the API's JWT + refresh token (/api/auth/*)
// Les jetons sont gardés dans le localStorage : acceptable pour un outil interne réservé aux administrateurs.
// Tokens are kept in localStorage: acceptable for an internal tool reserved for administrators.

export const API_URL = import.meta.env.VITE_API_URL ?? '/api';

const TOKEN_KEY = 'ludmigo_admin_token';
const REFRESH_KEY = 'ludmigo_admin_refresh_token';
const IDENTITY_KEY = 'ludmigo_admin_identity';

export interface Identity {
  id: string;
  fullName: string;
  roles: string[];
}

export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);

export const getIdentity = (): Identity | null => {
  const raw = localStorage.getItem(IDENTITY_KEY);
  return raw ? (JSON.parse(raw) as Identity) : null;
};

export const clearSession = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(IDENTITY_KEY);
};

export const authHeaders = (): HeadersInit => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const postJson = (path: string, body: unknown): Promise<Response> =>
  fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

// Connexion : refuse tout compte qui n'a pas ROLE_ADMIN
// Sign-in: rejects any account without ROLE_ADMIN
export async function login(email: string, password: string): Promise<void> {
  const response = await postJson('/auth/login', { email, password });
  if (!response.ok) {
    throw new Error('Invalid credentials');
  }
  const tokens = (await response.json()) as { token: string; refresh_token: string };
  localStorage.setItem(TOKEN_KEY, tokens.token);
  localStorage.setItem(REFRESH_KEY, tokens.refresh_token);

  const me = await fetch(`${API_URL}/me`, { headers: authHeaders() });
  const profile = me.ok
    ? ((await me.json()) as { id: string; pseudo: string; roles: string[] })
    : null;
  if (!profile || !profile.roles.includes('ROLE_ADMIN')) {
    await logout();
    throw new Error('Administrator access only');
  }
  localStorage.setItem(
    IDENTITY_KEY,
    JSON.stringify({ id: profile.id, fullName: profile.pseudo, roles: profile.roles }),
  );
}

// Renouvelle le JWT avec le refresh token ; renvoie false si impossible
// Renews the JWT with the refresh token; returns false when impossible
export async function refresh(): Promise<boolean> {
  const refreshToken = localStorage.getItem(REFRESH_KEY);
  if (!refreshToken) {
    return false;
  }
  const response = await postJson('/auth/refresh', { refresh_token: refreshToken });
  if (!response.ok) {
    return false;
  }
  const data = (await response.json()) as { token: string; refresh_token?: string };
  localStorage.setItem(TOKEN_KEY, data.token);
  if (data.refresh_token) {
    localStorage.setItem(REFRESH_KEY, data.refresh_token);
  }
  return true;
}

// Déconnexion : révoque le refresh token côté API, puis efface la session locale
// Sign-out: revokes the refresh token on the API, then clears the local session
export async function logout(): Promise<void> {
  const refreshToken = localStorage.getItem(REFRESH_KEY);
  clearSession();
  if (refreshToken) {
    await postJson('/auth/logout', { refresh_token: refreshToken }).catch(() => undefined);
  }
}
