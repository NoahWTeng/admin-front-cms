import {
  FETCH_USERS_SUCCESS,
  SELECT_USERS,
  CURRENT_USER,
  CHANGE_PAGINATION_USERS,
  FETCH_USER_ID_ERROR,
  CLEAR_ALL_STATE,
} from '@constants';
import moment from 'moment';

const initialState = {
  isFetching: true,
  allUsers: [],
  currentUser: {},
  selected: [],
  pagination: {},
  error: null,
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
    case CLEAR_ALL_STATE:
      return {
        isFetching: true,
        allUsers: [],
        currentUser: {},
        selected: [],
        pagination: {},
        error: null,
      };
    default:
      return state;
  }
};
