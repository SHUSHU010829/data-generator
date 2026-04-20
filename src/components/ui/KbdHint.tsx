import clsx from 'clsx';

interface KbdHintProps {
  keys: string[];
  className?: string;
}

export function KbdHint({ keys, className }: KbdHintProps) {
  return (
    <span
      className={clsx('inline-flex items-center gap-1', className)}
      aria-label={`快捷鍵：${keys.join(' + ')}`}
    >
      {keys.map((key, i) => (
        <kbd
          key={i}
          className={clsx(
            'inline-flex items-center justify-center',
            'min-w-[20px] h-5 px-1',
            'text-[10px] font-medium text-[var(--text-tertiary)]',
            'rounded border border-[var(--border-hairline)]',
            'bg-[var(--surface-glass)]',
          )}
        >
          {key}
        </kbd>
      ))}
    </span>
  );
}
