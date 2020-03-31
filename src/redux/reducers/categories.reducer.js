import {
  FETCH_CATEGORIES_SUCCESS,
  CURRENT_CATEGORY,
  CHANGE_PAGINATION_CATEGORY,
  FETCH_CATEGORIES_PROCESS,
  CLEAR_ALL_STATE
} from '@constants';
import moment from 'moment';

const initialState = {
  isFetching: false,
  category1: [],
  currentCategory: {},
  pagination: {}
};

export const categories = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_CATEGORIES_PROCESS:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        category1: action.payload.docs.map(cat => ({
          ...cat,
          createdAt: moment(cat.createdAt).format('LL')
        })),
        pagination: {
          total: action.payload.total,
          pageSize: action.payload.limit,
          current: action.payload.page,
          pages: action.payload.pages,
          showSizeChanger: true,
          showQuickJumper: false
        },
        isFetching: false
      };
    case CHANGE_PAGINATION_CATEGORY:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          pageSize: action.payload.pageSize,
          current: action.payload.current
        }
      };
    case CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.payload
      };
    case CLEAR_ALL_STATE:
      return {
        isFetching: false,
        category1: [],
        currentCategory: {},
        pagination: {}
      };
    default:
      return state;
  }
};
