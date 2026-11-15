import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { LinkBase } from 'react-admin';
import { buttonClass } from './classes';

type Variant = keyof typeof buttonClass;

export function Button({
  variant = 'primary',
  type = 'button',
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button type={type} className={`${buttonClass[variant]} ${className}`} {...props} />;
}

export function LinkButton({ to, variant = 'primary', className = '', children, 'aria-label': ariaLabel }: { to: string; variant?: Variant; className?: string; children: ReactNode; 'aria-label'?: string }) {
  return (
    <LinkBase to={to} aria-label={ariaLabel} className={`${buttonClass[variant]} ${className}`}>
      {children}
    </LinkBase>
  );
}
