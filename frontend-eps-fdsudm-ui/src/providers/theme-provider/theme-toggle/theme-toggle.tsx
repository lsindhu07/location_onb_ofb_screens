import { useEffect, useState } from "react";
import { useTheme } from "../theme-provider";
import { Switch } from "@emorg-prd/standard-react";
import { getThemeFromStorage } from "@/utils/common-methods";
// import styles from "./theme-toggle.module.css"
import type { ThemeModeKey } from "@/constants/theme-constants";


export const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    
    const [isToggle, setIsToggle] = useState(() => {
        const initialTheme = getThemeFromStorage();
        return initialTheme === "dark";
    });
    
    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return null;
    }

    const handleToggle = () => {
        console.log("HandleToggle: ", isToggle)
        setIsToggle(!isToggle)
        toggleTheme()
    }

    return (
        <div >
            <Switch
                checked={isToggle}
                id="theme-toggle-1"
                label={"Dark Mode"}
                onChange={() => {handleToggle()  }}
                stateLabel
            />
        </div>

    )
}

