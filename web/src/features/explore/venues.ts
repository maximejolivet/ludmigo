import type { Schedule } from './types';

const WEEKDAYS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];

// Heure lisible : 17 → « 17 h », 17,5 → « 17 h 30 », 25 → « 1 h »
// Readable hour: 17 → "17 h", 17.5 → "17 h 30", 25 → "1 h"
function formatHour(hour: number): string {
  const normalized = hour % 24;
  const whole = Math.floor(normalized);
  const minutes = Math.round((normalized - whole) * 60);
  return minutes === 0 ? `${whole} h` : `${whole} h ${String(minutes).padStart(2, '0')}`;
}

// Un établissement est-il ouvert à cet instant ? Gère la fermeture après minuit (« jusqu'à 1 h »)
// Is a venue open at this moment? Handles closing after midnight ("until 1 am")
export function isOpenNow(schedule: Schedule, now: Date): boolean {
  const day = now.getDay();
  const hour = now.getHours() + now.getMinutes() / 60;
  if (schedule.days.includes(day) && hour >= schedule.from && hour < Math.min(schedule.to, 24)) return true;
  // Fermeture après minuit : la veille ouvrait ce soir et ferme encore
  // Closing after midnight: yesterday opened tonight and is still open
  const yesterday = (day + 6) % 7;
  return schedule.to > 24 && schedule.days.includes(yesterday) && hour < schedule.to - 24;
}

// Texte d'état : « Ouvert jusqu'à 1 h » ou « Ouvre demain à 10 h »
// Status text: "Open until 1 am" or "Opens tomorrow at 10 am"
export function openStatus(schedule: Schedule, now: Date): { open: boolean; label: string } {
  if (isOpenNow(schedule, now)) {
    const closing = formatHour(schedule.to);
    return { open: true, label: `Ouvert jusqu'à ${closing}` };
  }
  const day = now.getDay();
  const hour = now.getHours() + now.getMinutes() / 60;
  for (let offset = 0; offset <= 7; offset += 1) {
    const candidate = (day + offset) % 7;
    if (!schedule.days.includes(candidate)) continue;
    if (offset === 0 && hour >= schedule.from) continue;
    const when = offset === 0 ? "aujourd'hui" : offset === 1 ? 'demain' : WEEKDAYS[candidate];
    return { open: false, label: `Ouvre ${when} à ${formatHour(schedule.from)}` };
  }
  return { open: false, label: 'Fermé' };
}
