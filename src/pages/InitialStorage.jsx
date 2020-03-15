import { getStorage } from '@helpers';
import { useSelector, useDispatch } from 'react-redux';
import { setAdmin } from '@actions';

const collapsed = getStorage.collapsed();
const theme = getStorage.theme();
const lang = getStorage.lang();
const admin = getStorage.admin();

const InitialStorage = ({ children }) => {
  const dispatch = useDispatch();

  if (admin && admin.token) dispatch(setAdmin(admin));

  return children;
};

export { InitialStorage };
