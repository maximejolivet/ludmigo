import { Link, useLocation } from 'react-router';
import { useExplore } from '../context';
import { Icon } from './Icon';
import type { IconName } from './Icon';

interface TabProps {
  icon: IconName;
  label: string;
  active?: boolean;
}

const TAB_BASE = 'flex min-h-12 flex-1 flex-col items-center gap-0.5 text-xs no-underline';

function TabContent({ icon, label, active }: TabProps) {
  return (
    <>
      <span
        className={`flex h-[30px] w-14 items-center justify-center rounded-full ${active ? 'bg-petrol-tint' : ''}`}
      >
        <Icon name={icon} />
      </span>
      {label}
    </>
  );
}

// Barre d'onglets du bas, comme le prévoit le document de conception pour le mobile
// Bottom tab bar, as the design document plans for mobile
export function BottomNav() {
  const { pathname } = useLocation();
  const { notify } = useExplore();
  const onList = pathname.endsWith('/liste');
  const idle = 'cursor-pointer border-0 bg-transparent font-medium text-ink-soft';

  return (
    <nav
      aria-label="Navigation principale"
      className="relative z-20 flex gap-1 border-t border-[#e2e2e2] bg-white px-2 pt-2 pb-[max(1.375rem,env(safe-area-inset-bottom))]"
    >
      <Link
        to="/explorer"
        aria-current={onList ? undefined : 'page'}
        className={`${TAB_BASE} ${onList ? 'font-medium text-ink-soft' : 'font-bold text-petrol'}`}
      >
        <TabContent icon="map" label="Carte" active={!onList} />
      </Link>
      <Link
        to="/explorer/liste"
        aria-current={onList ? 'page' : undefined}
        className={`${TAB_BASE} ${onList ? 'font-bold text-petrol' : 'font-medium text-ink-soft'}`}
      >
        <TabContent icon="dice" label="Parties" active={onList} />
      </Link>
      <button type="button" onClick={() => notify('Les événements arrivent bientôt.')} className={`${TAB_BASE} ${idle}`}>
        <TabContent icon="calendar" label="Événements" />
      </button>
      <button type="button" onClick={() => notify('Le profil arrive bientôt.')} className={`${TAB_BASE} ${idle}`}>
        <TabContent icon="user" label="Profil" />
      </button>
    </nav>
  );
}
