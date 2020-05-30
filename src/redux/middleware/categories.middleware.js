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
import {
  apiRequest,
  getCategories2ListProcess,
  getCategoriesListProcess,
  closeModal,
  isFetchingData,
  isNotFetchingData,
  successCreateNotification,
  errorCreateNotification,
  successUpdateNotification,
  errorUpdateNotification,
  successDeleteNotification,
  errorDeleteNotification,
  clearNotification,
} from '@actions';
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
      dispatch(isFetchingData());
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
      dispatch(getCategories2ListProcess());
      break;
    case FETCH_CATEGORIES_2_PROCESS:
      const search2 = window.location.search;
      const query2 = stringify({
        querySearch: { breadcrumbParentId: { $exists: true } },
        populate: ['breadcrumbParentId', 'menuParentId'],
      });

      dispatch(
        apiRequest(
          'GET',
          isEmpty(search2) ? `${URL}?${query2}` : `${URL}${search2}&${query2}`,
          null,
          FETCH_CATEGORIES_2_SUCCESS,
          FETCH_CATEGORIES_2_ERROR,
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
      const { category, pagination, ids } = action.payload;
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
            category.length === 1 && pagination.current > 1
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
  }

  if (action.type === FETCH_CATEGORIES_2_SUCCESS) {
    dispatch(closeModal());
    dispatch(isNotFetchingData());
  }
};

export const createCategoriesSuccess = ({ dispatch }) => (next) => (action) => {
  next(action);
  if (action.type === CREATE_CATEGORY_SUCCESS) {
    dispatch(successCreateNotification());
    dispatch(clearNotification());

    dispatch(getCategoriesListProcess());
  }
};

export const createCategoriesError = ({ dispatch }) => (next) => (action) => {
  next(action);
  if (action.type === CREATE_CATEGORY_ERROR) {
    dispatch(errorCreateNotification());
    dispatch(clearNotification());

    dispatch(closeModal());
  }
};

export const deleteCategoriesSuccess = ({ dispatch }) => (next) => (action) => {
  next(action);
  if (action.type === DELETE_CATEGORY_SUCCESS) {
    dispatch(successDeleteNotification());
    dispatch(clearNotification());

    dispatch(getCategoriesListProcess());
  }
};

export const deleteCategoriesError = ({ dispatch }) => (next) => (action) => {
  next(action);
  if (action.type === DELETE_CATEGORY_ERROR) {
    dispatch(errorDeleteNotification());
    dispatch(clearNotification());

    dispatch(closeModal());
  }
};

export const updateCategoriesSuccess = ({ dispatch }) => (next) => (action) => {
  next(action);
  if (action.type === UPDATE_CATEGORY_SUCCESS) {
    dispatch(successUpdateNotification());
    dispatch(clearNotification());

    dispatch(getCategoriesListProcess());
  }
};

export const updateCategoriesError = ({ dispatch }) => (next) => (action) => {
  next(action);
  if (action.type === UPDATE_CATEGORY_ERROR) {
    dispatch(errorUpdateNotification());
    dispatch(clearNotification());

    dispatch(closeModal());
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
  createCategoriesSuccess,
  createCategoriesError,
  deleteCategoriesSuccess,
  deleteCategoriesError,
  updateCategoriesSuccess,
  updateCategoriesError,
  changePaginationProcess,
];
