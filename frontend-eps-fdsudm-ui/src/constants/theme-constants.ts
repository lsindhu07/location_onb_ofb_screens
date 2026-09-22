
export const THEME_MODE_MAP = {
  dark: "em-theme--dark",
  light: "em-theme--light",
} as const;

export type ThemeModeType = (typeof THEME_MODE_MAP)[keyof typeof THEME_MODE_MAP];
export type ThemeModeKey = keyof typeof THEME_MODE_MAP;
