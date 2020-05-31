import {
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  FETCH_USERS_PROCESS,
  DELETE_USERS_PROCESS,
  DELETE_USERS_SUCCESS,
  DELETE_USERS_ERROR,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  CREATE_USER_PROCESS,
  UPDATE_USER_PROCESS,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  CHANGE_PAGINATION_USERS,
  FETCH_USER_ID_PROCCESS,
  FETCH_USER_ID_ERROR,
  FETCH_USER_ID_SUCCESS,
} from '@constants';
import {
  apiRequest,
  closeModal,
  getUsersListProcess,
  setCurrentUser,
  successCreateNotification,
  errorCreateNotification,
  successUpdateNotification,
  errorUpdateNotification,
  successDeleteNotification,
  errorDeleteNotification,
  clearNotification,
  isFetchingData,
  isNotFetchingData,
} from '@actions';
import { getStorage, handleRefresh, history } from '@helpers';
import { logoutAdmin } from '@actions';

const URL = `${process.env.API}customer/`;

export const usersProcess = ({ dispatch }) => (next) => (action) => {
  next(action);

  switch (action.type) {
    case FETCH_USERS_PROCESS:
      const { search } = window.location;
      dispatch(isFetchingData());
      dispatch(
        apiRequest(
          'GET',
          `${URL}${search}`,
          action.payload,
          FETCH_USERS_SUCCESS,
          FETCH_USERS_ERROR,
          getStorage.admin().token
        )
      );
      break;
    case DELETE_USERS_PROCESS:
      const { allUsers, pagination, ids } = action.payload;
      dispatch(isFetchingData());

      dispatch(
        apiRequest(
          'DELETE',
          URL,
          { ids, query: window.location },
          DELETE_USERS_SUCCESS,
          DELETE_USERS_ERROR,
          getStorage.admin().token
        )
      );
      handleRefresh(
        {
          page:
            allUsers.length === ids.length && pagination.current > 1
              ? pagination.current - 1
              : pagination.current,
          limit: pagination.pageSize,
        },
        window.location,
        history
      );
      break;
    case CREATE_USER_PROCESS:
      dispatch(isFetchingData());

      dispatch(
        apiRequest(
          'POST',
          URL,
          action.payload,
          CREATE_USER_SUCCESS,
          CREATE_USER_ERROR,
          getStorage.admin().token
        )
      );
      break;
    case UPDATE_USER_PROCESS:
      dispatch(isFetchingData());

      dispatch(
        apiRequest(
          'PUT',
          `${URL}${action.payload.paramsId}`,
          action.payload.body,
          UPDATE_USER_SUCCESS,
          UPDATE_USER_ERROR,
          getStorage.admin().token
        )
      );
      break;
    case FETCH_USER_ID_PROCCESS:
      dispatch(isFetchingData());

      dispatch(
        apiRequest(
          'GET',
          `${URL}${action.payload}`,
          null,
          FETCH_USER_ID_SUCCESS,
          FETCH_USER_ID_ERROR,
          getStorage.admin().token
        )
      );
      break;
    default:
      break;
  }
};

export const getUsersSuccess = ({ dispatch }) => (next) => (action) => {
  next(action);
  if (action.type === FETCH_USERS_SUCCESS) {
    dispatch(isNotFetchingData());
  }
};

export const getUsersError = ({ dispatch }) => (next) => (action) => {
  next(action);
  if (action.type === FETCH_USERS_ERROR) {
    dispatch(logoutAdmin());
  }
};

export const deleteUsersSuccess = ({ dispatch }) => (next) => (action) => {
  next(action);
  if (action.type === DELETE_USERS_SUCCESS) {
    dispatch(successDeleteNotification());
    dispatch(clearNotification());
    dispatch(isNotFetchingData());
  }
};

export const deleteUsersError = ({ dispatch }) => (next) => (action) => {
  next(action);
  if (action.type === DELETE_USERS_ERROR) {
    dispatch(errorDeleteNotification());
    dispatch(clearNotification());

    dispatch(closeModal());
  }
};

export const createdUserSuccess = ({ dispatch }) => (next) => (action) => {
  next(action);
  if (action.type === CREATE_USER_SUCCESS) {
    dispatch(successCreateNotification());
    dispatch(clearNotification());

    dispatch(isNotFetchingData());

    dispatch(closeModal());
  }
};

export const createdUserError = ({ dispatch }) => (next) => (action) => {
  next(action);
  if (action.type === CREATE_USER_ERROR) {
    dispatch(errorCreateNotification());
    dispatch(clearNotification());

    dispatch(closeModal());
  }
};

export const updatedUserSuccess = ({ dispatch }) => (next) => (action) => {
  next(action);
  if (action.type === UPDATE_USER_SUCCESS) {
    dispatch(successUpdateNotification());
    dispatch(clearNotification());

    dispatch(isNotFetchingData());

    dispatch(closeModal());
  }
};

export const updatedUserError = ({ dispatch }) => (next) => (action) => {
  next(action);
  if (action.type === UPDATE_USER_ERROR) {
    dispatch(errorUpdateNotification());
    dispatch(clearNotification());

    dispatch(closeModal());
  }
};

export const changePaginationProcess = ({ dispatch }) => (next) => (action) => {
  next(action);
  if (action.type === CHANGE_PAGINATION_USERS) {
    handleRefresh(
      {
        page: action.payload.current,
        limit: action.payload.pageSize,
      },
      window.location,
      history
    );
    dispatch(getUsersListProcess());
  }
};

export const getUserByIdSuccess = ({ dispatch }) => (next) => (action) => {
  next(action);
  if (action.type === FETCH_USER_ID_SUCCESS) {
    dispatch(setCurrentUser(action.payload));
    dispatch(isNotFetchingData());
  }
};

export const getUserByIdError = ({ dispatch }) => (next) => (action) => {
  next(action);
  if (action.type === FETCH_USER_ID_ERROR) {
    console.log('action.payload ERROR', action.payload);
  }
};

export const usersMdl = [
  usersProcess,
  getUsersSuccess,
  getUsersError,
  deleteUsersSuccess,
  createdUserSuccess,
  createdUserError,
  updatedUserSuccess,
  updatedUserError,
  changePaginationProcess,
  getUserByIdSuccess,
  getUserByIdError,
];
