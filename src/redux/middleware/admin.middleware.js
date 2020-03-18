import {
  FETCH_ADMIN_SUCCESS,
  FETCH_ADMIN_ERROR,
  ADMIN_LOGIN_PROCESS,
  ADMIN_LOGOUT
} from '@constants';
import { apiRequest, showMessageLoading, hideMessage } from '@actions';
import { storage } from '@helpers';

import { message } from 'antd';

const URL = 'http://localhost:3000/api/v1/admin/auth/login';

export const loginProcess = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === ADMIN_LOGIN_PROCESS) {
    dispatch(
      apiRequest(
        'POST',
        URL,
        action.payload,
        FETCH_ADMIN_SUCCESS,
        FETCH_ADMIN_ERROR
      )
    );
    dispatch(showMessageLoading());
  }
};

export const loginSucess = ({ dispatch }) => next => action => {
  next(action);

  if (action.type === FETCH_ADMIN_SUCCESS) {
    message.success('Login success!', 1);
    storage.set('admin', action.payload);
    dispatch(hideMessage());
  }
};

export const loginReject = ({ dispatch }) => next => action => {
  next(action);

  if (action.type === FETCH_ADMIN_ERROR) {
    message.error('Invalid email or password!', 1);
    dispatch(hideMessage());
  }
};

export const logoutSuccess = ({ dispatch }) => next => action => {
  next(action);

  if (action.type === ADMIN_LOGOUT) {
    storage.remove('admin');
    storage.remove('collapsed');
    storage.remove('theme');
  }
};

export const authMdl = [loginProcess, loginSucess, loginReject, logoutSuccess];
