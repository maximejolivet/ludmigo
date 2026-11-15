import type { ReactNode } from 'react';
import { LinkBase, useGetIdentity, useLocation, useLogout, useResourceDefinitions, useTranslate } from 'react-admin';
import logoDark from '../assets/logo-ludmigo-noir.svg';
import logoLight from '../assets/logo-ludmigo-blanc.svg';
import { Toasts } from '../ui/Toasts';
import { Icon, type IconName } from './Icon';
import { useNight } from './useNight';

interface Tab {
  to: string;
  label: string;
  key: string;
  icon: IconName;
}

const RESOURCE_ICONS: Record<string, IconName> = { games: 'dice', users: 'users' };

// Onglets : accueil, puis une entrée par ressource (jeux en premier)
// Tabs: home, then one entry per resource (games first)
function useTabs(): Tab[] {
  const resources = useResourceDefinitions();
  const translate = useTranslate();
  return [
    { to: '/', label: 'Accueil', key: '', icon: 'compass' },
    ...Object.values(resources)
      .filter((r) => r.hasList)
      .sort((a, b) => Number(b.name === 'games') - Number(a.name === 'games'))
      .map((r) => ({
        to: `/${r.name}`,
        label: translate(`resources.${r.name}.name`, { smart_count: 2, _: r.name }),
        key: r.name,
        icon: RESOURCE_ICONS[r.name] ?? 'dice',
      })),
  ];
}

export function NightToggle({ night, onToggle }: { night: boolean; onToggle: () => void }) {
  return (
    <button type="button" aria-pressed={night} aria-label="Mode soirée" onClick={onToggle} className="flex size-11 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent text-fg">
      <Icon name={night ? 'sun' : 'moon'} size={24} />
    </button>
  );
}

// Navigation du haut, sur ordinateur : l'onglet actif est sur fond pétrole clair
// Top navigation, on desktop: the active tab sits on a light petrol background
function TopNav({ tabs, current }: { tabs: Tab[]; current: string }) {
  return (
    <nav aria-label="Navigation principale" className="ml-4 hidden gap-1 lg:flex">
      {tabs.map((tab) => {
        const active = tab.key === current;
        return (
          <LinkBase
            key={tab.to}
            to={tab.to}
            aria-current={active ? 'page' : undefined}
            className={`flex min-h-11 items-center gap-2 rounded-full px-4 text-base no-underline ${active ? 'bg-petrol-tint font-bold text-accent' : 'font-medium text-fg-soft'}`}
          >
            <Icon name={tab.icon} size={22} />
            {tab.label}
          </LinkBase>
        );
      })}
    </nav>
  );
}

// Barre d'onglets du bas, sur mobile : à portée du pouce, avec les zones sûres
// Bottom tab bar, on mobile: within thumb reach, with safe areas
function BottomNav({ tabs, current, onLogout }: { tabs: Tab[]; current: string; onLogout: () => void }) {
  const base = 'flex min-h-12 flex-1 flex-col items-center gap-0.5 text-xs no-underline';
  const pill = (active: boolean) => `flex h-[30px] w-14 items-center justify-center rounded-full ${active ? 'bg-petrol-tint' : ''}`;
  return (
    <nav aria-label="Navigation principale" className="fixed inset-x-0 bottom-0 z-20 flex gap-1 border-t border-line bg-surface px-2 pt-2 pb-[max(1.375rem,env(safe-area-inset-bottom))] lg:hidden">
      {tabs.map((tab) => {
        const active = tab.key === current;
        return (
          <LinkBase key={tab.to} to={tab.to} aria-current={active ? 'page' : undefined} className={`${base} ${active ? 'font-bold text-accent' : 'font-medium text-fg-soft'}`}>
            <span className={pill(active)}>
              <Icon name={tab.icon} />
            </span>
            {tab.label}
          </LinkBase>
        );
      })}
      <button type="button" onClick={onLogout} className={`${base} cursor-pointer border-0 bg-transparent font-medium text-fg-soft`}>
        <span className={pill(false)}>
          <Icon name="logout" />
        </span>
        Quitter
      </button>
    </nav>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  const { data: identity } = useGetIdentity();
  const logout = useLogout();
  const { night, toggle } = useNight();
  const tabs = useTabs();
  const { pathname } = useLocation();
  const current = pathname.split('/')[1] ?? '';
  const initials = (identity?.fullName ?? '').slice(0, 2).toUpperCase();

  return (
    <div className="min-h-dvh bg-canvas font-ui text-base text-fg">
      <a href="#contenu" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded-xl focus:bg-primary focus:px-4 focus:py-2 focus:text-ink">
        Aller au contenu
      </a>

      <header className="flex items-center gap-1 border-b border-line bg-surface px-3 py-2 lg:gap-2 lg:px-6 lg:py-2.5">
        <LinkBase to="/" className="flex min-h-12 items-center">
          <img src={night ? logoLight : logoDark} alt="Ludmigo, accueil" width={112} height={32} className="h-8 w-auto translate-y-0.5" />
        </LinkBase>
        <TopNav tabs={tabs} current={current} />
        <div className="ml-auto flex items-center gap-1 lg:gap-3">
          <NightToggle night={night} onToggle={toggle} />
          <span role="img" aria-label={`Connecté : ${identity?.fullName ?? ''}`} className="flex size-11 items-center justify-center rounded-full border-2 border-edge bg-beige text-[15px] font-bold text-ink">
            {initials}
          </span>
          <button type="button" onClick={() => logout()} className="hidden min-h-11 cursor-pointer rounded-xl border-0 bg-transparent px-3 font-ui text-base font-medium text-fg-soft underline underline-offset-4 lg:block">
            Se déconnecter
          </button>
        </div>
      </header>

      <main id="contenu" className="mx-auto max-w-6xl p-4 pb-28 lg:p-8">
        {/* react-admin place ici le titre de la page / react-admin puts the page title here */}
        <h1 id="react-admin-title" className="m-0 mb-6 text-2xl font-bold" />
        {children}
      </main>

      <BottomNav tabs={tabs} current={current} onLogout={() => logout()} />
      <Toasts />
    </div>
  );
}
