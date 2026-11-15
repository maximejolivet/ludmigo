import { useEffect, useState } from 'react';
import { useNotificationContext, useTranslate, type NotificationPayload } from 'react-admin';

// Message court (toast) en pastille ; remplace les notifications de Material UI.
// Deux régions permanentes (statut et alerte) pour que les lecteurs d'écran annoncent le message ;
// une erreur reste affichée jusqu'à sa fermeture.
// Short message (toast) as a pill; replaces the Material UI notifications.
// Two permanent regions (status and alert) so screen readers announce the message;
// an error stays visible until it is closed.
const REGION = 'pointer-events-none fixed inset-x-4 bottom-24 z-30 flex justify-center lg:bottom-6';

export function Toasts() {
  const { notifications, takeNotification } = useNotificationContext();
  const translate = useTranslate();
  const [current, setCurrent] = useState<NotificationPayload | null>(null);
  const isError = current?.type === 'error';

  useEffect(() => {
    if (notifications.length > 0 && !current) {
      setCurrent(takeNotification() ?? null);
    }
  }, [notifications, current, takeNotification]);

  useEffect(() => {
    if (!current || isError) return;
    const timer = window.setTimeout(() => setCurrent(null), current.notificationOptions?.autoHideDuration ?? 5000);
    return () => window.clearTimeout(timer);
  }, [current, isError]);

  const text =
    typeof current?.message === 'string'
      ? translate(current.message, { _: current.message, ...current.notificationOptions?.messageArgs })
      : current?.message;

  return (
    <>
      <div role="status" className={REGION}>
        {current && !isError && <p className="m-0 rounded-full bg-fg px-4 py-3 text-sm font-medium text-surface shadow-lg">{text}</p>}
      </div>
      <div role="alert" className={REGION}>
        {current && isError && (
          <p className="pointer-events-auto m-0 flex items-center gap-3 rounded-full bg-danger px-4 py-2 text-sm font-medium text-white shadow-lg">
            <span>{text}</span>
            <button type="button" onClick={() => setCurrent(null)} className="min-h-11 cursor-pointer rounded-full border-2 border-white bg-transparent px-3 font-ui text-sm font-bold text-white">
              Fermer
            </button>
          </p>
        )}
      </div>
    </>
  );
}
