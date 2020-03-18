import './index.scss';
import React, { Fragment, Suspense, useMemo } from 'react';
import { Route, withRouter } from 'react-router-dom';

import { Layout, BackTop } from 'antd';
import { fixedHeader, pathMatchRegexp, copyright } from '@helpers';
import { Bread, Loader, Page404 } from '@components';

import { Siderbar, Navbar } from './components';
import { useSelector } from 'react-redux';

const renders = list =>
  list.map((r, key) => {
    return (
      <Route
        component={r.component}
        exact={true}
        key={r.path + key}
        path={r.path}
      />
    );
  });

export const PrimaryLayouts = withRouter(({ location }) => {
  const { routesList, renderList } = useSelector(state => state.language);

  // Find a route that matches the pathname.
  const matchPath = !!routesList.find(
    ({ route }) => route && pathMatchRegexp(route, location.pathname)
  );

  const rendersComponent = useMemo(() => renders(renderList), [renderList]);

  return (
    <Fragment>
      <Layout>
        <Siderbar />
        <div
          className={'container'}
          style={{ paddingTop: fixedHeader ? 72 : 0 }}
          id="primaryLayout"
        >
          <Navbar />
          <Layout.Content className={'content'}>
            <Bread />
            <Suspense fallback={<Loader />}>
              {matchPath ? rendersComponent : <Page404 />}
            </Suspense>
          </Layout.Content>
          <BackTop
            className={'backTop'}
            target={() => document.querySelector('#primaryLayout')}
          />
          <Layout.Footer className={'footer'} copyright={copyright}>
            {copyright}
          </Layout.Footer>
        </div>
      </Layout>
    </Fragment>
  );
});
