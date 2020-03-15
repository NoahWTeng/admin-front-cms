import './index.scss';
import React, { Fragment, Suspense, useMemo, useCallback } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, BackTop } from 'antd';

import { copyright, fixedHeader, currentMenu } from '@helpers';
import { setLanguage, setCollapsed, setTheme, logoutAction } from '@actions';
import { Siderbar, Navbar } from './components';

const routerFilter = routes => routes.filter(_ => _.menuParentId !== '-1');

const PrimaryLayouts = withRouter(props => {
  const { location } = props;
  const dispatch = useDispatch();
  const { routesList, renderList } = useSelector(state => state.app);

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
        <div
          className={'container'}
          style={{ paddingTop: fixedHeader ? 72 : 0 }}
          id="primaryLayout"
        >
          <Navbar />
          <h1>Hello </h1>
        </div>
      </Layout>
    </Fragment>
  );
});

export { PrimaryLayouts };
