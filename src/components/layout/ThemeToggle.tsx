import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../providers/theme';
import { cn } from '../../lib/utils';

interface ThemeToggleProps {
  className?: string;
}

/**
 * Small icon button that flips the app's dark/light theme via the shared
 * theme store, so every mounted toggle (desktop header + mobile menu) stays
 * consistent. The initial value comes from index.html's no-flash script,
 * which applies the stored theme (or the OS preference) before paint.
 */
const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      className={cn(
        'inline-flex items-center justify-center rounded-full p-2 text-kapit-secondary',
        'bg-white/10 transition-all duration-200 hover:scale-105 hover:bg-white/20 active:scale-95',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kapit-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-kapit-primary',
        className
      )}
    >
      {isDark ? <Sun size={18} aria-hidden /> : <Moon size={18} aria-hidden />}
    </button>
  );
};

export default ThemeToggle;
