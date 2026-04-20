import { useId } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface GlassSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: React.ReactNode;
  size?: 'sm' | 'md';
  disabled?: boolean;
  className?: string;
}

export function GlassSwitch({ checked, onChange, label, size = 'sm', disabled = false, className }: GlassSwitchProps) {
  const id = useId();
  const knobSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-[18px] h-[18px]';
  const offset = size === 'sm' ? 15 : 19;

  return (
    <label
      htmlFor={id}
      className={clsx(
        'inline-flex items-center gap-2.5 cursor-pointer select-none',
        disabled && 'opacity-50 pointer-events-none',
        className,
      )}
    >
      <input
        id={id}
        type="checkbox"
        role="switch"
        aria-checked={checked}
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />

      <motion.div
        animate={{ backgroundColor: checked ? '#30D158' : 'var(--border-hairline)' }}
        transition={{ duration: 0.18, ease: [0.32, 0.72, 0, 1] }}
        className={clsx(
          'relative flex-shrink-0 rounded-full',
          'focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-1',
          size === 'sm' ? 'w-9 h-5' : 'w-11 h-6',
        )}
        onClick={() => !disabled && onChange(!checked)}
        aria-hidden="true"
      >
        <motion.div
          animate={{ x: checked ? offset : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 35, mass: 0.8 }}
          className={clsx(
            'absolute top-[3px] rounded-full bg-white',
            'shadow-[0_1px_4px_rgba(0,0,0,0.25),0_1px_1px_rgba(0,0,0,0.12)]',
            knobSize,
          )}
        />
      </motion.div>

      {label && (
        <span className="text-sm font-medium text-[var(--text-primary)]">{label}</span>
      )}
    </label>
  );
}
