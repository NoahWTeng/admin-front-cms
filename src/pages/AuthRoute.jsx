import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const AuthRoute = ({ children }) => {
  const isAuth = useSelector(state => state.admin.isAuthenticated);

  return isAuth ? children : <Redirect to="/login" />;
};
