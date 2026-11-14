import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getIdentity, getToken, login, logout, refresh } from './auth';

const json = (body: unknown, status = 200) =>
  Promise.resolve(new Response(JSON.stringify(body), { status }));

describe('auth', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => vi.unstubAllGlobals());

  // Un administrateur se connecte : jetons et identité sont gardés
  // An administrator signs in: tokens and identity are kept
  it('stores the session for an administrator', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockImplementationOnce(() => json({ token: 'jwt', refresh_token: 'rt' }))
        .mockImplementationOnce(() => json({ id: '1', pseudo: 'boss', roles: ['ROLE_ADMIN', 'ROLE_USER'] })),
    );

    await login('boss@example.com', 'secret-password-1');

    expect(getToken()).toBe('jwt');
    expect(getIdentity()?.fullName).toBe('boss');
  });

  // Un joueur sans ROLE_ADMIN est refusé et la session est effacée
  // A player without ROLE_ADMIN is rejected and the session is cleared
  it('rejects a non-administrator', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockImplementationOnce(() => json({ token: 'jwt', refresh_token: 'rt' }))
        .mockImplementationOnce(() => json({ id: '2', pseudo: 'ada', roles: ['ROLE_USER'] }))
        .mockImplementation(() => Promise.resolve(new Response(null, { status: 204 }))),
    );

    await expect(login('ada@example.com', 'secret-password-1')).rejects.toThrow('Administrator access only');
    expect(getToken()).toBeNull();
  });

  // Le refresh remplace le JWT
  // Refresh replaces the JWT
  it('refreshes the token', async () => {
    localStorage.setItem('ludmigo_admin_refresh_token', 'rt');
    vi.stubGlobal('fetch', vi.fn().mockImplementation(() => json({ token: 'new-jwt' })));

    expect(await refresh()).toBe(true);
    expect(getToken()).toBe('new-jwt');
  });

  // Sans refresh token, le renouvellement échoue ; la déconnexion efface tout
  // Without a refresh token, renewal fails; sign-out clears everything
  it('fails to refresh without a token and clears on logout', async () => {
    expect(await refresh()).toBe(false);

    localStorage.setItem('ludmigo_admin_token', 'jwt');
    vi.stubGlobal('fetch', vi.fn().mockImplementation(() => Promise.resolve(new Response(null, { status: 204 }))));
    await logout();
    expect(getToken()).toBeNull();
  });
});
