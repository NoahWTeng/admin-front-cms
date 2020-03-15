import './index.scss';
import React, { Fragment, Suspense, useMemo, useCallback } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, BackTop } from 'antd';

import { copyright, fixedHeader, currentMenu } from '@helpers';
import { setLanguage, setCollapsed, setTheme, logoutAction } from '@actions';
import { Siderbar } from './components';

const routerFilter = routes => routes.filter(_ => _.menuParentId !== '-1');

const PrimaryLayouts = withRouter(props => {
  const { location } = props;
  const dispatch = useDispatch();
  const { routesList, renderList } = useSelector(state => state.app);

  const handleLogout = () => dispatch(logoutAction());

  // Find a route that matches the pathname.
  const hasPage = useMemo(() => currentMenu(routesList, location), [
    routesList,
    location
  ]);

  // Check query page is exists
  const menus = useMemo(() => routerFilter(routesList), [routesList]);

  return (
    <Fragment>
      <Layout>
        <Siderbar menus={menus} />
        <h1>Hello </h1>
      </Layout>
    </Fragment>
  );
});

export { PrimaryLayouts };
