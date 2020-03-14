import { appType } from '@constants';
import { storage } from '@helpers';

const setLanguage = language => {
  storage.set('lang', language);

  return { type: appType.SET_LANGUAGE, language };
};

const setCollapsed = collapsed => {
  storage.set('collapsed', collapsed);

  return {
    type: appType.SET_COLLAPSED,
    collapsed
  };
};

const setTheme = data => {
  const theme = data ? 'dark' : 'light';
  storage.set('theme', theme);

  return { type: appType.SET_THEME, theme };
};

export { setLanguage, setCollapsed, setTheme };
