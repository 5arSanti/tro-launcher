import { createContext, useContext } from "react";

export type Theme = {
  name: string;
  bg: string;
  surface: string;
  line: string;
  text: string;
  muted: string;
  accent: string;
  cold: string;
  valid: string;
};

export const NOCHE: Theme = {
  name: "noche",
  bg: "#0A1F2E",
  surface: "#11324A",
  line: "#2B5370",
  text: "#F3F9FD",
  muted: "#8EAAC0",
  accent: "#00A8FF",
  cold: "#FFB547",
  valid: "#34D399",
};

export const AIRE: Theme = {
  name: "aire",
  bg: "#F3F9FD",
  surface: "#DDEBF5",
  line: "#B4CEE1",
  text: "#0A1A26",
  muted: "#587083",
  accent: "#0B7BC0",
  cold: "#F2643A",
  valid: "#1F8A5B",
};

export const BLANCO: Theme = {
  name: "blanco",
  bg: "#FFFFFF",
  surface: "#EEF1F4",
  line: "#CDD3DA",
  text: "#000000",
  muted: "#6B7280",
  accent: "#0094E0",
  cold: "#F2643A",
  valid: "#1F8A5B",
};

export const AZUL: Theme = {
  name: "azul",
  bg: "#1480B8",
  surface: "#1F8FC8",
  line: "#5AAEDB",
  text: "#FFFFFF",
  muted: "#CBE6F5",
  accent: "#FFD166",
  cold: "#0A1F2E",
  valid: "#B6F5D3",
};

export const PROFUNDO: Theme = {
  name: "profundo",
  bg: "#0B4F78",
  surface: "#135E8C",
  line: "#3E7FA8",
  text: "#F3F9FD",
  muted: "#A9CBE0",
  accent: "#FF8A5B",
  cold: "#7FDBFF",
  valid: "#5EEAA8",
};

/** Escena 1…10. */
export const SCENE_THEMES: Theme[] = [
  NOCHE,
  BLANCO,
  AIRE,
  AZUL,
  BLANCO,
  NOCHE,
  AIRE,
  PROFUNDO,
  BLANCO,
  NOCHE,
];

export const themeOf = (n: number) => SCENE_THEMES[n - 1];

/** Cortinilla común a todas las escenas para que el empalme sea continuo. */
export const WIPE = { under: "#000000", top: "#00A8FF" };

export const ThemeContext = createContext<Theme>(BLANCO);

export const useTheme = () => useContext(ThemeContext);
