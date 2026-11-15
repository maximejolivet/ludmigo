import { useInput, useTranslate, type InputProps } from 'react-admin';
import { decodeError } from './decodeError';

// Champs de formulaire : libellé au-dessus, aide puis message d'erreur sous le champ (docs/07_UI_UX_DESIGN.md)
// Form fields: label above, hint then error message under the field

const control = 'mt-1 block min-h-11 w-full rounded-xl border-2 border-fg-soft bg-surface px-3 py-2 font-ui text-base text-fg aria-[invalid=true]:border-danger-text focus-visible:border-edge';

interface FieldProps extends Pick<InputProps, 'source' | 'validate'> {
  label: string;
  hint?: string;
  className?: string;
}

function useField(props: FieldProps, extra: Partial<InputProps> = {}) {
  const translate = useTranslate();
  const { id, field, fieldState, isRequired } = useInput({ source: props.source, validate: props.validate, ...extra });
  const error = fieldState.error ? decodeError(fieldState.error.message as unknown, translate) : null;
  const hintId = props.hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  const wrap = (input: React.ReactNode) => (
    <div className={props.className}>
      <label htmlFor={id} className="text-sm font-semibold">
        {props.label}
        {isRequired && <span aria-hidden="true"> *</span>}
      </label>
      {props.hint && (
        <p id={hintId} className="m-0 text-sm text-fg-soft">
          {props.hint}
        </p>
      )}
      {input}
      {error && (
        <p id={errorId} role="alert" className="mt-1 mb-0 text-sm text-danger-text">
          {error}
        </p>
      )}
    </div>
  );

  return {
    id,
    field,
    wrap,
    aria: { 'aria-required': isRequired || undefined, 'aria-invalid': error ? true : undefined, 'aria-describedby': [hintId, errorId].filter(Boolean).join(' ') || undefined },
  };
}

export function TextInput(props: FieldProps & { type?: string; autoComplete?: string }) {
  const { id, field, wrap, aria } = useField(props);
  return wrap(
    <input id={id} {...field} value={field.value ?? ''} type={props.type ?? 'text'} autoComplete={props.autoComplete} className={control} {...aria} />,
  );
}

export function TextAreaInput(props: FieldProps) {
  const { id, field, wrap, aria } = useField(props);
  return wrap(<textarea id={id} {...field} value={field.value ?? ''} rows={5} className={control} {...aria} />);
}

// Nombre entier ; un champ vide vaut null / Whole number; an empty field is null
export function NumberInput(props: FieldProps) {
  const { id, field, wrap, aria } = useField(props, {
    parse: (value: string) => (value === '' || value == null ? null : Number(value)),
    format: (value: number | null) => value ?? '',
  });
  return wrap(<input id={id} {...field} value={field.value ?? ''} type="number" inputMode="numeric" min={1} step={1} className={control} {...aria} />);
}

export function SelectInput(props: FieldProps & { choices: { id: string; name: string }[] }) {
  const { id, field, wrap, aria } = useField(props);
  return wrap(
    <select id={id} {...field} value={field.value ?? ''} className={control} {...aria}>
      {props.choices.map((choice) => (
        <option key={choice.id} value={choice.id}>
          {choice.name}
        </option>
      ))}
    </select>,
  );
}
