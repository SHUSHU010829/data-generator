import { motion } from 'framer-motion';
import clsx from 'clsx';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon = '📊', title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center py-16 px-6 text-center',
        className,
      )}
    >
      {/* 浮動圖示 */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="text-5xl mb-5 select-none"
        aria-hidden="true"
      >
        {icon}
      </motion.div>

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
