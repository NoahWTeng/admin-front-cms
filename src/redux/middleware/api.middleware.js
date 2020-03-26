import { API_REQUEST } from '@constants';

// this middleware care only for API calls
export const apiMdl = ({ dispatch }) => next => action => {
  if (action.type === API_REQUEST) {
    const { method, url, onSuccess, onError } = action.meta;

    fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: action.token || ''
      },
      body: action.payload && JSON.stringify(action.payload)
    })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        }
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      })
      .then(data => dispatch({ type: onSuccess, payload: data }))
      .catch(error => dispatch({ type: onError, payload: error }));
  }
  return next(action);
};
