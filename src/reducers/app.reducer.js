import { appType } from '@constants';

const initialState = {
  collapsed: false,
  language: 'en',
  pathName: '',
  theme: 'dark'
};

export const app = (state = initialState, action = {}) => {
  switch (action.type) {
    case appType.SET_LANGUAGE:
      return {
        ...state,
        language: action.language
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
