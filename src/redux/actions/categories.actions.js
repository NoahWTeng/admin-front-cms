import {
  FETCH_CATEGORIES_PROCESS,
  DELETE_CATEGORY_PROCESS,
  CREATE_CATEGORY_PROCESS,
  CHANGE_PAGINATION_CATEGORY,
  UPDATE_CATEGORY_PROCESS,
  CURRENT_CATEGORY
} from '@constants';

const getCategoriesListProcess = data => ({
  type: FETCH_CATEGORIES_PROCESS,
  payload: data
});

const createNewCategory = data => ({
  type: CREATE_CATEGORY_PROCESS,
  payload: data
});

const deleteCategory = data => ({
  type: DELETE_CATEGORY_PROCESS,
  payload: data
});

const setCurrentCategory = data => ({
  type: CURRENT_CATEGORY,
  payload: data
});

const updateCategory = data => ({
  type: UPDATE_CATEGORY_PROCESS,
  payload: data
});

const toggleCategoryPagination = data => ({
  type: CHANGE_PAGINATION_CATEGORY,
  payload: data
});

export {
  getCategoriesListProcess,
  createNewCategory,
  deleteCategory,
  setCurrentCategory,
  updateCategory,
  toggleCategoryPagination
};
