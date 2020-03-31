const FETCH_USERS_PROCESS = '[users] Process Get Users List';
const FETCH_USERS_ERROR = '[users] Error Get Users List';
const FETCH_USERS_SUCCESS = '[users] Success Get Users List';

const DELETE_USERS_PROCESS = '[users] Process Delete Selected Users';
const DELETE_USERS_SUCCESS = '[users] Success Deleted Selected Users';
const DELETE_USERS_ERROR = '[users] Error Selected Users Not Deleted';

const SELECT_USERS = '[users] Toggle Select User/Users';

const CREATE_USER_PROCESS = '[users] Process Create User';
const CREATE_USER_SUCCESS = '[users] Success Create User';
const CREATE_USER_ERROR = '[users] Error Create User';

const UPDATE_USER_PROCESS = '[users] Process Update User';
const UPDATE_USER_SUCCESS = '[users] Success Update User';
const UPDATE_USER_ERROR = '[users] Error Update User';

const CURRENT_USER = '[users] Target Current User';

const CHANGE_PAGINATION_USERS = '[users] Update Pagination Users';

const FETCH_USER_ID_PROCCESS = '[users] Process Get User By Id';
const FETCH_USER_ID_ERROR = '[users] Error Get User By Id';
const FETCH_USER_ID_SUCCESS = '[users] Sucess Get User By Id';

const CLEAR_ALL_STATE = '[users] Process Clear State';

export {
  FETCH_USERS_PROCESS,
  FETCH_USERS_ERROR,
  FETCH_USERS_SUCCESS,
  DELETE_USERS_PROCESS,
  DELETE_USERS_SUCCESS,
  DELETE_USERS_ERROR,
  SELECT_USERS,
  CREATE_USER_PROCESS,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  CURRENT_USER,
  CHANGE_PAGINATION_USERS,
  FETCH_USER_ID_PROCCESS,
  FETCH_USER_ID_ERROR,
  FETCH_USER_ID_SUCCESS,
  UPDATE_USER_PROCESS,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  CLEAR_ALL_STATE
};
