import { appType } from '@constants';
import en from '@locales/en/messages.json';

import { RoutesList, RenderList } from '@routes';

const initialState = {
  collapsed: false,
  language: 'en',
  pathName: '',
  catalogs: { en },
  theme: 'dark',
  routesList: RoutesList('en'),
  renderList: RenderList('en')
};

export const app = (state = initialState, action = {}) => {
  switch (action.type) {
    case appType.SET_LANGUAGE:
      const { language, catalog } = action.data;
      return {
        ...state,
        language: language,
        catalogs: { [language]: catalog },
        routesList: RoutesList(language),
        renderList: RenderList(language)
      };
    case appType.SET_COLLAPSED:
      return {
        ...state,
        collapsed: action.collapsed
      };
    case appType.SET_THEME:
      return {
        ...state,
        theme: action.theme
      };
    default:
      return state;
  }
};
