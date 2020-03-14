import axios from 'axios';

export const authFetch = {
  get: admin => {
    return (url, query) => {
      return axios
        .create({
          headers: {
            authorization: admin ? admin : null
          }
        })
        .get(query ? `${url}?${query}` : `${url}`, {});
    };
  },
  getOne: admin => {
    return (url, params) => {
      return axios
        .create({
          headers: {
            authorization: admin ? admin : null
          }
        })
        .get(`${url}${params}`);
    };
  },
  delete: admin => {
    return (url, data) => {
      return axios
        .create({
          headers: {
            authorization: admin ? admin : null
          },
          data: { data }
        })
        .delete(`${url}`);
    };
  },
  update: admin => {
    return (url, { id, ...data }) => {
      return axios
        .create({
          headers: {
            authorization: admin ? admin : null
          }
        })
        .put(`${url}${id}`, data);
    };
  },
  create: admin => {
    return (url, data) => {
      return axios
        .create({
          headers: {
            authorization: admin ? admin : null
          }
        })
        .post(`${url}create`, data);
    };
  },
  login: admin => {
    return (url, data) => {
      return axios
        .create({
          headers: {
            authorization: admin ? admin : null
          }
        })
        .post(`${url}`, data);
    };
  }
};
