import { authFetch } from '@helpers';
const url = 'http://localhost:3000/api/v1/customer/';

export const usersServices = {
  getAll: async (admin, query) => {
    return await authFetch.get(admin)(url, query);
  },
  delete: async (admin, data) => {
    return await authFetch.delete(admin)(url, data);
  },
  update: async (admin, data) => {
    return await authFetch.update(admin)(url, data);
  },
  create: async (admin, data) => {
    return await authFetch.create(admin)(url, data);
  },
  getById: async (admin, params) => {
    return await authFetch.getOne(admin)(url, params);
  }
};
