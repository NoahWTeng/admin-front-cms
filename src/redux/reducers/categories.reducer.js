import {
  FETCH_CATEGORIES_SUCCESS,
  CURRENT_CATEGORY,
  CHANGE_PAGINATION_CATEGORY,
  CLEAR_ALL_STATE,
  FETCH_CATEGORIES_2_SUCCESS,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_ERROR,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_ERROR,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_ERROR,
} from '@constants';
import moment from 'moment';

const initialState = {
  category1: [],
  category2: [],
  currentCategory: {},
  pagination: {},
  created: null,
  deleted: null,
  updated: null,
};

export const categories = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        category1: action.payload.docs.map((cat) => ({
          ...cat,
          createdAt: moment(cat.createdAt).format('LL'),
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
    case FETCH_CATEGORIES_2_SUCCESS:
      return {
        ...state,
        category2: action.payload.docs.map((cat) => ({
          ...cat,
          createdAt: moment(cat.createdAt).format('LL'),
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
    case CHANGE_PAGINATION_CATEGORY:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          pageSize: action.payload.pageSize,
          current: action.payload.current,
        },
      };
    case CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.payload,
      };
    case CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        created: 'success',
        deleted: '',
        updated: '',
      };
    case CREATE_CATEGORY_ERROR:
      return {
        ...state,
        created: 'error',
        deleted: '',
        updated: '',
      };
    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        created: '',
        deleted: 'success',
        updated: '',
      };
    case DELETE_CATEGORY_ERROR:
      return {
        ...state,
        created: '',
        deleted: 'error',
        updated: '',
      };
    case UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        created: '',
        deleted: '',
        updated: 'success',
      };
    case UPDATE_CATEGORY_ERROR:
      return {
        ...state,
        created: '',
        deleted: '',
        updated: 'error',
      };
    case CLEAR_ALL_STATE:
      return {
        category1: [],
        category2: [],
        currentCategory: {},
        pagination: {},
        created: null,
        deleted: null,
        updated: null,
      };
    default:
      return state;
  }
};
