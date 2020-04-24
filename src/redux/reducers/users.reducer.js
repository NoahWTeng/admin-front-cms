import {
  FETCH_USERS_SUCCESS,
  SELECT_USERS,
  CURRENT_USER,
  CHANGE_PAGINATION_USERS,
  FETCH_USER_ID_ERROR,
  CLEAR_ALL_STATE,
  DELETE_USERS_SUCCESS,
  DELETE_USERS_ERROR,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
} from '@constants';
import moment from 'moment';

const initialState = {
  isFetching: true,
  allUsers: [],
  currentUser: {},
  selected: [],
  pagination: {},
  error: null,
  created: null,
  deleted: null,
  updated: null,
};

export const users = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        allUsers: action.payload.docs.map((user) => ({
          ...user,
          createdAt: moment(user.createdAt).format('LL'),
          updatedAt: moment(user.updatedAt).format('LL'),
        })),
        pagination: {
          total: action.payload.total,
          pageSize: action.payload.limit,
          current: action.payload.page,
          pages: action.payload.pages,
          showSizeChanger: true,
          showQuickJumper: false,
        },
        selected: [],
        isFetching: false,
        error: null,
      };
    case SELECT_USERS:
      return {
        ...state,
        selected: action.payload,
      };
    case CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
        isFetching: false,
      };
    case CHANGE_PAGINATION_USERS:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          pageSize: action.payload.pageSize,
          current: action.payload.current,
        },
      };
    case FETCH_USER_ID_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        created: 'success',
        deleted: '',
        updated: '',
      };
    case CREATE_USER_ERROR:
      return {
        ...state,
        created: 'error',
        deleted: '',
        updated: '',
      };
    case DELETE_USERS_SUCCESS:
      return {
        ...state,
        created: '',
        deleted: 'success',
        updated: '',
      };
    case DELETE_USERS_ERROR:
      return {
        ...state,
        created: '',
        deleted: 'error',
        updated: '',
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        created: '',
        deleted: '',
        updated: 'success',
      };
    case UPDATE_USER_ERROR:
      return {
        ...state,
        created: '',
        deleted: '',
        updated: 'error',
      };
    case CLEAR_ALL_STATE:
      return {
        isFetching: true,
        allUsers: [],
        currentUser: {},
        selected: [],
        pagination: {},
        error: null,
        created: null,
        deleted: null,
        updated: null,
      };
    default:
      return state;
  }
};
