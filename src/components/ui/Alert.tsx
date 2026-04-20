import clsx from 'clsx';

interface AlertProps {
  variant?: 'warning' | 'info' | 'success' | 'error';
  title?: string;
  description: string;
  className?: string;
}

const variantConfig = {
  warning: {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 1.5L14.5 13.5H1.5L8 1.5Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 6V9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
        <circle cx="8" cy="11.5" r="0.75" fill="currentColor"/>
      </svg>
    ),
    color: 'text-warning',
    bg: 'bg-warning/8',
    border: 'border-warning/20',
  },
  info: {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.25"/>
        <path d="M8 7V12" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
        <circle cx="8" cy="4.5" r="0.75" fill="currentColor"/>
      </svg>
    ),
    color: 'text-accent',
    bg: 'bg-accent/8',
    border: 'border-accent/20',
  },
  success: {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.25"/>
        <path d="M5 8L7 10L11 6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: 'text-success',
    bg: 'bg-success/8',
    border: 'border-success/20',
  },
  error: {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.25"/>
        <path d="M5.5 5.5L10.5 10.5M10.5 5.5L5.5 10.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
      </svg>
    ),
    color: 'text-danger',
    bg: 'bg-danger/8',
    border: 'border-danger/20',
  },
};

export function Alert({ variant = 'info', title, description, className }: AlertProps) {
  const config = variantConfig[variant];

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
      <span className={clsx('flex-shrink-0 mt-0.5', config.color)}>{config.icon}</span>
      <div>
        {title && (
          <p className={clsx('text-sm font-semibold mb-0.5', config.color)}>{title}</p>
        )}
        <p className="text-xs leading-relaxed text-[var(--text-secondary)]">{description}</p>
      </div>
    </div>
  );
}
