import { useState, useEffect } from "react";
import clsx from "clsx";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { KbdHint } from "@/components/ui/KbdHint";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      role="banner"
      className={clsx(
        'sticky top-0 z-50',
        'transition-all duration-[var(--dur-base)]',
        scrolled && 'glass border-b border-[var(--border-hairline)]',
      )}
    >
      <nav
        className="mx-auto max-w-screen-xl px-4 sm:px-6"
        aria-label="主導覽"
      >
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* 品牌名稱 */}
          <a
            href="/"
            className="flex items-center gap-2.5 group focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-lg"
            aria-label={`${siteConfig.name} - 首頁`}
          >
            <div
              className="w-7 h-7 rounded-[var(--radius-sm)] bg-accent flex items-center justify-center"
              aria-hidden="true"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1.5" y="1.5" width="4" height="4" rx="1" fill="white" fillOpacity="0.9"/>
                <rect x="8.5" y="1.5" width="4" height="4" rx="1" fill="white" fillOpacity="0.7"/>
                <rect x="1.5" y="8.5" width="4" height="4" rx="1" fill="white" fillOpacity="0.7"/>
                <rect x="8.5" y="8.5" width="4" height="4" rx="1" fill="white" fillOpacity="0.9"/>
              </svg>
            </div>
            <span className="font-semibold text-sm text-[var(--text-primary)] group-hover:text-accent transition-colors duration-[var(--dur-fast)]">
              {siteConfig.name}
            </span>
          </a>

          {/* 右側操作 */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-[var(--text-tertiary)]">
              <KbdHint keys={[isMac ? '⌘' : 'Ctrl', '↵']} />
              <span>生成</span>
            </div>
            <ThemeSwitch />
          </div>
        </div>
      </nav>
    </header>
  );
};
