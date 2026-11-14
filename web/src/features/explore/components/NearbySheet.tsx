import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent, PointerEvent } from 'react';
import { useExplore } from '../context';
import { MeetupSheetCard } from './Cards';
import { NoResults } from './NoResults';
import { ResultsSections } from './ResultsSections';

type SheetState = 'peek' | 'half' | 'full';

const ORDER: readonly SheetState[] = ['peek', 'half', 'full'];

// Hauteurs du volet : réduit (la carte reste visible), à moitié, plein écran (moins l'en-tête)
// Sheet heights: peeking (the map stays visible), half, full screen (minus the header)
const PEEK_HEIGHT = 84;
const HALF_HEIGHT = 268;
const FULL_MARGIN = 236;

// Distance de glissement en dessous de laquelle le geste est un simple appui
// Drag distance under which the gesture is a plain press
const DRAG_THRESHOLD = 8;

function heights(viewport: number): Record<SheetState, number> {
  return { peek: PEEK_HEIGHT, half: HALF_HEIGHT, full: Math.max(HALF_HEIGHT + 80, viewport - FULL_MARGIN) };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

// Volet des parties proches, à trois hauteurs : se tire du doigt, ou se règle au clavier avec les flèches
// Nearby meetups sheet with three heights: drag it, or adjust it with the arrow keys
export function NearbySheet() {
  const { results } = useExplore();
  const [state, setState] = useState<SheetState>('half');
  const [viewport, setViewport] = useState(() => window.innerHeight);
  const [drag, setDrag] = useState<{ startY: number; startHeight: number; delta: number } | null>(null);
  const dragged = useRef(false);

  useEffect(() => {
    const onResize = () => setViewport(window.innerHeight);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const sizes = heights(viewport);
  const height = drag ? clamp(drag.startHeight + drag.delta, sizes.peek, sizes.full) : sizes[state];

  const nearest = (target: number): SheetState =>
    ORDER.reduce((best, candidate) =>
      Math.abs(sizes[candidate] - target) < Math.abs(sizes[best] - target) ? candidate : best,
    );

  const step = (direction: 1 | -1) =>
    setState((current) => ORDER[clamp(ORDER.indexOf(current) + direction, 0, ORDER.length - 1)]);

  const onPointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    event.currentTarget.setPointerCapture?.(event.pointerId);
    dragged.current = false;
    setDrag({ startY: event.clientY, startHeight: sizes[state], delta: 0 });
  };

  const onPointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (!drag) return;
    const delta = drag.startY - event.clientY;
    if (Math.abs(delta) > DRAG_THRESHOLD) dragged.current = true;
    setDrag({ ...drag, delta });
  };

  const onPointerUp = () => {
    if (!drag) return;
    if (dragged.current) setState(nearest(clamp(drag.startHeight + drag.delta, sizes.peek, sizes.full)));
    setDrag(null);
  };

  // Un appui simple fait passer à la hauteur suivante : réduit, moitié, plein, puis retour
  // A plain press moves to the next height: peeking, half, full, then back
  const onClick = () => {
    if (dragged.current) {
      dragged.current = false;
      return;
    }
    setState((current) => ORDER[(ORDER.indexOf(current) + 1) % ORDER.length]);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      step(1);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      step(-1);
    }
  };

  return (
    <section
      aria-labelledby="nearby-title"
      data-state={state}
      style={{ height }}
      className={`relative z-10 -mt-6 flex flex-col overflow-hidden rounded-t-3xl bg-surface shadow-[0_-6px_18px_rgba(62,62,62,.16)] ${
        drag ? '' : 'motion-safe:transition-[height] motion-safe:duration-200'
      }`}
    >
      <button
        type="button"
        aria-label={state === 'full' ? 'Réduire la liste des parties' : 'Agrandir la liste des parties'}
        aria-expanded={state !== 'peek'}
        onClick={onClick}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={() => setDrag(null)}
        className="flex h-7 w-full shrink-0 cursor-grab touch-none items-center justify-center border-0 bg-transparent active:cursor-grabbing"
      >
        <span aria-hidden="true" className="h-[5px] w-10 rounded-full bg-fg-soft/40" />
      </button>

      <div className="flex shrink-0 items-baseline justify-between px-4 pb-2">
        <h2 id="nearby-title" className="m-0 text-lg leading-snug font-bold">
          Les parties près de chez vous
        </h2>
        <span className="text-sm text-fg-soft">
          {results.meetups.length} {results.meetups.length > 1 ? 'parties' : 'partie'}
        </span>
      </div>

      {state === 'half' &&
        (results.meetups.length > 0 ? (
          <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pt-1 pb-3 [scrollbar-width:none]">
            {results.meetups.map((meetup) => (
              <MeetupSheetCard key={meetup.id} meetup={meetup} />
            ))}
          </div>
        ) : (
          <div className="px-4 pt-1">
            <NoResults subject="partie" />
          </div>
        ))}

      {state === 'full' && (
        <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto bg-canvas px-4 pt-4 pb-6">
          <ResultsSections />
        </div>
      )}
    </section>
  );
}
