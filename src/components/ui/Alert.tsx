import clsx from 'clsx';
import { TriangleAlert, Info, CircleCheck, CircleX, type LucideIcon } from 'lucide-react';

interface AlertProps {
  variant?: 'warning' | 'info' | 'success' | 'error';
  title?: string;
  description: string;
  className?: string;
}

const variantConfig: Record<
  NonNullable<AlertProps['variant']>,
  { icon: LucideIcon; color: string; bg: string; border: string }
> = {
  warning: {
    icon: TriangleAlert,
    color: 'text-warning',
    bg: 'bg-warning/8',
    border: 'border-warning/20',
  },
  info: {
    icon: Info,
    color: 'text-accent',
    bg: 'bg-accent/8',
    border: 'border-accent/20',
  },
  success: {
    icon: CircleCheck,
    color: 'text-success',
    bg: 'bg-success/8',
    border: 'border-success/20',
  },
  error: {
    icon: CircleX,
    color: 'text-danger',
    bg: 'bg-danger/8',
    border: 'border-danger/20',
  },
};

export function Alert({ variant = 'info', title, description, className }: AlertProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div
      role="alert"
      className={clsx(
        'flex gap-3 p-4 rounded-[var(--radius-md)]',
        'border',
        config.bg,
        config.border,
        className,
      )}
    >
      <span className={clsx('flex-shrink-0 mt-0.5', config.color)}>
        <Icon size={16} strokeWidth={2} aria-hidden="true" />
      </span>
      <div>
        {title && (
          <p className={clsx('text-sm font-semibold mb-0.5', config.color)}>{title}</p>
        )}
        <p className="text-xs leading-relaxed text-[var(--text-secondary)]">{description}</p>
      </div>
    </div>
  );
}
