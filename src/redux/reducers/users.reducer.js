import {
  FETCH_USERS_SUCCESS,
  DELETE_USERS_SUCCESS,
  SELECT_USERS,
  CURRENT_USER,
  CHANGE_PAGINATION,
  FETCH_USER_ID_ERROR
} from '@constants';
import moment from 'moment';

const initialState = {
  allUsers: [],
  currentUser: {},
  selected: [],
  pagination: {},
  error: null
};

export const users = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        allUsers: action.payload.docs.map(user => ({
          ...user,
          createdAt: moment(user.createdAt).format('LL'),
          updatedAt: moment(user.updatedAt).format('LL')
        })),
        pagination: {
          total: action.payload.total,
          pageSize: action.payload.limit,
          current: action.payload.page,
          pages: action.payload.pages,
          showSizeChanger: true,
          showQuickJumper: false
        },
        error: null
      };
    case DELETE_USERS_SUCCESS:
      const { nodeData } = action.payload;
      return {
        ...state,
        allUsers: state.allUsers.filter(user => !nodeData.includes(user._id)),
        selected: []
      };

    case SELECT_USERS:
      return {
        ...state,
        selected: action.payload
      };
    case CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      };
    case CHANGE_PAGINATION:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          pageSize: action.payload.pageSize,
          current: action.payload.current
        }
      };
    case FETCH_USER_ID_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
