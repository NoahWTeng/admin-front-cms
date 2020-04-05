import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isNil } from 'ramda';

import { getStorage } from '@helpers';
import {
  getAdminFromStorage,
  changeLanguageSucess,
  toggleSidebarCollapsed,
  switchThemesSibebar,
} from '@actions';

const collapsed = getStorage.collapsed();
const sidebarTheme = getStorage.isDarkTheme();
const lang = getStorage.lang();
const admin = getStorage.admin();

export const InitialStorage = ({ children }) => {
  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => state.admin);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      isNil(admin)
        ? dispatch(getAdminFromStorage({}))
        : dispatch(getAdminFromStorage(admin));
      if (collapsed) dispatch(toggleSidebarCollapsed(collapsed));
      if (!isNil(sidebarTheme)) dispatch(switchThemesSibebar(sidebarTheme));
      if (lang)
        dispatch(
          changeLanguageSucess({
            language: lang.language,
            catalog: lang.catalog,
          })
        );
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return !isFetching && children;
};
