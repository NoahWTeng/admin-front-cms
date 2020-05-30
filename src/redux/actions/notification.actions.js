import {
  DELETE_NOTIFICATION_SUCCESS,
  DELETE_NOTIFICATION_ERROR,
  CREATE_NOTIFICATION_SUCCESS,
  CREATE_NOTIFICATION_ERROR,
  UPDATE_NOTIFICATION_SUCCESS,
  UPDATE_NOTIFICATION_ERROR,
  CLEAR_NOTIFICATION,
} from '@constants';

const successCreateNotification = () => ({
  type: CREATE_NOTIFICATION_SUCCESS,
});
const errorCreateNotification = () => ({
  type: CREATE_NOTIFICATION_ERROR,
});
const successUpdateNotification = () => ({
  type: UPDATE_NOTIFICATION_SUCCESS,
});
const errorUpdateNotification = () => ({
  type: UPDATE_NOTIFICATION_ERROR,
});
const successDeleteNotification = () => ({
  type: DELETE_NOTIFICATION_SUCCESS,
});
const errorDeleteNotification = () => ({
  type: DELETE_NOTIFICATION_ERROR,
});
const clearNotification = () => ({
  type: CLEAR_NOTIFICATION,
});
export {
  successCreateNotification,
  errorCreateNotification,
  successUpdateNotification,
  errorUpdateNotification,
  successDeleteNotification,
  errorDeleteNotification,
  clearNotification,
};
