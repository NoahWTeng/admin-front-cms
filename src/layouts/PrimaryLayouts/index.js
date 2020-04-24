import './index.scss';
import React, { Fragment, Suspense } from 'react';
import { useLocation } from 'react-router-dom';

import { Layout, BackTop } from 'antd';
import { fixedHeader, pathMatchRegexp } from '@helpers';
import { Bread, Loader, Page404 } from '@components';

import { Siderbar, Navbar, Footer, Renders } from './components';
import { useSelector } from 'react-redux';

export const PrimaryLayouts = () => {
  const { routesList, renderList } = useSelector((state) => state.language);
  const location = useLocation();
  // Find a route that matches the pathname.
  const matchPath = routesList.some(
    ({ route }) => route && pathMatchRegexp(route, location.pathname)
  );
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
              {matchPath ? <Renders list={renderList} /> : <Page404 />}
            </Suspense>
          </Layout.Content>
          <BackTop
            className={'backTop'}
            target={() => document.querySelector('#primaryLayout')}
          />
          <Footer />
        </div>
      </Layout>
    </Fragment>
  );
};
