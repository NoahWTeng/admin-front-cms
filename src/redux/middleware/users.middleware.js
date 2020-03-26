import {
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  FETCH_USERS_PROCESS,
  DELETE_USERS_PROCESS,
  DELETE_USERS_SUCCESS,
  DELETE_USERS_ERROR,
  USER_CREATE_SUCCESS,
  USER_CREATE_ERROR,
  USER_CREATE_PROCESS,
  USER_UPDATE_PROCESS,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_ERROR,
  CHANGE_PAGINATION,
  FETCH_USER_ID_PROCCESS,
  FETCH_USER_ID_ERROR,
  FETCH_USER_ID_SUCCESS
} from '@constants';
import {
  apiRequest,
  closeModal,
  getUsersListProcess,
  setCurrentUser,
  getUserById
} from '@actions';
import { getStorage, handleRefresh, history } from '@helpers';

const URL = 'http://localhost:3000/api/v1/customer/';

export const usersProcess = ({ dispatch }) => next => action => {
  next(action);

  switch (action.type) {
    case FETCH_USERS_PROCESS:
      const { search } = window.location;
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
      dispatch(
        apiRequest(
          'DELETE',
          URL,
          { ids: action.payload },
          DELETE_USERS_SUCCESS,
          DELETE_USERS_ERROR,
          getStorage.admin().token
        )
      );
      break;
    case USER_CREATE_PROCESS:
      dispatch(
        apiRequest(
          'POST',
          URL,
          action.payload,
          USER_CREATE_SUCCESS,
          USER_CREATE_ERROR,
          getStorage.admin().token
        )
      );
      break;
    case USER_UPDATE_PROCESS:
      dispatch(
        apiRequest(
          'PUT',
          `${URL}${action.payload.paramsId}`,
          action.payload.body,
          USER_UPDATE_SUCCESS,
          USER_UPDATE_ERROR,
          getStorage.admin().token
        )
      );
      break;
    case FETCH_USER_ID_PROCCESS:
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

export const getUsersSuccess = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === FETCH_USERS_SUCCESS) {
  }
};

export const getUsersError = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === FETCH_USERS_ERROR) {
    console.log('action.payload getusers', action.payload);
  }
};

export const deleteUsersSuccess = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === DELETE_USERS_SUCCESS) {
    dispatch(getUsersListProcess());
  }
};

export const deleteUsersError = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === DELETE_USERS_ERROR) {
    console.log('action.payload delete', action.payload);
  }
};

export const createdUserSuccess = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === USER_CREATE_SUCCESS) {
    dispatch(getUsersListProcess());
    dispatch(closeModal());
  }
};

export const createdUserError = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === USER_CREATE_ERROR) {
    console.log('action.payload create', action.payload);
  }
};

export const updatedUserSuccess = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === USER_UPDATE_SUCCESS) {
    dispatch(getUsersListProcess());
    dispatch(getUserById(action.payload.docs._id));

    dispatch(closeModal());
  }
};

export const updatedUserError = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === USER_UPDATE_ERROR) {
    console.log('action.payload UPDATE', action.payload);
  }
};

export const changePaginationProcess = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === CHANGE_PAGINATION) {
    handleRefresh(
      {
        page: action.payload.current,
        limit: action.payload.pageSize
      },
      window.location,
      history
    );
    dispatch(getUsersListProcess());
  }
};

export const getUserByIdSuccess = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === FETCH_USER_ID_SUCCESS) {
    dispatch(setCurrentUser(action.payload));
  }
};

export const getUserByIdError = ({ dispatch }) => next => action => {
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
  getUserByIdError
];
