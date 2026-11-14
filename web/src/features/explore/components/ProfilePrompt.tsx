import { Link } from 'react-router';
import { useExplore } from '../context';
import { PawnScene } from './PawnScene';
import { BUTTON_OUTLINE } from './styles';

// Invitation à dire ce qu'on aime (niveau et jeux préférés) : disparaît une fois le profil renseigné
// Invitation to say what you like (level and favourite games): disappears once the profile is filled in
export function ProfilePrompt() {
  const { profile, profileDismissed, dismissProfilePrompt } = useExplore();
  if (profile || profileDismissed) return null;

  return (
    <section
      aria-label="Personnaliser les parties"
      className="flex flex-col gap-2.5 rounded-2xl border-2 border-edge bg-warning-tint p-3"
    >
      <div className="flex items-center gap-3">
        <PawnScene className="h-12 w-auto shrink-0" />
        <p className="m-0 text-sm leading-snug">
          <strong>Dites-nous ce que vous aimez.</strong> Deux questions, et les parties sont triées pour vous.
        </p>
      </div>
      <div className="flex items-center gap-2 pb-[3px]">
        <Link to="/explorer/bienvenue" className={BUTTON_OUTLINE}>
          Personnaliser
        </Link>
        <button
          type="button"
          onClick={dismissProfilePrompt}
          className="min-h-11 cursor-pointer border-0 bg-transparent px-3 text-sm font-medium text-link-text"
        >
          Plus tard
        </button>
      </div>
    </section>
  );
}
