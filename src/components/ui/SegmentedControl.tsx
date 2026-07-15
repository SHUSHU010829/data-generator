import { useId } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface SegmentOption<T> {
  value: T;
  label: string;
}

interface SegmentedControlProps<T extends string | number> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  label?: string;
  size?: 'sm' | 'md';
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
}

export function SegmentedControl<T extends string | number>({
  options,
  value,
  onChange,
  label,
  size = 'md',
  fullWidth = false,
  className,
  disabled = false,
}: SegmentedControlProps<T>) {
  const layoutId = useId();

  return (
    <div className={clsx('flex flex-col gap-1.5', fullWidth && 'w-full', className)}>
      {label && (
        <span className="text-xs font-medium text-[var(--text-tertiary)] px-1">{label}</span>
      )}
      <div
        role="group"
        aria-label={label}
        className={clsx(
          'relative flex items-center',
          'rounded-[var(--radius-md)] p-1',
          'glass',
          fullWidth && 'w-full',
          disabled && 'opacity-50 pointer-events-none',
        )}
      >
        {options.map((option) => {
          const isSelected = option.value === value;
          return (
            <button
              key={String(option.value)}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(option.value)}
              className={clsx(
                'relative flex-1 text-center rounded-[var(--radius-sm)]',
                'font-medium transition-colors duration-[var(--dur-fast)]',
                'whitespace-nowrap',
                'focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-1',
                size === 'sm' ? 'text-xs py-1 px-2' : 'text-sm py-1.5 px-3',
                isSelected ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
              )}
            >
              {isSelected && (
                <motion.span
                  layoutId={layoutId}
                  className="absolute inset-0 rounded-[var(--radius-sm)] bg-[var(--surface-elevated)] border border-[var(--border-hairline)]"
                  style={{ zIndex: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 38,
                    mass: 0.8,
                  }}
                />
              )}
              <span className="relative z-10">{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
