export type ThemeName = "vegas" | "blackjack" | "tiles";

export type Theme = {
  name: ThemeName;
  label: string;
  bg: string;
  bgGlow: string;
  surface: string;
  surfaceMuted: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
  accentSoft: string;
  accentContrast: string;
  border: string;
  buttonBg: string;
  positive: string;
  positiveSoft: string;
  negative: string;
  negativeSoft: string;
  floatingBg: string;
  overlay: string;
  shadow: string;
};

export const DEFAULT_THEME: ThemeName = "vegas";
export const THEME_STORAGE_KEY = "lastround-theme";

export const themes: Record<ThemeName, Theme> = {
  vegas: {
    name: "vegas",
    label: "Vegas",
    bg: "#050505",
    bgGlow: "rgba(250,204,21,0.18)",
    surface:
      "linear-gradient(180deg, rgba(24,24,27,0.96) 0%, rgba(10,10,10,0.98) 100%)",
    surfaceMuted: "rgba(255,255,255,0.03)",
    textPrimary: "#fafafa",
    textSecondary: "#d4d4d8",
    textMuted: "#71717a",
    accent: "#facc15",
    accentSoft: "rgba(250,204,21,0.12)",
    accentContrast: "#090909",
    border: "rgba(113,63,18,0.55)",
    buttonBg: "#facc15",
    positive: "#a7f3d0",
    positiveSoft: "#052e2b",
    negative: "#fecdd3",
    negativeSoft: "#3b1017",
    floatingBg: "rgba(10,10,10,0.82)",
    overlay: "rgba(0,0,0,0.78)",
    shadow: "0 18px 50px rgba(0,0,0,0.45)",
  },
  blackjack: {
    name: "blackjack",
    label: "Blackjack",
    bg: "#040404",
    bgGlow: "rgba(226,232,240,0.12)",
    surface:
      "linear-gradient(180deg, rgba(23,23,23,0.96) 0%, rgba(8,8,8,0.98) 100%)",
    surfaceMuted: "rgba(255,255,255,0.04)",
    textPrimary: "#f8fafc",
    textSecondary: "#d4d4d8",
    textMuted: "#94a3b8",
    accent: "#e2e8f0",
    accentSoft: "rgba(226,232,240,0.12)",
    accentContrast: "#020617",
    border: "rgba(148,163,184,0.42)",
    buttonBg: "#e2e8f0",
    positive: "#d1fae5",
    positiveSoft: "#0b2b2d",
    negative: "#fecaca",
    negativeSoft: "#32161d",
    floatingBg: "rgba(15,23,42,0.84)",
    overlay: "rgba(2,6,23,0.76)",
    shadow: "0 18px 50px rgba(2,6,23,0.42)",
  },
  tiles: {
    name: "tiles",
    label: "Tiles",
    bg: "#120406",
    bgGlow: "rgba(214,40,57,0.14)",
    surface:
      "linear-gradient(180deg, rgba(32,8,12,0.96) 0%, rgba(18,4,6,0.98) 100%)",
    surfaceMuted: "rgba(255,255,255,0.03)",
    textPrimary: "#fff5f5",
    textSecondary: "#ead0d4",
    textMuted: "#b17b84",
    accent: "#A4162A",
    accentSoft: "rgba(164,22,42,0.18)",
    accentContrast: "#fff5f5",
    border: "rgba(122,15,30,0.58)",
    buttonBg: "#D62839",
    positive: "#d1fae5",
    positiveSoft: "#052e2b",
    negative: "#ffe4e6",
    negativeSoft: "#7A0F1E",
    floatingBg: "rgba(23,5,8,0.86)",
    overlay: "rgba(12,2,5,0.8)",
    shadow: "0 18px 50px rgba(48,8,14,0.42)",
  },
};
