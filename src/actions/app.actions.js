import { appType } from '@constants';
import { storage } from '@helpers';

const setLanguage = data => {
  storage.set('lang', data);
  return { type: appType.SET_LANGUAGE, data };
};

const setCollapsed = collapsed => {
  storage.set('collapsed', collapsed);

  return {
    type: appType.SET_COLLAPSED,
    collapsed
  };
};

const setTheme = value => {
  const theme = value ? 'dark' : 'light';
  storage.set('theme', value);

  return { type: appType.SET_THEME, theme };
};

export { setLanguage, setCollapsed, setTheme };
