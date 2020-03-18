import {
  FETCH_ADMIN_SUCCESS,
  FETCH_ADMIN_ERROR,
  ADMIN_LOGOUT
} from '@constants';

const initialState = {
  isAuthenticated: false,
  admin: {}
};

export const admin = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_ADMIN_SUCCESS:
      return {
        isAuthenticated: true,
        admin: action.payload
      };
    case FETCH_ADMIN_ERROR:
      return {
        isAuthenticated: false,
        admin: action.payload
      };
    case ADMIN_LOGOUT:
      return { isAuthenticated: false };
    default:
      return state;
  }
};
