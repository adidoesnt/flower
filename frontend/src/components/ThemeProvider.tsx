import { ThemeContext } from "@/context/themeContext";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeProviderProps = {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
};

export type ThemeProviderState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

export const ThemeProvider = ({
    children,
    defaultTheme = "dark",
    storageKey = "theme",
}: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>(defaultTheme);

    useEffect(() => {
        const storedTheme = localStorage.getItem(storageKey);
        if (storedTheme) {
            setTheme(storedTheme as Theme);
        } else {
            setTheme(defaultTheme);
            localStorage.setItem(storageKey, defaultTheme);
        }
    }, [storageKey, setTheme, defaultTheme]);

    const setThemeState = (newTheme: Theme) => {
        setTheme(newTheme);
        localStorage.setItem(storageKey, newTheme);
    };

    return (
        <ThemeContext.Provider
            value={{
                theme,
                setTheme: setThemeState,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};
