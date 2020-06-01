import {
  SHOW_MESSAGE_LOADING,
  HIDE_MESSAGE,
  SIDEBAR_COLLAPSED,
  SWITCH_THEME_SIDEBAR,
  FETCHING_TRUE,
  FETCHING_FALSE,
} from '@constants';

export const showMessageLoading = () => ({
  type: SHOW_MESSAGE_LOADING,
});

export const hideMessage = () => ({
  type: HIDE_MESSAGE,
});

export const toggleSidebarCollapsed = (value) => ({
  type: SIDEBAR_COLLAPSED,
  payload: value,
});

export const switchThemesSibebar = (value) => ({
  type: SWITCH_THEME_SIDEBAR,
  payload: value,
});
