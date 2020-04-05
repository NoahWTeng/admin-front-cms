import {
  ADMIN_LOGIN_PROCESS,
  ADMIN_LOGOUT,
  GET_ADMIN_FROM_STORAGE,
} from '@constants';

const loginAdmin = (data) => ({
  type: ADMIN_LOGIN_PROCESS,
  payload: data,
});

const logoutAdmin = () => ({
  type: ADMIN_LOGOUT,
});

const getAdminFromStorage = (data) => ({
  type: GET_ADMIN_FROM_STORAGE,
  payload: data,
});

export { loginAdmin, logoutAdmin, getAdminFromStorage };
