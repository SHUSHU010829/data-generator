import { forwardRef, useState, useId } from 'react';
import clsx from 'clsx';

interface GlassInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'prefix'> {
  label: string;
  description?: string;
  error?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  wrapperClassName?: string;
  /* 標籤位置：floating 為框內浮動標籤；outside 為框外上方標籤（與 SegmentedControl 對齊用） */
  labelPlacement?: 'floating' | 'outside';
}

export const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  function GlassInput(
    { label, description, error, prefix, suffix, className, wrapperClassName, id: externalId, labelPlacement = 'floating', ...rest },
    ref,
  ) {
    const autoId = useId();
    const id = externalId ?? autoId;
    const descId = `${id}-desc`;
    const errId = `${id}-err`;
    const [focused, setFocused] = useState(false);
    const hasValue = rest.value !== '' && rest.value !== undefined && rest.value !== null;
    const isOutside = labelPlacement === 'outside';

    return (
      <div className={clsx('flex flex-col', isOutside ? 'gap-1.5' : 'gap-1', wrapperClassName)}>
        {/* 框外標籤：樣式對齊 SegmentedControl 的標籤 */}
        {isOutside && (
          <label htmlFor={id} className="px-1 text-xs font-medium text-[var(--text-tertiary)]">
            {label}
          </label>
        )}

        <div
          className={clsx(
            'relative flex items-center rounded-[var(--radius-md)]',
            'glass',
            'transition-all duration-[var(--dur-fast)]',
            focused && 'ring-2 ring-accent ring-offset-0 border-accent',
            error && 'ring-2 ring-danger border-danger',
            rest.disabled && 'opacity-50 pointer-events-none',
          )}
        >
          {prefix && (
            <span className="pl-3 text-[var(--text-tertiary)] flex-shrink-0" aria-hidden="true">
              {prefix}
            </span>
          )}
          <div className="relative flex-1">
            {/* 浮動標籤（僅 floating 模式） */}
            {!isOutside && (
              <label
                htmlFor={id}
                className={clsx(
                  'absolute left-3 pointer-events-none',
                  'transition-all duration-[var(--dur-fast)] ease-[var(--ease-ios)]',
                  focused || hasValue
                    ? 'top-1.5 text-[10px] font-medium text-[var(--text-tertiary)]'
                    : 'top-1/2 -translate-y-1/2 text-sm text-[var(--text-secondary)]',
                  focused && 'text-accent',
                )}
              >
                {label}
              </label>
            )}
            <input
              ref={ref}
              id={id}
              aria-describedby={
                [description && descId, error && errId].filter(Boolean).join(' ') || undefined
              }
              aria-invalid={Boolean(error)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className={clsx(
                'w-full bg-transparent outline-none px-3 text-sm',
                'text-[var(--text-primary)]',
                isOutside ? 'min-h-[40px] py-2' : 'pt-5 pb-1.5 min-h-[52px] placeholder-transparent',
                className,
              )}
              {...rest}
            />
          </div>
          {suffix && (
            <span className="pr-3 text-[var(--text-tertiary)] flex-shrink-0" aria-hidden="true">
              {suffix}
            </span>
          )}
        </div>
        {description && !error && (
          <p id={descId} className="px-1 text-xs text-[var(--text-tertiary)]">
            {description}
          </p>
        )}
        {error && (
          <p id={errId} className="px-1 text-xs text-danger" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);
