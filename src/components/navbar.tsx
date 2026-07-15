import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { KbdHint } from "@/components/ui/KbdHint";

export const Navbar = () => {
  const isMac =
    typeof navigator !== "undefined" &&
    /Mac|iPhone|iPad/.test(navigator.platform);

  return (
    <header className="relative z-50" role="banner">
      <nav aria-label="主導覽" className="mx-auto max-w-screen-xl px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* 品牌名稱 */}
          <a
            aria-label={`${siteConfig.name} - 首頁`}
            className="flex items-center gap-2.5 group focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-lg"
            href="/"
          >
            <div
              aria-hidden="true"
              className="w-7 h-7 rounded-[var(--radius-sm)] bg-accent flex items-center justify-center"
            >
              <svg fill="none" height="14" viewBox="0 0 14 14" width="14">
                <rect
                  fill="white"
                  fillOpacity="0.9"
                  height="4"
                  rx="1"
                  width="4"
                  x="1.5"
                  y="1.5"
                />
                <rect
                  fill="white"
                  fillOpacity="0.7"
                  height="4"
                  rx="1"
                  width="4"
                  x="8.5"
                  y="1.5"
                />
                <rect
                  fill="white"
                  fillOpacity="0.7"
                  height="4"
                  rx="1"
                  width="4"
                  x="1.5"
                  y="8.5"
                />
                <rect
                  fill="white"
                  fillOpacity="0.9"
                  height="4"
                  rx="1"
                  width="4"
                  x="8.5"
                  y="8.5"
                />
              </svg>
            </div>
            <span className="font-semibold text-sm text-[var(--text-primary)] group-hover:text-accent transition-colors duration-[var(--dur-fast)]">
              {siteConfig.name}
            </span>
          </a>

          {/* 右側操作 */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-[var(--text-tertiary)]">
              <KbdHint keys={[isMac ? "⌘" : "Ctrl", "↵"]} />
              <span>生成</span>
            </div>
            <ThemeSwitch />
          </div>
        </div>
      </nav>
    </header>
  );
};
