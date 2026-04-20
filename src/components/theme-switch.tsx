import { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { useTheme } from "@/hooks/useTheme";
import { MoonFilledIcon, SunFilledIcon } from "@/components/icons";

interface ThemeSwitchProps {
  className?: string;
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "切換至淺色模式" : "切換至深色模式"}
      className={clsx(
        "relative flex items-center justify-center",
        "w-9 h-9 rounded-[var(--radius-md)]",
        "glass-interactive",
        "text-[var(--text-secondary)]",
        "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 30, scale: 0.8 }}
            transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="flex"
            aria-hidden="true"
          >
            <MoonFilledIcon size={18} />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: 30, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -30, scale: 0.8 }}
            transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="flex"
            aria-hidden="true"
          >
            <SunFilledIcon size={18} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};
