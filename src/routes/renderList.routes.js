import { lazy } from 'react';
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Users = lazy(() => import('../pages/Users'));
const UserDetail = lazy(() => import('../pages/Users/components/UserDetails'));
const Catalog = lazy(() => import('../pages/Categories'));
const Products = lazy(() => import('../pages/Products'));

export const RenderList = (language) => {
  return [
    {
      path: `/`,
      component: Dashboard,
    },
    {
      path: `/${language}/user`,
      component: Users,
    },
    {
      path: `/${language}/user/:id`,
      component: UserDetail,
    },
    {
      path: `/${language}/categories/first`,
      component: Catalog,
    },
    {
      path: `/${language}/categories/second`,
      component: Catalog,
    },
    {
      path: `/${language}/products`,
      component: Products,
    },
  ];
};
