import { createContext, useContext, useState } from "react";
import { LIGHT, DARK } from "../constants/theme";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(true);
  const theme = dark ? DARK : LIGHT;

  return (
    <ThemeContext.Provider value={{ theme, dark, toggleDark: () => setDark((d) => !d) }}>
      {children}
    </ThemeContext.Provider>
  );
}

/** Hook to access the current theme object and toggle function */
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}