import type { AuthProvider } from 'react-admin';
import { clearSession, getIdentity, getToken, login, logout } from './auth';

// Fournisseur d'authentification de react-admin (la connexion se fait par email)
// react-admin authentication provider (sign-in is by email)
export const authProvider: AuthProvider = {
  login: ({ username, password }) => login(username, password),
  logout: async () => {
    await logout();
  },
  checkAuth: () => (getToken() ? Promise.resolve() : Promise.reject()),
  checkError: ({ status }: { status?: number }) => {
    if (status === 401) {
      clearSession();
      return Promise.reject();
    }
    return Promise.resolve();
  },
  getIdentity: () => {
    const identity = getIdentity();
    return identity ? Promise.resolve(identity) : Promise.reject();
  },
  getPermissions: () => Promise.resolve(getIdentity()?.roles ?? []),
};
