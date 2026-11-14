import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Icon } from './components/Icon';
import { BUTTON_PRIMARY, CHOICE_OFF, CHOICE_ON } from './components/styles';
import { useExplore } from './context';
import { FAVORITE_CHOICES } from './data';
import type { Level } from './types';

// Nombre maximal de jeux préférés
// Maximum number of favourite games
const MAX_FAVORITES = 3;

const LEVELS: ReadonlyArray<{ value: Level; label: string; hint: string }> = [
  { value: 'beginner', label: 'Débutant', hint: "J'apprends les règles autour de la table" },
  { value: 'expert', label: 'Confirmé', hint: 'Je connais déjà beaucoup de jeux' },
];

// Premier lancement : deux questions (niveau, jeux préférés) pour trier les parties
// First launch: two questions (level, favourite games) to sort the meetups
export function OnboardingDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { saveProfile, notify } = useExplore();
  const [level, setLevel] = useState<Level | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const close = useCallback(() => {
    if (location.key !== 'default') navigate(-1);
    else navigate('/explorer', { replace: true });
  }, [location.key, navigate]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  }, []);

  const toggleFavorite = (game: string) =>
    setFavorites((current) =>
      current.includes(game)
        ? current.filter((item) => item !== game)
        : current.length < MAX_FAVORITES
          ? [...current, game]
          : current,
    );

  const save = () => {
    if (!level) return;
    saveProfile({ level, favorites });
    notify('Les parties sont triées pour vous.');
    close();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="onboarding-title"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
      className="m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-transparent p-0 text-fg backdrop:bg-ink/55"
    >
      <div className="absolute inset-x-0 top-12 bottom-0 mx-auto flex max-w-[480px] flex-col rounded-t-3xl bg-surface font-ui shadow-[0_-6px_24px_rgba(0,0,0,.25)] lg:top-1/2 lg:bottom-auto lg:h-[min(680px,88dvh)] lg:max-w-[520px] lg:-translate-y-1/2 lg:rounded-3xl">
        <header className="flex items-center justify-between py-3 pr-2 pl-5">
          <h2 id="onboarding-title" className="m-0 text-[22px] leading-tight font-bold">
            Bienvenue sur Ludmigo
          </h2>
          <button
            type="button"
            aria-label="Fermer"
            onClick={close}
            className="flex size-11 cursor-pointer items-center justify-center border-0 bg-transparent text-fg"
          >
            <Icon name="close" />
          </button>
        </header>

        <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-5 pt-1 pb-4">
          <div role="group" aria-labelledby="level-title" className="flex flex-col gap-2.5">
            <span id="level-title" className="text-[15px] font-bold">
              Votre niveau
            </span>
            <div className="flex flex-col gap-2.5 pb-[3px]">
              {LEVELS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={level === option.value}
                  onClick={() => setLevel(option.value)}
                  className={`${level === option.value ? CHOICE_ON : CHOICE_OFF} h-auto flex-col items-start py-2.5 text-left`}
                >
                  <span>{option.label}</span>
                  <span className="text-xs font-medium opacity-80">{option.hint}</span>
                </button>
              ))}
            </div>
          </div>

          <div role="group" aria-labelledby="favorites-title" className="flex flex-col gap-2.5">
            <span id="favorites-title" className="text-[15px] font-bold">
              Vos jeux préférés <span className="font-medium text-fg-soft">({MAX_FAVORITES} au maximum)</span>
            </span>
            <div className="flex flex-wrap gap-2 pb-[3px]">
              {FAVORITE_CHOICES.map((game) => (
                <button
                  key={game}
                  type="button"
                  aria-pressed={favorites.includes(game)}
                  onClick={() => toggleFavorite(game)}
                  className={favorites.includes(game) ? CHOICE_ON : CHOICE_OFF}
                >
                  {game}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 border-t border-line px-5 pt-3 pb-[max(1.875rem,env(safe-area-inset-bottom))]">
          <button type="button" disabled={!level} onClick={save} className={`${BUTTON_PRIMARY} min-h-[52px] w-full text-[17px]`}>
            Enregistrer
          </button>
          <button
            type="button"
            onClick={close}
            className="min-h-11 cursor-pointer border-0 bg-transparent text-[15px] font-medium text-link-text"
          >
            Plus tard
          </button>
        </div>
      </div>
    </dialog>
  );
}
