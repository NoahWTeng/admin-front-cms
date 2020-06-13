import { API_REQUEST } from '@constants';

// this middleware care only for API calls
export const apiMdl = ({ dispatch }) => (next) => (action) => {
  if (action.type === API_REQUEST) {
    const { method, url, onSuccess, onError } = action.meta;

    fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: action.token || '',
      },
      body: action.payload && JSON.stringify(action.payload),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      })
      .then((data) => dispatch({ type: onSuccess, payload: data }))
      .catch((error) => dispatch({ type: onError, payload: error }));
  }

  if (action.type === XHR_REQUEST) {
    const { method, url, onSuccess, onError } = action.meta;

    const data = new FormData();
    data.append('file', action.payload.file);

    const xhr = new XMLHttpRequest();

    xhr.onloadend = function () {
      if (xhr.status == 200) {
        const response = JSON.parse(xhr.responseText);
        dispatch({
          type: onSuccess,
          payload: response,
        });
      } else {
        dispatch({ type: onError, payload: this.status });
      }
    };

    xhr.open(method, url);

    xhr.setRequestHeader('Accept', 'application/json, text/plain, */*');
    xhr.setRequestHeader('Authorization', action.token || '');

    xhr.send(data);
  }

  return next(action);
};
