import {
  FETCH_USERS_PROCESS,
  DELETE_USERS_PROCESS,
  SELECT_USERS,
  USER_CREATE_PROCESS,
  USER_UPDATE_PROCESS,
  CURRENT_USER,
  CHANGE_PAGINATION,
  FETCH_USER_ID_PROCCESS
} from '@constants';

const getUsersListProcess = () => ({
  type: FETCH_USERS_PROCESS
});

const deleteUsersProcess = data => ({
  type: DELETE_USERS_PROCESS,
  payload: data
});

const selectUsers = data => ({
  type: SELECT_USERS,
  payload: data
});

const createNewUser = data => ({
  type: USER_CREATE_PROCESS,
  payload: data
});

const updateUser = data => ({
  type: USER_UPDATE_PROCESS,
  payload: data
});

const setCurrentUser = data => ({
  type: CURRENT_USER,
  payload: data
});

const toggleChangePagination = data => ({
  type: CHANGE_PAGINATION,
  payload: data
});

const getUserById = data => ({
  type: FETCH_USER_ID_PROCCESS,
  payload: data
});

export {
  getUsersListProcess,
  deleteUsersProcess,
  selectUsers,
  createNewUser,
  updateUser,
  setCurrentUser,
  toggleChangePagination,
  getUserById
};
