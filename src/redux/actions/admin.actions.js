import {
  ADMIN_LOGIN_PROCESS,
  ADMIN_LOGOUT,
  FETCH_ADMIN_SUCCESS
} from '@constants';

const loginAdmin = data => ({
  type: ADMIN_LOGIN_PROCESS,
  payload: data
});

const logoutAdmin = () => ({
  type: ADMIN_LOGOUT
});

const updateAdmin = data => ({
  type: FETCH_ADMIN_SUCCESS,
  payload: data
});

export { loginAdmin, logoutAdmin, updateAdmin };
