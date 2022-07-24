import {  createTheme } from "@mui/material/styles";
import { baseThemeOptions } from "./base-theme";
import { darkThemeOptions } from "./dark-theme";
import { lightThemeOptions } from "./light-theme";

export const createMyTheme = (config) => {
  let theme = createTheme(baseThemeOptions, config.mode === 'dark' ? darkThemeOptions : lightThemeOptions);
  return theme;
};
