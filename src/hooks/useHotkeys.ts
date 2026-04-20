import { useEffect, useRef } from 'react';

type HotkeyCombo = string; // e.g. 'mod+enter', 'ctrl+k'

function matchesEvent(event: KeyboardEvent, combo: HotkeyCombo): boolean {
  const parts = combo.toLowerCase().split('+');
  const key = parts.at(-1) ?? '';
  const mods = parts.slice(0, -1);

  if (event.key.toLowerCase() !== key) return false;
  for (const mod of mods) {
    if (mod === 'mod' && !event.metaKey && !event.ctrlKey) return false;
    if (mod === 'ctrl' && !event.ctrlKey) return false;
    if (mod === 'alt' && !event.altKey) return false;
    if (mod === 'shift' && !event.shiftKey) return false;
  }
  return true;
}

export function useHotkeys(combo: HotkeyCombo, handler: () => void) {
  // 用 ref 存最新的 handler，避免 stale closure
  const handlerRef = useRef(handler);
  useEffect(() => {
    handlerRef.current = handler;
  });

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      // 在輸入框中不觸發
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return;
      if (matchesEvent(event, combo)) {
        event.preventDefault();
        handlerRef.current();
      }
    };
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [combo]);
}
