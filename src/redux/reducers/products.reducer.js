import {
  FETCH_PRODUCTS_SUCCESS,
  SELECT_PRODUCTS,
  CURRENT_PRODUCT,
  CHANGE_PAGINATION_PRODUCTS,
  FETCH_PRODUCT_ID_ERROR,
  CLEAR_ALL_STATE,
  DELETE_PRODUCTS_SUCCESS,
  DELETE_PRODUCTS_ERROR,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_ERROR,
} from '@constants';
import moment from 'moment';

const initialState = {
  isFetching: true,
  products: [],
  currentProduct: {},
  selected: [],
  pagination: {},
  error: null,
  created: null,
  deleted: null,
  updated: null,
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
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        created: 'success',
        deleted: '',
        updated: '',
      };
    case CREATE_PRODUCT_ERROR:
      return {
        ...state,
        created: 'error',
        deleted: '',
        updated: '',
      };
    case DELETE_PRODUCTS_SUCCESS:
      return {
        ...state,
        created: '',
        deleted: 'success',
        updated: '',
      };
    case DELETE_PRODUCTS_ERROR:
      return {
        ...state,
        created: '',
        deleted: 'error',
        updated: '',
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        created: '',
        deleted: '',
        updated: 'success',
      };
    case UPDATE_PRODUCT_ERROR:
      return {
        ...state,
        created: '',
        deleted: '',
        updated: 'error',
      };
    case CLEAR_ALL_STATE:
      return {
        isFetching: true,
        products: [],
        currentProduct: {},
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
