import { isEmpty } from 'ramda';

import {
  FETCH_ADMIN_SUCCESS,
  FETCH_ADMIN_ERROR,
  ADMIN_LOGOUT,
  GET_ADMIN_FROM_STORAGE,
} from '@constants';

const initialState = {
  isFetching: true,
  isAuthenticated: false,
  admin: {},
};

export const admin = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_ADMIN_SUCCESS:
      return {
        isAuthenticated: true,
        admin: action.payload,
        isFetching: false,
      };
    case FETCH_ADMIN_ERROR:
      return {
        isAuthenticated: false,
        admin: {},
        isFetching: false,
      };
    case ADMIN_LOGOUT:
      return { isAuthenticated: false, admin: {}, isFetching: false };
    case GET_ADMIN_FROM_STORAGE:
      return {
        isAuthenticated: !isEmpty(action.payload),
        admin: action.payload,
        isFetching: false,
      };
    default:
      return state;
  }
};
