import { useDispatch } from 'react-redux';
import { isBoolean } from 'lodash';

import { getStorage } from '@helpers';
import {
  updateAdmin,
  changeLanguageSucess,
  toggleSidebarCollapsed,
  switchThemesSibebar
} from '@actions';

const collapsed = getStorage.collapsed();
const sidebarTheme = getStorage.isDarkTheme();
const lang = getStorage.lang();
const admin = getStorage.admin();

const InitialStorage = ({ children }) => {
  const dispatch = useDispatch();

  if (admin && admin.token) dispatch(updateAdmin(admin));
  if (collapsed) dispatch(toggleSidebarCollapsed(collapsed));
  if (isBoolean(sidebarTheme)) dispatch(switchThemesSibebar(sidebarTheme));
  if (lang)
    dispatch(
      changeLanguageSucess({ language: lang.language, catalog: lang.catalog })
    );

  return children;
};

export { InitialStorage };
