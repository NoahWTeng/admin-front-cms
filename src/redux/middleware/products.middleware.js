import {
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCTS_PROCESS,
  DELETE_PRODUCTS_PROCESS,
  DELETE_PRODUCTS_SUCCESS,
  DELETE_PRODUCTS_ERROR,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  CREATE_PRODUCT_PROCESS,
  UPDATE_PRODUCT_PROCESS,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_ERROR,
  CHANGE_PAGINATION_PRODUCTS,
  FETCH_PRODUCT_ID_PROCCESS,
  FETCH_PRODUCT_ID_ERROR,
  FETCH_PRODUCT_ID_SUCCESS,
} from '@constants';
import {
  apiRequest,
  closeModal,
  getProductsListProcess,
  setCurrentUser,
  getUserById,
} from '@actions';
import { getStorage, handleRefresh, history } from '@helpers';
import { logoutAdmin } from '@actions';

const URL = 'http://localhost:3000/api/v1/product/';

export const productsProcess = ({ dispatch }) => (next) => (action) => {
  next(action);

  switch (action.type) {
    case FETCH_PRODUCTS_PROCESS:
      const { search } = window.location;
      dispatch(
        apiRequest(
          'GET',
          `${URL}${search}`,
          action.payload,
          FETCH_PRODUCTS_SUCCESS,
          FETCH_PRODUCTS_ERROR,
          getStorage.admin().token
        )
      );
      break;
    case DELETE_PRODUCTS_PROCESS:
      const { products, pagination, ids } = action.payload;

      dispatch(
        apiRequest(
          'DELETE',
          URL,
          ids,
          DELETE_PRODUCTS_SUCCESS,
          DELETE_PRODUCTS_ERROR,
          getStorage.admin().token
        )
      );
      handleRefresh(
        {
          page:
            products.length === ids.length && pagination.current > 1
              ? pagination.current - 1
              : pagination.current,
          limit: pagination.pageSize,
        },
        window.location,
        history
      );
      break;
    //   case CREATE_PRODUCT_PROCESS:
    //     dispatch(
    //       apiRequest(
    //         'POST',
    //         URL,
    //         action.payload,
    //         CREATE_PRODUCT_SUCCESS,
    //         CREATE_PRODUCT_ERROR,
    //         getStorage.admin().token
    //       )
    //     );
    //     break;
    //   case UPDATE_PRODUCT_PROCESS:
    //     dispatch(
    //       apiRequest(
    //         'PUT',
    //         `${URL}${action.payload.paramsId}`,
    //         action.payload.body,
    //         UPDATE_PRODUCT_SUCCESS,
    //         UPDATE_PRODUCT_ERROR,
    //         getStorage.admin().token
    //       )
    //     );
    //     break;
    //   case FETCH_PRODUCT_ID_PROCCESS:
    //     dispatch(
    //       apiRequest(
    //         'GET',
    //         `${URL}${action.payload}`,
    //         null,
    //         FETCH_PRODUCT_ID_SUCCESS,
    //         FETCH_PRODUCT_ID_ERROR,
    //         getStorage.admin().token
    //       )
    //     );
    //     break;
    default:
      break;
  }
};

export const getProductsSuccess = ({ dispatch }) => (next) => (action) => {
  next(action);
  if (action.type === FETCH_PRODUCTS_SUCCESS) {
  }
};

export const getProductsError = ({ dispatch }) => (next) => (action) => {
  next(action);
  if (action.type === FETCH_PRODUCTS_ERROR) {
    dispatch(logoutAdmin());
  }
};

export const deleteProductsSuccess = ({ dispatch }) => (next) => (action) => {
  next(action);
  if (action.type === DELETE_PRODUCTS_SUCCESS) {
    dispatch(getProductsListProcess());
  }
};

export const deleteProductsError = ({ dispatch }) => (next) => (action) => {
  next(action);
  if (action.type === DELETE_PRODUCTS_ERROR) {
    dispatch(closeModal());
  }
};

// export const createdUserSuccess = ({ dispatch }) => (next) => (action) => {
//   next(action);
//   if (action.type === CREATE_PRODUCT_SUCCESS) {
//     dispatch(getProductsListProcess());
//     dispatch(closeModal());
//   }
// };

// export const createdUserError = ({ dispatch }) => (next) => (action) => {
//   next(action);
//   if (action.type === CREATE_PRODUCT_ERROR) {
//     dispatch(closeModal());
//   }
// };

// export const updatedUserSuccess = ({ dispatch }) => (next) => (action) => {
//   next(action);
//   if (action.type === UPDATE_PRODUCT_SUCCESS) {
//     dispatch(getProductsListProcess());
//     dispatch(getUserById(action.payload.docs._id));

//     dispatch(closeModal());
//   }
// };

// export const updatedUserError = ({ dispatch }) => (next) => (action) => {
//   next(action);
//   if (action.type === UPDATE_PRODUCT_ERROR) {
//     dispatch(closeModal());
//   }
// };

// export const changePaginationProcess = ({ dispatch }) => (next) => (action) => {
//   next(action);
//   if (action.type === CHANGE_PAGINATION_PRODUCTS) {
//     handleRefresh(
//       {
//         page: action.payload.current,
//         limit: action.payload.pageSize,
//       },
//       window.location,
//       history
//     );
//     dispatch(getProductsListProcess());
//   }
// };

// export const getUserByIdSuccess = ({ dispatch }) => (next) => (action) => {
//   next(action);
//   if (action.type === FETCH_PRODUCT_ID_SUCCESS) {
//     dispatch(setCurrentUser(action.payload));
//   }
// };

// export const getUserByIdError = ({ dispatch }) => (next) => (action) => {
//   next(action);
//   if (action.type === FETCH_PRODUCT_ID_ERROR) {
//     console.log('action.payload ERROR', action.payload);
//   }
// };

export const productsMdl = [
  productsProcess,
  getProductsSuccess,
  getProductsError,
  deleteProductsSuccess,
  deleteProductsError,
];
