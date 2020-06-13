import { API_REQUEST, XHR_REQUEST } from '@constants';

export const apiRequest = (method, url, body, onSuccess, onError, token) => ({
  type: API_REQUEST,
  payload: body,
  meta: { method, url, onSuccess, onError },
  token,
});

export const xhrRequest = (method, url, body, onSuccess, onError, token) => ({
  type: XHR_REQUEST,
  payload: body,
  meta: { method, url, onSuccess, onError },
  token,
});
