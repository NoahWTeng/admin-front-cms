import {
  HIDE_MESSAGE,
  SHOW_MESSAGE_LOADING,
  SIDEBAR_COLLAPSED,
  SWITCH_THEME_SIDEBAR,
} from '@constants';

const initialState = {
  isLoading: false,
  isCollapsed: false,
  isDarkTheme: true,
};

export const ui = (state = initialState, action = {}) => {
  switch (action.type) {
    case SHOW_MESSAGE_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case HIDE_MESSAGE:
      return {
        ...state,
        isLoading: false,
      };
    case SIDEBAR_COLLAPSED:
      return {
        ...state,
        isCollapsed: action.payload,
      };
    case SWITCH_THEME_SIDEBAR:
      return {
        ...state,
        isDarkTheme: action.payload,
      };
    default:
      return state;
  }
};
