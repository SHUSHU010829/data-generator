import { forwardRef } from 'react';
import clsx from 'clsx';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'strong' | 'flat';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
  as?: React.ElementType;
}

const paddingMap = {
  none: '',
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-6',
};

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  function GlassCard(
    { variant = 'default', padding = 'md', interactive = false, as: Tag = 'div', className, children, ...rest },
    ref,
  ) {
    return (
      <Tag
        ref={ref}
        className={clsx(
          'rounded-[var(--radius-lg)] transition-all duration-[var(--dur-base)]',
          variant === 'default' && 'glass',
          variant === 'strong' && 'glass-strong',
          variant === 'flat' && [
            'border border-[var(--border-hairline)]',
            'bg-[var(--surface-glass)]',
          ],
          paddingMap[padding],
          interactive && 'glass-interactive cursor-pointer',
          className,
        )}
        {...rest}
      >
        {children}
      </Tag>
    );
  },
);
