import clsx from 'clsx';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center py-16 px-6 text-center',
        className,
      )}
    >
      {/* 圖示 */}
      {icon && (
        <div
          className="flex items-center justify-center w-12 h-12 mb-5 rounded-[var(--radius-lg)] bg-[var(--surface-elevated)] border border-[var(--border-hairline)] text-[var(--text-tertiary)]"
          aria-hidden="true"
        >
          {icon}
        </div>
      )}

      {/* 標題 */}
      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
        {title}
      </h3>

      {/* 副標 */}
      {description && (
        <p className="text-sm text-[var(--text-secondary)] max-w-[280px] leading-relaxed mb-6">
          {description}
        </p>
      )}

      {/* CTA */}
      {action && <div>{action}</div>}
    </div>
  );
}
