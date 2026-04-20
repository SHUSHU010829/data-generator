import { useState, useCallback, useRef, useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';
import { ToastContext, ToastItem, ToastOptions } from '@/hooks/useToast';

const variantConfig = {
  success: { icon: '✓', color: 'text-success', bg: 'bg-success/10' },
  error: { icon: '✕', color: 'text-danger', bg: 'bg-danger/10' },
  warning: { icon: '!', color: 'text-warning', bg: 'bg-warning/10' },
  info: { icon: 'i', color: 'text-accent', bg: 'bg-accent/10' },
};

function ToastCard({ item, onDismiss }: { item: ToastItem; onDismiss: () => void }) {
  const config = variantConfig[item.variant];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94, y: -8 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={clsx(
        'flex items-start gap-3 p-4 min-w-[280px] max-w-[360px]',
        'glass-strong rounded-[var(--radius-lg)]',
        'cursor-pointer',
      )}
      onClick={onDismiss}
    >
      <span
        className={clsx(
          'flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold',
          config.bg,
          config.color,
        )}
        aria-hidden="true"
      >
        {config.icon}
      </span>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[var(--text-primary)]">{item.title}</p>
        {item.description && (
          <p className="mt-0.5 text-xs text-[var(--text-secondary)] leading-relaxed">
            {item.description}
          </p>
        )}
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); onDismiss(); }}
        className="flex-shrink-0 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
        aria-label="關閉通知"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </motion.div>
  );
}

let uid = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const toast = useCallback((options: ToastOptions) => {
    const id = String(++uid);
    const item: ToastItem = {
      id,
      title: options.title,
      description: options.description,
      variant: options.variant ?? 'info',
      duration: options.duration ?? 4000,
    };
    setToasts(prev => [...prev, item]);
    const timer = setTimeout(() => dismiss(id), item.duration);
    timers.current.set(id, timer);
  }, [dismiss]);

  useEffect(() => {
    const current = timers.current;
    return () => current.forEach(clearTimeout);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      {createPortal(
        <div
          className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none"
          aria-label="通知"
        >
          <AnimatePresence mode="popLayout">
            {toasts.map(item => (
              <div key={item.id} className="pointer-events-auto">
                <ToastCard item={item} onDismiss={() => dismiss(item.id)} />
              </div>
            ))}
          </AnimatePresence>
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
}
