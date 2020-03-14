import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

export const AuthRoute = ({ children }) => {
  const isAuth = useSelector(state => state.auth.isAuthenticated);

  return isAuth ? children : <Redirect to="/login" />;
};
