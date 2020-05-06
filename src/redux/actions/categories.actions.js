import {
  FETCH_CATEGORIES_PROCESS,
  DELETE_CATEGORY_PROCESS,
  CREATE_CATEGORY_PROCESS,
  CHANGE_PAGINATION_CATEGORY,
  UPDATE_CATEGORY_PROCESS,
  CURRENT_CATEGORY,
  FETCH_CATEGORIES_2_PROCESS,
  REMOVE_MESSAGE_STATE,
} from '@constants';

const getCategoriesListProcess = () => ({
  type: FETCH_CATEGORIES_PROCESS,
});

const getCategories2ListProcess = () => ({
  type: FETCH_CATEGORIES_2_PROCESS,
});

const createNewCategory = (data) => ({
  type: CREATE_CATEGORY_PROCESS,
  payload: data,
});

const deleteCategory = (data) => ({
  type: DELETE_CATEGORY_PROCESS,
  payload: data,
});

const setCurrentCategory = (data) => ({
  type: CURRENT_CATEGORY,
  payload: data,
});

const updateCategory = (data) => ({
  type: UPDATE_CATEGORY_PROCESS,
  payload: data,
});

const toggleCategoryPagination = (data) => ({
  type: CHANGE_PAGINATION_CATEGORY,
  payload: data,
});

const resetMessageStatus = () => ({ type: REMOVE_MESSAGE_STATE });
export {
  getCategoriesListProcess,
  createNewCategory,
  deleteCategory,
  setCurrentCategory,
  updateCategory,
  toggleCategoryPagination,
  getCategories2ListProcess,
  resetMessageStatus,
};
