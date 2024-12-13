import { ThemeContext } from "@/context/themeContext";
import { useContext } from "react";

export const useTheme = () => useContext(ThemeContext);
