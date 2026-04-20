"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
} from "react";
import {
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  themes,
  type Theme,
  type ThemeName,
} from "@/app/lib/themes";
import ThemeSwitcher from "./ThemeSwitcher";

type ThemeContextValue = {
  theme: Theme;
  themeName: ThemeName;
  setThemeName: (themeName: ThemeName) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getInitialThemeName() {
  if (typeof window === "undefined") {
    return DEFAULT_THEME;
  }

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme && savedTheme in themes) {
    return savedTheme as ThemeName;
  }

  return DEFAULT_THEME;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeName, setThemeName] = useState<ThemeName>(() =>
    getInitialThemeName()
  );

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, themeName);
  }, [themeName]);

  const value = useMemo(
    () => ({
      theme: themes[themeName],
      themeName,
      setThemeName,
    }),
    [themeName]
  );

  const themeStyle = {
    "--theme-bg": value.theme.bg,
    "--theme-bg-glow": value.theme.bgGlow,
    "--theme-surface": value.theme.surface,
    "--theme-surface-muted": value.theme.surfaceMuted,
    "--theme-text-primary": value.theme.textPrimary,
    "--theme-text-secondary": value.theme.textSecondary,
    "--theme-text-muted": value.theme.textMuted,
    "--theme-accent": value.theme.accent,
    "--theme-accent-soft": value.theme.accentSoft,
    "--theme-accent-contrast": value.theme.accentContrast,
    "--theme-border": value.theme.border,
    "--theme-button-bg": value.theme.buttonBg,
    "--theme-positive": value.theme.positive,
    "--theme-positive-soft": value.theme.positiveSoft,
    "--theme-negative": value.theme.negative,
    "--theme-negative-soft": value.theme.negativeSoft,
    "--theme-floating-bg": value.theme.floatingBg,
    "--theme-overlay": value.theme.overlay,
    "--theme-shadow": value.theme.shadow,
  } as CSSProperties;

  return (
    <ThemeContext.Provider value={value}>
      <div
        style={themeStyle}
        className="min-h-full bg-[var(--theme-bg)] text-[var(--theme-text-primary)]"
      >
        <ThemeSwitcher />
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
