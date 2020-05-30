const FETCH_PRODUCTS_PROCESS = '[products] Process Get Products List';
const FETCH_PRODUCTS_ERROR = '[products] Error Get Products List';
const FETCH_PRODUCTS_SUCCESS = '[products] Success Get Products List';

const DELETE_PRODUCTS_PROCESS = '[products] Process Delete Selected Products';
const DELETE_PRODUCTS_SUCCESS = '[products] Success Deleted Selected Products';
const DELETE_PRODUCTS_ERROR = '[products] Error Selected Products Not Deleted';

const SELECT_PRODUCTS = '[products] Toggle Select Products';

const CREATE_PRODUCT_PROCESS = '[products] Process Create Product';
const CREATE_PRODUCT_SUCCESS = '[products] Success Create Product';
const CREATE_PRODUCT_ERROR = '[products] Error Create Product';

const UPDATE_PRODUCT_PROCESS = '[products] Process Update Product';
const UPDATE_PRODUCT_SUCCESS = '[products] Success Update Product';
const UPDATE_PRODUCT_ERROR = '[products] Error Update Product';

const CURRENT_PRODUCT = '[products] Target Current Product';

const CHANGE_PAGINATION_PRODUCTS = '[products] Update Pagination Products';

const FETCH_PRODUCT_ID_PROCCESS = '[products] Process Get Product By Id';
const FETCH_PRODUCT_ID_ERROR = '[products] Error Get Product By Id';
const FETCH_PRODUCT_ID_SUCCESS = '[products] Sucess Get Product By Id';

const CLEAR_ALL_STATE = '[products] Process Clear State';

export {
  FETCH_PRODUCTS_PROCESS,
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCTS_SUCCESS,
  DELETE_PRODUCTS_PROCESS,
  DELETE_PRODUCTS_SUCCESS,
  DELETE_PRODUCTS_ERROR,
  SELECT_PRODUCTS,
  CREATE_PRODUCT_PROCESS,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  CURRENT_PRODUCT,
  CHANGE_PAGINATION_PRODUCTS,
  FETCH_PRODUCT_ID_PROCCESS,
  FETCH_PRODUCT_ID_ERROR,
  FETCH_PRODUCT_ID_SUCCESS,
  UPDATE_PRODUCT_PROCESS,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_ERROR,
  CLEAR_ALL_STATE,
};
