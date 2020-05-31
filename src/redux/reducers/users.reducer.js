import { mergeAll } from 'ramda';
import moment from 'moment';

import {
  FETCH_USERS_SUCCESS,
  SELECT_USERS,
  CURRENT_USER,
  CHANGE_PAGINATION_USERS,
  FETCH_USER_ID_ERROR,
  DELETE_USERS_SUCCESS,
  CREATE_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
} from '@constants';

const initialState = {
  allUsers: [],
  currentUser: {},
  selected: [],
  pagination: {},
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
    case DELETE_USERS_SUCCESS:
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
      };
    case CREATE_USER_SUCCESS:
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
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.payload.docs,
        allUsers: state.allUsers.map((user) => {
          const check = user._id === action.payload.docs._id;
          if (check) {
            user = mergeAll([user, action.payload.docs]);
          }
          return user;
        }),
      };

    default:
      return state;
  }
};
