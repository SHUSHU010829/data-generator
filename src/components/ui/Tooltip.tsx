import { useState, useRef, useEffect, useCallback, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export function Tooltip({ content, children, placement = 'top', delay = 300, className }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLSpanElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipId = useRef(`tooltip-${Math.random().toString(36).slice(2)}`);

  const show = useCallback(() => {
    timerRef.current = setTimeout(() => {
      if (!triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      const offset = 8;

      let x = rect.left + rect.width / 2;
      let y = 0;

      if (placement === 'top') y = rect.top - offset;
      if (placement === 'bottom') y = rect.bottom + offset;
      if (placement === 'left') { x = rect.left - offset; y = rect.top + rect.height / 2; }
      if (placement === 'right') { x = rect.right + offset; y = rect.top + rect.height / 2; }

      setCoords({ x, y });
      setVisible(true);
    }, delay);
  }, [delay, placement]);

  const hide = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') hide(); };
    if (visible) window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [visible, hide]);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const getTransform = () => {
    if (placement === 'top') return 'translate(-50%, -100%)';
    if (placement === 'bottom') return 'translate(-50%, 0)';
    if (placement === 'left') return 'translate(-100%, -50%)';
    if (placement === 'right') return 'translate(0, -50%)';
    return 'translate(-50%, -100%)';
  };

  const getAnimateY = () => {
    if (placement === 'top') return { y: -4 };
    if (placement === 'bottom') return { y: 4 };
    return { y: 0 };
  };

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        aria-describedby={visible ? tooltipId.current : undefined}
        className={clsx('inline-block', className)}
      >
        {children}
      </span>

      {createPortal(
        <AnimatePresence>
          {visible && (
            <motion.div
              id={tooltipId.current}
              role="tooltip"
              initial={{ opacity: 0, ...getAnimateY() }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, ...getAnimateY() }}
              transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'fixed',
                left: coords.x,
                top: coords.y,
                transform: getTransform(),
                zIndex: 9998,
                pointerEvents: 'none',
              }}
            >
              <div
                className={clsx(
                  'glass-strong rounded-[var(--radius-sm)] px-2.5 py-1.5',
                  'text-xs text-[var(--text-primary)] font-medium',
                  'whitespace-nowrap',
                )}
              >
                {content}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}
