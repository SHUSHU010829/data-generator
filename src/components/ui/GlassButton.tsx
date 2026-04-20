import { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import clsx from 'clsx';

interface GlassButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
}

const variantStyles = {
  primary: [
    'bg-accent text-white',
    'shadow-[var(--shadow-accent)]',
    'border border-white/20',
    'hover:brightness-110',
  ],
  secondary: [
    'glass text-[var(--text-primary)]',
    'hover:bg-[var(--surface-glass-strong)]',
  ],
  ghost: [
    'bg-transparent text-[var(--text-secondary)]',
    'border border-transparent',
    'hover:bg-[var(--surface-glass)] hover:text-[var(--text-primary)]',
  ],
  destructive: [
    'bg-danger text-white',
    'border border-white/20',
    'hover:brightness-110',
  ],
};

const sizeStyles = {
  sm: 'text-sm px-3 py-1.5 gap-1.5 min-h-[34px]',
  md: 'text-sm px-4 py-2 gap-2 min-h-[40px]',
  lg: 'text-base px-5 py-2.5 gap-2.5 min-h-[48px]',
};

export const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  function GlassButton(
    {
      children,
      variant = 'secondary',
      size = 'md',
      loading = false,
      iconLeft,
      iconRight,
      fullWidth = false,
      disabled,
      className,
      ...rest
    },
    ref,
  ) {
    const isDisabled = disabled || loading;

    return (
      <motion.button
        ref={ref}
        whileTap={isDisabled ? {} : { scale: 0.96 }}
        transition={{ duration: 0.12, ease: [0.32, 0.72, 0, 1] }}
        disabled={isDisabled}
        className={clsx(
          'inline-flex items-center justify-center',
          'rounded-[var(--radius-md)] font-medium',
          'transition-all duration-[var(--dur-fast)]',
          'focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2',
          'select-none cursor-pointer',
          'disabled:opacity-40 disabled:pointer-events-none',
          sizeStyles[size],
          variantStyles[variant],
          fullWidth && 'w-full',
          className,
        )}
        {...rest}
      >
        {loading ? (
          <svg
            className="animate-spin"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        ) : (
          <>
            {iconLeft && <span aria-hidden="true">{iconLeft}</span>}
            {children}
            {iconRight && <span aria-hidden="true">{iconRight}</span>}
          </>
        )}
      </motion.button>
    );
  },
);
