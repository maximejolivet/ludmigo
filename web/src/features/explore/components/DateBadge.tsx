import { dateParts, formatLongDate } from '../format';

interface DateBadgeProps {
  iso: string;
  // Version compacte (sans jour de la semaine) pour les petites images
  // Compact version (no weekday) for small images
  compact?: boolean;
  className?: string;
}

// Pastille de date posée sur l'image d'une carte, comme un jeton de calendrier
// Date badge laid over a card image, like a calendar token
export function DateBadge({ iso, compact = false, className = '' }: DateBadgeProps) {
  const { weekday, day, month } = dateParts(iso);
  return (
    <span className={className}>
      <span className="sr-only">{formatLongDate(iso)}</span>
      <span
        aria-hidden="true"
        className="flex w-11 flex-col items-center rounded-xl border-2 border-edge bg-surface px-1 py-1 leading-none text-fg shadow-[0_2px_0_var(--color-edge)]"
      >
        {!compact && <span className="mb-0.5 text-[11px] font-medium">{weekday}</span>}
        <span className="text-xl font-bold">{day}</span>
        <span className="mt-0.5 text-[11px] font-medium">{month}</span>
      </span>
    </span>
  );
}
