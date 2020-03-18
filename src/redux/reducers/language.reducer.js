import { LANGUAGE_SUCCESS } from '@constants';
import en from '@locales/en/messages.json';

import { RoutesList, RenderList } from '@routes';

const initialState = {
  language: 'en',
  catalogs: { en },
  routesList: RoutesList('en'),
  renderList: RenderList('en')
};

export const language = (state = initialState, action = {}) => {
  switch (action.type) {
    case LANGUAGE_SUCCESS:
      const { language, catalog } = action.payload;
      return {
        ...state,
        language: language,
        catalogs: { [language]: catalog },
        routesList: RoutesList(language),
        renderList: RenderList(language)
      };

    default:
      return state;
  }
};
