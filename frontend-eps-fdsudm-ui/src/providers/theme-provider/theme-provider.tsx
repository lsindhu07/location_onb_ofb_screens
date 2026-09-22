"use client";

import { THEME_MODE_MAP, type ThemeModeKey, type ThemeModeType } from "@/constants/theme-constants";
import { getThemeFromStorage } from "@/utils/common-methods";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
  theme: ThemeModeKey | undefined;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeModeKey | undefined>(undefined);
  const [prevThemeKey, setPrevKeyTheme] = useState<ThemeModeKey>("light");

  const applyThemeColor = (newThemeColor: string) => {
    document.documentElement.setAttribute("data-theme-color", newThemeColor);
    document.body.classList.add(newThemeColor);

  };

  const applyThemeMode = (currentThemeKey: ThemeModeKey) => {
    const currentTheme: ThemeModeType = THEME_MODE_MAP[currentThemeKey];
    const prevTheme: ThemeModeType = THEME_MODE_MAP[prevThemeKey];

    document.documentElement.setAttribute("data-theme-mode", currentTheme);

    if (currentTheme !== prevTheme) {
      document.body.classList.add(currentTheme);
      document.body.classList.add(currentThemeKey);
      document.body.classList.remove(prevTheme);
      document.body.classList.remove(prevThemeKey);
    } else {
      document.body.classList.remove(prevTheme);
      document.body.classList.remove(prevThemeKey);
    }

    // if (currentThemeKey === "dark") {
    //   document.body.classList.add(themeClass);
    // } else {
    //   document.body.classList.remove(themeClass);
    // }

    setPrevKeyTheme(currentThemeKey);
  };

  useEffect(() => {
    const initial = getThemeFromStorage();
    // I just hard-coded this here for now
    // As we dont really need dynamic color theme swaps
    const initalThemeColor = "em-theme--red";

    setTheme(initial);
    setPrevKeyTheme("light");
    applyThemeMode(initial);
    applyThemeColor(initalThemeColor);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyThemeMode(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}{" "}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme error");
  return context;
};
