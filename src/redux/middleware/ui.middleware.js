import { SIDEBAR_COLLAPSED, SWITCH_THEME_SIDEBAR } from '@constants';

import { storage } from '@helpers';

export const saveCollapsedInStorege = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === SIDEBAR_COLLAPSED) {
    storage.set('collapsed', action.payload);
  }
};

export const saveThemeInStorege = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === SWITCH_THEME_SIDEBAR) {
    storage.set('isDarkTheme', action.payload);
  }
};

export const uiMdl = [saveCollapsedInStorege, saveThemeInStorege];
