import { getStorage } from '@helpers';
import { useSelector, useDispatch } from 'react-redux';
import { setAdmin, setLanguage, setTheme, setCollapsed } from '@actions';
import { isEmpty } from 'lodash';

const collapsed = getStorage.collapsed();
const theme = getStorage.theme();
const lang = getStorage.lang();
const admin = getStorage.admin();

const InitialStorage = ({ children }) => {
  const dispatch = useDispatch();

  if (admin && admin.token) dispatch(setAdmin(admin));
  if (lang)
    dispatch(setLanguage({ language: lang.language, catalog: lang.catalog }));
  if (isEmpty(theme)) dispatch(setTheme(theme));
  if (collapsed) dispatch(setCollapsed(collapsed));

  return children;
};

export { InitialStorage };
