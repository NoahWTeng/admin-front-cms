import {
  HIDE_MESSAGE,
  SHOW_MESSAGE_LOADING,
  SIDEBAR_COLLAPSED,
  SWITCH_THEME_SIDEBAR,
  FETCHING_TRUE,
  FETCHING_FALSE,
} from '@constants';

const initialState = {
  isLoading: false,
  isCollapsed: false,
  isDarkTheme: true,
  isFetching: true,
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
    case FETCHING_TRUE:
      return {
        ...state,
        isFetching: true,
      };
    case FETCHING_FALSE:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};
