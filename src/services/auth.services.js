import { authFetch } from '@helpers';
const url = 'http://localhost:3000/api/v1/admin/auth/login';

export const authServices = {
  post: async (admin, data) => {
    return await authFetch.login(admin)(url, data);
  }
};
