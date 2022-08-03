import { themeColors } from './constants';

export const applyTheme = (theme) => {
  const root = document.querySelector(':root');
  root.style.setProperty('--card-theme-color', themeColors[theme]);
};
