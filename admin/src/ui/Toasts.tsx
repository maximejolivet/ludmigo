import { useEffect, useState } from 'react';
import { useNotificationContext, useTranslate, type NotificationPayload } from 'react-admin';

// Message court (toast) en pastille, annoncé aux lecteurs d'écran ; remplace les notifications de Material UI
// Short message (toast) as a pill, announced to screen readers; replaces the Material UI notifications
export function Toasts() {
  const { notifications, takeNotification } = useNotificationContext();
  const translate = useTranslate();
  const [current, setCurrent] = useState<NotificationPayload | null>(null);

  useEffect(() => {
    if (notifications.length > 0 && !current) {
      setCurrent(takeNotification() ?? null);
    }
  }, [notifications, current, takeNotification]);

  useEffect(() => {
    if (!current) return;
    const timer = window.setTimeout(() => setCurrent(null), current.notificationOptions?.autoHideDuration ?? 5000);
    return () => window.clearTimeout(timer);
  }, [current]);

  const isError = current?.type === 'error';
  const text =
    typeof current?.message === 'string'
      ? translate(current.message, { _: current.message, ...current.notificationOptions?.messageArgs })
      : current?.message;

  return (
    <div aria-live={isError ? 'assertive' : 'polite'} className="pointer-events-none fixed inset-x-4 bottom-24 z-30 flex justify-center lg:bottom-6">
      {current && (
        <p role={isError ? 'alert' : 'status'} className={`m-0 rounded-full px-4 py-3 text-sm font-medium shadow-lg ${isError ? 'bg-danger text-white' : 'bg-fg text-surface'}`}>
          {text}
        </p>
      )}
    </div>
  );
}
