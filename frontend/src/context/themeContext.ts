import { ThemeProviderState } from "@/components/ThemeProvider";
import { createContext } from "react";

export const initialState: ThemeProviderState = {
  theme: "dark",
  setTheme: () => null,
};

export const ThemeContext = createContext<ThemeProviderState>(initialState);
