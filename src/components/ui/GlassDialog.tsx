import { useEffect, useRef, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';
import { X } from 'lucide-react';

interface GlassDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg';
}

const maxWidthMap = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl' };

export function GlassDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  maxWidth = 'md',
}: GlassDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  /* ESC 關閉 */
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onOpenChange(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onOpenChange]);

  /* 防止 body 滾動，開啟時 focus 到 dialog */
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const firstFocusable = dialogRef.current?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    firstFocusable?.focus();
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[1000] bg-black/40"
            onClick={() => onOpenChange(false)}
            aria-hidden="true"
          />

          {/* Dialog 面板 */}
          <motion.div
            key="dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
            aria-describedby={description ? 'dialog-desc' : undefined}
            ref={dialogRef}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className={clsx(
              'fixed z-[1001] inset-x-4 top-1/2 -translate-y-1/2',
              'sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-full',
              maxWidthMap[maxWidth],
              'glass-strong rounded-[var(--radius-xl)]',
              'flex flex-col max-h-[85dvh]',
            )}
          >
            {/* 標題列 */}
            <div className="flex items-center justify-between px-5 pt-5 pb-4 flex-shrink-0">
              <div>
                <h2 id="dialog-title" className="text-base font-semibold text-[var(--text-primary)]">
                  {title}
                </h2>
                {description && (
                  <p id="dialog-desc" className="text-xs text-[var(--text-tertiary)] mt-0.5">
                    {description}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                aria-label="關閉"
                className="flex items-center justify-center w-8 h-8 rounded-[var(--radius-sm)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-elevated)] transition-colors focus-visible:outline-2 focus-visible:outline-accent"
              >
                <X size={16} strokeWidth={2} aria-hidden="true" />
              </button>
            </div>

            <div className="h-px bg-[var(--border-hairline)] mx-5 flex-shrink-0" />

            {/* 可滾動內容 */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <>
                <div className="h-px bg-[var(--border-hairline)] mx-5 flex-shrink-0" />
                <div className="flex justify-end gap-2 px-5 py-4 flex-shrink-0">
                  {footer}
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
