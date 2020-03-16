import { authType } from '@constants';
import { isEmpty } from 'lodash';

const initialState = {
  error: '',
  isFetching: false,
  isAuthenticated: false,
  admin: {}
};

export const auth = (state = initialState, action = {}) => {
  switch (action.type) {
    case authType.REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case authType.SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: !isEmpty(action.admin),
        admin: action.admin,
        error: ''
      };
    case authType.ERROR:
      return {
        isFetching: false,
        isAuthenticated: false,
        admin: {},
        error: action.error
      };
    default:
      return state;
  }
};
