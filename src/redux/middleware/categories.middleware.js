import {
  FETCH_CATEGORIES_PROCESS,
  FETCH_CATEGORIES_ERROR,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_2_PROCESS,
  FETCH_CATEGORIES_2_ERROR,
  FETCH_CATEGORIES_2_SUCCESS,
  DELETE_CATEGORY_PROCESS,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_ERROR,
  CREATE_CATEGORY_PROCESS,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_ERROR,
  CHANGE_PAGINATION_CATEGORY,
  UPDATE_CATEGORY_PROCESS,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_ERROR,
} from '@constants';
import { apiRequest, getCategoriesListProcess, closeModal } from '@actions';
import { getStorage, history, handleRefresh } from '@helpers';
import { stringify } from 'qs';
import { isEmpty } from 'ramda';

const URL = 'http://localhost:3000/api/v1/category/';

export const categoriesProcess = ({ dispatch }) => (next) => (action) => {
  next(action);

  switch (action.type) {
    case FETCH_CATEGORIES_PROCESS:
      const search = window.location.search;
      const query = stringify({
        querySearch: { breadcrumbParentId: { $exists: false } },
      });

      dispatch(
        apiRequest(
          'GET',
          isEmpty(search) ? `${URL}?${query}` : `${URL}${search}&${query}`,
          null,
          FETCH_CATEGORIES_SUCCESS,
          FETCH_CATEGORIES_ERROR,
          getStorage.admin().token
        )
      );
      break;
    case FETCH_CATEGORIES_2_PROCESS:
      const search2 = window.location.search;
      const query2 = stringify({
        querySearch: { breadcrumbParentId: { $exists: true } },
      });

      dispatch(
        apiRequest(
          'GET',
          isEmpty(search2) ? `${URL}?${query2}` : `${URL}${search2}&${query2}`,
          null,
          FETCH_CATEGORIES_SUCCESS,
          FETCH_CATEGORIES_ERROR,
          getStorage.admin().token
        )
      );
      break;
    case CREATE_CATEGORY_PROCESS:
      dispatch(
        apiRequest(
          'POST',
          URL,
          action.payload,
          CREATE_CATEGORY_SUCCESS,
          CREATE_CATEGORY_ERROR,
          getStorage.admin().token
        )
      );
      break;
    case DELETE_CATEGORY_PROCESS:
      const { category1, pagination, ids } = action.payload;

      dispatch(
        apiRequest(
          'DELETE',
          URL,
          ids,
          DELETE_CATEGORY_SUCCESS,
          DELETE_CATEGORY_ERROR,
          getStorage.admin().token
        )
      );
      handleRefresh(
        {
          page:
            category1.length === 1 && pagination.current > 1
              ? pagination.current - 1
              : pagination.current,
          limit: pagination.pageSize,
        },
        window.location,
        history
      );
      break;
    case UPDATE_CATEGORY_PROCESS:
      dispatch(
        apiRequest(
          'PUT',
          `${URL}${action.payload.paramsId}`,
          action.payload.body,
          UPDATE_CATEGORY_SUCCESS,
          UPDATE_CATEGORY_ERROR,
          getStorage.admin().token
        )
      );
      break;
    default:
      break;
  }
};

export const getCategoriesSuccess = ({ dispatch }) => (next) => (action) => {
  next(action);
  if (action.type === FETCH_CATEGORIES_SUCCESS) {
    dispatch(closeModal());
  }

  if (action.type === FETCH_CATEGORIES_2_SUCCESS) {
    dispatch(closeModal());
  }
};

export const getCategoriesError = ({ dispatch }) => (next) => (action) => {
  next(action);
  if (action.type === FETCH_CATEGORIES_ERROR) {
    console.log('action.payload get categories ERROR', action.payload);
  }
  if (action.type === FETCH_CATEGORIES_2_ERROR) {
    console.log('action.payload get categories 2 ERROR', action.payload);
  }
};

export const createCategoriesSuccess = ({ dispatch }) => (next) => (action) => {
  next(action);
  if (action.type === CREATE_CATEGORY_SUCCESS) {
    dispatch(getCategoriesListProcess());

    console.log('action.payload create categories SUCCESS', action.payload);
  }
};

export const createCategoriesError = ({ dispatch }) => (next) => (action) => {
  next(action);
  if (action.type === CREATE_CATEGORY_ERROR) {
    console.log('action.payload create categories ERROR', action.payload);
  }
};

export const deleteCategoriesSuccess = ({ dispatch }) => (next) => (action) => {
  next(action);
  if (action.type === DELETE_CATEGORY_SUCCESS) {
    dispatch(getCategoriesListProcess());

    console.log('action.payload delete categories SUCCESS', action.payload);
  }
};

export const deleteCategoriesError = ({ dispatch }) => (next) => (action) => {
  next(action);
  if (action.type === DELETE_CATEGORY_ERROR) {
    console.log('action.payload delete categories ERROR', action.payload);
  }
};

export const updateCategoriesSuccess = ({ dispatch }) => (next) => (action) => {
  next(action);
  if (action.type === UPDATE_CATEGORY_SUCCESS) {
    dispatch(getCategoriesListProcess());

    console.log('action.payload update categories SUCCESS', action.payload);
  }
};

export const updateCategoriesError = ({ dispatch }) => (next) => (action) => {
  next(action);
  if (action.type === UPDATE_CATEGORY_ERROR) {
    console.log('action.payload update categories ERROR', action.payload);
  }
};

export const changePaginationProcess = ({ dispatch }) => (next) => (action) => {
  next(action);
  if (action.type === CHANGE_PAGINATION_CATEGORY) {
    handleRefresh(
      {
        page: action.payload.current,
        limit: action.payload.pageSize,
      },
      window.location,
      history
    );
    dispatch(getCategoriesListProcess());
  }
};

export const categoriesMdl = [
  categoriesProcess,
  getCategoriesSuccess,
  getCategoriesError,
  createCategoriesSuccess,
  createCategoriesError,
  deleteCategoriesSuccess,
  deleteCategoriesError,
  updateCategoriesSuccess,
  updateCategoriesError,
  changePaginationProcess,
];
