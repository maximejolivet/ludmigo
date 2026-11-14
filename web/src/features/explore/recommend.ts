import { formatTravel, formatTime, formatShortDate } from './format';
import type { Meetup, Profile } from './types';

export interface Recommendation {
  meetup: Meetup;
  // Phrases courtes qui expliquent le choix
  // Short sentences explaining the choice
  reasons: string[];
}

// Normalise pour comparer « Loups-Garous » et « Les Loups-Garous de Thiercelieux »
// Normalises to compare "Loups-Garous" and "Les Loups-Garous de Thiercelieux"
export function matchesFavorite(meetup: Meetup, profile: Profile | null): boolean {
  if (!profile) return false;
  const game = meetup.game.toLowerCase();
  return profile.favorites.some((favorite) => game.includes(favorite.toLowerCase()));
}

// Choisit la meilleure partie pour l'utilisateur : proche, bientôt, avec de la place, et selon son profil
// Picks the best meetup for the user: close, soon, with room left, and matching their profile
export function recommendMeetup(
  meetups: Meetup[],
  profile: Profile | null,
  joinedIds: ReadonlySet<string>,
  now: Date,
): Recommendation | null {
  const candidates = meetups.filter(
    (meetup) =>
      !joinedIds.has(meetup.id) &&
      meetup.participants.length < meetup.capacity &&
      new Date(meetup.startsAt).getTime() >= now.getTime(),
  );

  let best: { meetup: Meetup; score: number } | null = null;
  for (const meetup of candidates) {
    const hours = (new Date(meetup.startsAt).getTime() - now.getTime()) / 3_600_000;
    let score = 100 - meetup.distanceKm * 6 - Math.min(hours, 72) * 0.4;
    if (matchesFavorite(meetup, profile)) score += 25;
    if (profile?.level === 'beginner') {
      if (meetup.beginnerFriendly) score += 15;
      if (meetup.complexity >= 4) score -= 20;
    }
    if (profile?.level === 'expert' && meetup.complexity >= 3) score += 10;
    if (!best || score > best.score) best = { meetup, score };
  }
  if (!best) return null;

  const { meetup } = best;
  const left = meetup.capacity - meetup.participants.length;
  const sameDay = new Date(meetup.startsAt).toDateString() === now.toDateString();
  const reasons = [
    sameDay ? `Ce soir, ${formatTime(meetup.startsAt)}` : `${formatShortDate(meetup.startsAt)}, ${formatTime(meetup.startsAt)}`,
    formatTravel(meetup.distanceKm),
    `${left} ${left > 1 ? 'places libres' : 'place libre'}`,
  ];
  if (matchesFavorite(meetup, profile)) reasons.push(`Vous aimez ${meetup.game}`);
  if (profile?.level === 'beginner' && meetup.beginnerFriendly) reasons.push('Débutants bienvenus');
  return { meetup, reasons };
}
