import {
  FETCH_PRODUCTS_PROCESS,
  DELETE_PRODUCTS_PROCESS,
  SELECT_PRODUCTS,
  CREATE_PRODUCT_PROCESS,
  UPDATE_PRODUCT_PROCESS,
  CURRENT_PRODUCT,
  CHANGE_PAGINATION_PRODUCTS,
  FETCH_PRODUCT_ID_PROCCESS,
  CLEAR_ALL_STATE,
} from '@constants';

const getProductsListProcess = () => ({
  type: FETCH_PRODUCTS_PROCESS,
});

const deleteProductsProcess = (data) => ({
  type: DELETE_PRODUCTS_PROCESS,
  payload: data,
});

const selectProducts = (data) => ({
  type: SELECT_PRODUCTS,
  payload: data,
});

const createNewProduct = (data) => ({
  type: CREATE_PRODUCT_PROCESS,
  payload: data,
});

const updateProduct = (data) => ({
  type: UPDATE_PRODUCT_PROCESS,
  payload: data,
});

const setCurrentProduct = (data) => ({
  type: CURRENT_PRODUCT,
  payload: data,
});

const toggleChangePagination = (data) => ({
  type: CHANGE_PAGINATION_PRODUCTS,
  payload: data,
});

const getProductById = (data) => ({
  type: FETCH_PRODUCT_ID_PROCCESS,
  payload: data,
});

const clearUpState = () => ({
  type: CLEAR_ALL_STATE,
});

export {
  getProductsListProcess,
  deleteProductsProcess,
  selectProducts,
  createNewProduct,
  updateProduct,
  setCurrentProduct,
  toggleChangePagination,
  getProductById,
  clearUpState,
};
