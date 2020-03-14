import { authType } from '@constants';
import { storage } from '@helpers';
import { authServices } from '@services';
import { message } from 'antd';

const setAdmin = admin => ({ type: authType.SUCCESS, admin });

const loginAction = data => {
  return async dispatch => {
    try {
      dispatch({ type: authType.REQUEST });
      await message.loading('Login in progress..', 1);

      const assets = await authServices.post('', data);

      if (assets && assets.data) {
        storage.set('admin', assets.data);
        await message.success('Login success!', 1);

        return dispatch(setAdmin(assets.data));
      }
    } catch ({ response }) {
      const error = response.data.message;
      await message.error('Invalid email or password!', 1);

      return dispatch({ type: authType.ERROR, error });
    }
  };
};

const logoutAction = () => {
  return async dispatch => {
    storage.clear();

    dispatch(setAdmin({}));
  };
};

export { loginAction, logoutAction, setAdmin };
