import {
  FETCH_CATEGORIES_PROCESS,
  FETCH_CATEGORIES_SUCCESS,
  DELETE_CATEGORY_PROCESS,
  DELETE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_PROCESS,
  CREATE_CATEGORY_SUCCESS,
  CHANGE_PAGINATION_CATEGORY,
  UPDATE_CATEGORY_PROCESS,
  UPDATE_CATEGORY_SUCCESS,
  CURRENT_CATEGORY,
} from '@constants';
import moment from 'moment';

const initialState = {
  category1: [],
  category2: [],
  currentCategory: {},
  pagination: {},
  isFetching: true,
};

export const categories = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_CATEGORIES_PROCESS:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_CATEGORIES_SUCCESS:
      const cateOne = action.payload.docs.filter((cat1) => !cat1.menuParentId);
      const cateSec = action.payload.docs.filter((cat2) => cat2.menuParentId);
      return {
        ...state,
        category1: cateOne.map((cat) => ({
          ...cat,
          createdAt: moment(cat.createdAt).format('LL'),
        })),
        category2: cateSec.map((cat) => ({
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
    case CREATE_CATEGORY_PROCESS:
      return {
        ...state,
        isFetching: true,
      };
    case CREATE_CATEGORY_SUCCESS:
      const catOne = action.payload.docs.filter((cat1) => !cat1.menuParentId);
      const catSec = action.payload.docs.filter((cat2) => cat2.menuParentId);
      return {
        ...state,
        category1: catOne.map((cat) => ({
          ...cat,
          createdAt: moment(cat.createdAt).format('LL'),
        })),
        category2: catSec.map((cat) => ({
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
    case DELETE_CATEGORY_PROCESS:
      return {
        ...state,
        isFetching: true,
      };
    case DELETE_CATEGORY_SUCCESS:
      const categoryOne = action.payload.docs.filter(
        (cat1) => !cat1.menuParentId
      );
      const categorySecond = action.payload.docs.filter(
        (cat2) => cat2.menuParentId
      );
      return {
        ...state,
        category1: categoryOne.map((cat) => ({
          ...cat,
          createdAt: moment(cat.createdAt).format('LL'),
        })),
        category2: categorySecond.map((cat) => ({
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
    case UPDATE_CATEGORY_PROCESS:
      return {
        ...state,
        isFetching: true,
      };
    case UPDATE_CATEGORY_SUCCESS:
      const allCategory = action.payload.docs.map((cate) => {
        const check = cate._id === action.payload.docs._id;
        if (check) {
          cate = mergeAll([cate, action.payload.docs]);
        }
        return cate;
      });
      const cat1 = allCategory.filter((cat1) => !cat1.menuParentId);
      const cat2 = allCategory.filter((cat2) => cat2.menuParentId);

      return {
        ...state,
        category1: cat1.map((cat) => ({
          ...cat,
          createdAt: moment(cat.createdAt).format('LL'),
        })),
        category2: cat2.map((cat) => ({
          ...cat,
          createdAt: moment(cat.createdAt).format('LL'),
        })),
        isFetching: false,
      };

    default:
      return state;
  }
};
