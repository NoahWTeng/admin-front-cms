import './index.scss';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { LoginForm, LoginHeader } from './components';
import { useSelector } from 'react-redux';

const LoginPage = () => {
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const lang = useSelector(state => state.app.language);
  return isAuth ? (
    <Redirect to={`/${lang ? lang : 'en'}/`} />
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

export { LoginPage };
