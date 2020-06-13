import {
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_PROCESS,
  DELETE_PRODUCTS_PROCESS,
  SELECT_PRODUCTS,
  CURRENT_PRODUCT,
  CHANGE_PAGINATION_PRODUCTS,
  FETCH_PRODUCT_ID_ERROR,
  DELETE_PRODUCTS_SUCCESS,
  FETCH_UPLOAD_IMAGE_SUCCESS,
} from '@constants';
import moment from 'moment';

const initialState = {
  products: [],
  currentProduct: {},
  selected: [],
  pagination: {},
  isFetching: true,
};

export const products = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_PRODUCTS_PROCESS:
      return {
        ...state,
        isFetching: true,
      };
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
        error: null,
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

    case SELECT_PRODUCTS:
      return {
        ...state,
        selected: action.payload,
      };
    case DELETE_PRODUCTS_PROCESS:
      return {
        ...state,
        isFetching: true,
      };
    case DELETE_PRODUCTS_SUCCESS:
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
        error: null,
        isFetching: false,
      };
    case FETCH_UPLOAD_IMAGE_SUCCESS:
      return {
        imageList: [...state.imageList, action.payload],
      };

    default:
      return state;
  }
};
