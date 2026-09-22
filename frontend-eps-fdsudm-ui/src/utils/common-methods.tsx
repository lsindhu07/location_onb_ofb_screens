import type { ThemeModeKey } from "@/constants/theme-constants";

export function getThemeFromStorage() {
    const saved = localStorage.getItem("theme") as ThemeModeKey | null;
    const system = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    const initial = saved || system;
    
    return initial
}