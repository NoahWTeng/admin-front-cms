import {
  FETCH_PRODUCTS_SUCCESS,
  SELECT_PRODUCTS,
  CURRENT_PRODUCT,
  CHANGE_PAGINATION_PRODUCTS,
  FETCH_PRODUCT_ID_ERROR,
  CLEAR_ALL_STATE,
} from '@constants';
import moment from 'moment';

const initialState = {
  isFetching: true,
  products: [],
  currentProduct: {},
  selected: [],
  pagination: {},
};

export const products = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload.docs.map((product) => ({
          ...product,
          createdAt: moment(product.createdAt).format('LL'),
          updatedAt: moment(product.updatedAt).format('LL'),
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
    case CURRENT_PRODUCT:
      return {
        ...state,
        currentUser: action.payload,
        isFetching: false,
      };
    case CHANGE_PAGINATION_PRODUCTS:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          pageSize: action.payload.pageSize,
          current: action.payload.current,
        },
      };
    case FETCH_PRODUCT_ID_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SELECT_PRODUCTS:
      return {
        ...state,
        selected: action.payload,
      };
    case CLEAR_ALL_STATE:
      return {
        isFetching: true,
        products: [],
        currentProduct: {},
        selected: [],
        pagination: {},
      };
    default:
      return state;
  }
};
