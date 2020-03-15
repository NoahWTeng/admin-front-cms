import React, { lazy } from 'react';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const Users = lazy(() => import('../pages/Users'));
const UserDetail = lazy(() => import('../pages/Users/components/UserDetails'));

export const RenderList = language => {
  return [
    {
      path: `/${language}/`,
      component: Dashboard
    },
    {
      path: `/${language}/user`,
      component: Users
    },
    {
      path: `/${language}/user/:id`,
      component: UserDetail
    }
  ];
};
