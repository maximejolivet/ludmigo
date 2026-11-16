import type { ReactNode } from 'react';

// Icônes à trait unique, 24 px, les mêmes que l'application web (docs/07_UI_UX_DESIGN.md)
// Single-stroke 24 px icons, the same as the web app (docs/07_UI_UX_DESIGN.md)
const PATHS = {
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  dice: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="3.5" />
      <circle cx="8.5" cy="8.5" r="2" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="15.5" r="2" fill="currentColor" stroke="none" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M3 19c.5-3 3-5 6-5s5.5 2 6 5M15 14c3 0 5 1.5 5.5 5" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5z" />
    </>
  ),
  moon: <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  news: <path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4zM9 9h6M9 13h6M9 17h3" />,
  logout: <path d="M10 5H5v14h5M15 8l4 4-4 4M19 12H9" />,
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof PATHS;

// Icône décorative : le libellé est porté par le bouton ou le lien qui la contient
// Decorative icon: the label is carried by the button or link that contains it
export function Icon({ name, size = 24, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {PATHS[name]}
    </svg>
  );
}
