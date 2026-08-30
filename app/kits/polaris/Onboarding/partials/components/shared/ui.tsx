import { useId, type ButtonHTMLAttributes, type CSSProperties, type ReactNode } from 'react';
import { cn } from '../../utils';

export function Card({
  className,
  style,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div
      style={style}
      className={cn(
        'rounded-2xl border border-gray-200 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]',
        className
      )}
    >
      {children}
    </div>
  );
}

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    'bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 shadow-sm disabled:bg-gray-200 disabled:text-gray-400',
  secondary:
    'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 active:bg-gray-100 disabled:text-gray-300',
  ghost: 'text-gray-500 hover:text-gray-800 hover:bg-gray-100 disabled:text-gray-300',
};

export function Button({ variant = 'primary', className, children, ...rest }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-medium',
        'transition-all duration-150 ease-out active:scale-[0.98]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:active:scale-100',
        buttonVariants[variant],
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export function Badge({
  tone = 'green',
  children,
}: {
  tone?: 'green' | 'gray' | 'amber';
  children: ReactNode;
}) {
  const tones: Record<string, string> = {
    green: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20',
    gray: 'bg-gray-100 text-gray-600 ring-1 ring-inset ring-gray-500/10',
    amber: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
        tones[tone]
      )}
    >
      {children}
    </span>
  );
}

export function IconTile({
  icon,
  tone = 'green',
  className,
}: {
  icon: ReactNode;
  tone?: 'green' | 'gray';
  className?: string;
}) {
  const tones: Record<string, string> = {
    green: 'bg-emerald-50 text-emerald-600',
    gray: 'bg-gray-100 text-gray-500',
  };
  return (
    <div
      className={cn(
        'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
        tones[tone],
        className
      )}
    >
      {icon}
    </div>
  );
}

export function ToggleSwitch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  const id = useId();
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={cn(
        'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2',
        checked ? 'bg-emerald-600' : 'bg-gray-200'
      )}
    >
      <span
        className="inline-block transform rounded-full bg-white shadow transition-transform duration-200 ease-out"
        style={{ height: 18, width: 18, transform: checked ? 'translateX(22px)' : 'translateX(3px)' }}
      />
    </button>
  );
}
