import { useState, type FormEvent } from 'react';
import { useLogin } from 'react-admin';
import logoDark from '../assets/logo-ludmigo-noir.svg';
import logoLight from '../assets/logo-ludmigo-blanc.svg';
import { Button } from '../ui/Button';
import { cardClass } from '../ui/classes';
import { NightToggle } from './Layout';
import { Pawn } from './Pawn';
import { useNight } from './useNight';

// Messages d'erreur lisibles à partir des erreurs de src/auth.ts
// Readable error messages from the errors of src/auth.ts
const messages: Record<string, string> = {
  'Invalid credentials': 'Email ou mot de passe incorrect.',
  'Administrator access only': "Ce compte n'a pas accès à l'administration.",
};

const field =
  'mt-1 block min-h-11 w-full rounded-xl border-2 border-edge/50 bg-surface px-3 py-2 font-ui text-base text-fg aria-[invalid=true]:border-danger-text focus-visible:border-edge';

export function LoginPage() {
  const login = useLogin();
  const { night, toggle } = useNight();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await login({ username, password });
    } catch (e) {
      setError(messages[(e as Error).message] ?? 'Connexion impossible. Réessayez dans un instant.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-dvh flex-col bg-canvas font-ui text-fg">
      <div className="flex justify-end p-3">
        <NightToggle night={night} onToggle={toggle} />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-4 pb-16">
        <img src={night ? logoLight : logoDark} alt="Ludmigo" className="w-64 max-w-full" />

        <form onSubmit={submit} className={`${cardClass} w-full max-w-sm p-5`} noValidate>
          <h1 className="m-0 mb-5 text-2xl font-bold">Administration</h1>

          <label className="block text-sm font-semibold" htmlFor="email">
            Adresse email
            <input id="email" name="email" type="email" autoComplete="username" required value={username} onChange={(e) => setUsername(e.target.value)} aria-invalid={error ? true : undefined} aria-describedby={error ? 'login-error' : undefined} className={field} />
          </label>

          <label className="mt-4 block text-sm font-semibold" htmlFor="password">
            Mot de passe
            <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} aria-invalid={error ? true : undefined} aria-describedby={error ? 'login-error' : undefined} className={field} />
          </label>

          {error && (
            <p id="login-error" role="alert" className="mt-4 mb-0 text-sm text-danger-text">
              {error}
            </p>
          )}

          <Button type="submit" disabled={busy} className="mt-6 w-full">
            {busy ? 'Connexion…' : 'Se connecter'}
          </Button>
        </form>

        <div className="flex items-end gap-3" aria-hidden="true">
          <Pawn height={28} className="text-link-text" />
          <Pawn height={28} className="text-success-text" />
          <Pawn height={28} className="text-accent" />
          <Pawn height={28} className="text-orange-text" />
        </div>
      </div>
    </div>
  );
}
