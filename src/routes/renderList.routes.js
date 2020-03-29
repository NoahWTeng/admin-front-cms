import { lazy } from 'react';
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Users = lazy(() => import('../pages/Users'));
const UserDetail = lazy(() => import('../pages/Users/components/UserDetails'));
const FirstCategory = lazy(() => import('../pages/Categories/First'));

export const RenderList = language => {
  return [
    {
      path: `/`,
      component: Dashboard
    },
    {
      path: `/${language}/user`,
      component: Users
    },
    {
      path: `/${language}/user/:id`,
      component: UserDetail
    },
    {
      path: `/${language}/categories/first`,
      component: FirstCategory
    }
  ];
};
