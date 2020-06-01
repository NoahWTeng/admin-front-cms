import {
  FETCH_USERS_PROCESS,
  DELETE_USERS_PROCESS,
  SELECT_USERS,
  CREATE_USER_PROCESS,
  UPDATE_USER_PROCESS,
  CHANGE_PAGINATION_USERS,
  FETCH_USER_ID_PROCCESS,
  FETCH_USER_ID_SUCCESS,
} from '@constants';

const getUsersListProcess = () => ({
  type: FETCH_USERS_PROCESS,
});

const deleteUsersProcess = (data) => ({
  type: DELETE_USERS_PROCESS,
  payload: data,
});

const selectUsers = (data) => ({
  type: SELECT_USERS,
  payload: data,
});

const createNewUser = (data) => ({
  type: CREATE_USER_PROCESS,
  payload: data,
});

const updateUser = (data) => ({
  type: UPDATE_USER_PROCESS,
  payload: data,
});

const setCurrentUser = (data) => ({
  type: FETCH_USER_ID_SUCCESS,
  payload: data,
});

const toggleChangePagination = (data) => ({
  type: CHANGE_PAGINATION_USERS,
  payload: data,
});

const getUserById = (data) => ({
  type: FETCH_USER_ID_PROCCESS,
  payload: data,
});

export {
  getUsersListProcess,
  deleteUsersProcess,
  selectUsers,
  createNewUser,
  updateUser,
  setCurrentUser,
  toggleChangePagination,
  getUserById,
};
