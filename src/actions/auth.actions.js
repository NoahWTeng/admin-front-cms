import { authType } from '@constants';
import { storage } from '@helpers';
import { authServices } from '@services';
import { message } from 'antd';

const setAdmin = admin => ({ type: authType.SUCCESS, admin });

const loginAction = (email, password) => {
  return async dispatch => {
    try {
      dispatch({ type: authType.REQUEST, email });
      await message.loading('Login in progress..', 1.5);

      const {
        data: { success, token, userRole, userID }
      } = await authServices.post('', { email, password });

      if (success && userRole === 'SuperAdmin') {
        storage.set('admin', { token, userID });
        await message.success('Login success!', 1);

        return dispatch(
          setAdmin({
            token,
            userID
          })
        );
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

export { loginAction, logoutAction };
