import { create } from 'zustand';

/**
 * Theme state for the dark/light user toggle.
 *
 * The `.dark` class on `<html>` is the single source of truth for styling:
 * it is applied before React boots by the inline script in index.html (which
 * also honours the OS preference), and this store mirrors it so any number of
 * toggle buttons across the app stay in sync and never fight the document.
 */
export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'kapit-theme';

interface ThemeState {
  theme: Theme;
  toggle: () => void;
}

/** applied side effect set — class toggle + persistence + React state */
const applyTheme = (theme: Theme) => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage can be unavailable (private mode etc.); the toggle still works
    // for the session, it just will not persist.
  }
};

export const useTheme = create<ThemeState>((set) => ({
  // Seeded from the document, which the no-flash script set before this module loaded.
  theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
  toggle: () =>
    set((state) => {
      const next: Theme = state.theme === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      return { theme: next };
    }),
}));

/**
 * Resolve a theme without flipping state — used by markup that renders itself
 * differently per theme but never changes it (e.g. decorative backdrops).
 */
export const readTheme = (): Theme =>
  document.documentElement.classList.contains('dark') ? 'dark' : 'light';
