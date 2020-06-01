import { mergeAll } from 'ramda';
import moment from 'moment';

import {
  FETCH_USERS_SUCCESS,
  FETCH_USERS_PROCESS,
  DELETE_USERS_PROCESS,
  DELETE_USERS_SUCCESS,
  CREATE_USER_SUCCESS,
  CREATE_USER_PROCESS,
  UPDATE_USER_PROCESS,
  UPDATE_USER_SUCCESS,
  CHANGE_PAGINATION_USERS,
  FETCH_USER_ID_PROCCESS,
  FETCH_USER_ID_SUCCESS,
  SELECT_USERS,
} from '@constants';

const initialState = {
  allUsers: [],
  currentUser: {},
  selected: [],
  pagination: {},
  isFetching: true,
};

export const users = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_USERS_PROCESS:
      return {
        ...state,
        isFetching: true,
      };
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
        isFetching: false,
      };
    case SELECT_USERS:
      return {
        ...state,
        selected: action.payload,
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
    case FETCH_USER_ID_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        isFetching: false,
      };
    case FETCH_USER_ID_PROCCESS:
      return {
        ...state,
        isFetching: true,
      };
    case DELETE_USERS_PROCESS:
      return {
        ...state,
        isFetching: true,
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
        isFetching: false,
      };
    case CREATE_USER_PROCESS:
      return {
        ...state,
        isFetching: true,
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
        isFetching: false,
      };
    case UPDATE_USER_PROCESS:
      return {
        ...state,
        isFetching: true,
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
        isFetching: false,
      };

    default:
      return state;
  }
};
