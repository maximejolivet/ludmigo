// react-admin encode les messages de validation sous la forme `@@react-admin@@{...}` (texte ou {message, args})
// react-admin encodes validation messages as `@@react-admin@@{...}` (text or {message, args})
const PREFIX = '@@react-admin@@';

export function decodeError(raw: unknown, translate: (key: string, options?: object) => string): string {
  let value: unknown = raw;
  if (typeof raw === 'string' && raw.startsWith(PREFIX)) {
    try {
      value = JSON.parse(raw.slice(PREFIX.length));
    } catch {
      value = raw.slice(PREFIX.length);
    }
  }
  const { message, args } =
    typeof value === 'object' && value !== null ? (value as { message: string; args?: object }) : { message: String(value), args: undefined };
  return translate(message, { _: message, ...args });
}
