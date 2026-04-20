import clsx from 'clsx';

interface ChipProps {
  children: React.ReactNode;
  color?: 'blue' | 'pink' | 'green' | 'orange' | 'default';
  size?: 'sm' | 'md';
  className?: string;
}

const colorStyles = {
  blue: 'bg-accent/15 text-accent',
  pink: 'bg-[#FF375F]/15 text-[#FF375F]',
  green: 'bg-success/15 text-success',
  orange: 'bg-warning/15 text-warning',
  default: 'bg-[var(--surface-glass)] text-[var(--text-secondary)]',
};

const sizeStyles = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-1',
};

export function Chip({ children, color = 'default', size = 'sm', className }: ChipProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center font-medium rounded-full',
        colorStyles[color],
        sizeStyles[size],
        className,
      )}
    >
      {children}
    </span>
  );
}
