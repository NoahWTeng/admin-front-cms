import './index.scss';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { LoginForm, LoginHeader } from './components';
import { useSelector } from 'react-redux';
import { Loader } from '@components';

export const LoginPage = () => {
  const isAuth = useSelector((state) => state.admin.isAuthenticated);
  const isLoading = useSelector((state) => state.ui.isLoading);

  if (isLoading) return <Loader spinning />;

  return isAuth ? (
    <Redirect to={`/`} />
  ) : (
    <div className={'page'}>
      <div className={'page-login'}>
        <div className={'page-content'}>
          <LoginHeader />
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
