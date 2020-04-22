import {
  FETCH_CATEGORIES_SUCCESS,
  CURRENT_CATEGORY,
  CHANGE_PAGINATION_CATEGORY,
  CLEAR_ALL_STATE,
  FETCH_CATEGORIES_2_SUCCESS,
} from '@constants';
import moment from 'moment';

const initialState = {
  isFetching: true,
  category1: [],
  category2: [],
  currentCategory: {},
  pagination: {},
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
        isFetching: false,
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
        isFetching: false,
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
    case CLEAR_ALL_STATE:
      return {
        isFetching: false,
        category1: [],
        category2: [],
        currentCategory: {},
        pagination: {},
      };
    default:
      return state;
  }
};
