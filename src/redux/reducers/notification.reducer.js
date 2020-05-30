import {
  DELETE_NOTIFICATION_SUCCESS,
  DELETE_NOTIFICATION_ERROR,
  CREATE_NOTIFICATION_SUCCESS,
  CREATE_NOTIFICATION_ERROR,
  UPDATE_NOTIFICATION_SUCCESS,
  UPDATE_NOTIFICATION_ERROR,
  CLEAR_NOTIFICATION,
} from '@constants';

const initialState = {
  error: null,
  created: null,
  deleted: null,
  updated: null,
};

export const notification = (state = initialState, action = {}) => {
  switch (action.type) {
    case CREATE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        created: 'success',
        deleted: '',
        updated: '',
      };
    case CREATE_NOTIFICATION_ERROR:
      return {
        ...state,
        created: 'error',
        deleted: '',
        updated: '',
      };
    case DELETE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        created: '',
        deleted: 'success',
        updated: '',
      };
    case DELETE_NOTIFICATION_ERROR:
      return {
        ...state,
        created: '',
        deleted: 'error',
        updated: '',
      };
    case UPDATE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        created: '',
        deleted: '',
        updated: 'success',
      };
    case UPDATE_NOTIFICATION_ERROR:
      return {
        ...state,
        created: '',
        deleted: '',
        updated: 'error',
      };
    case CLEAR_NOTIFICATION:
      return {
        error: null,
        created: null,
        deleted: null,
        updated: null,
      };
    default:
      return state;
  }
};
