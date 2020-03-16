import './index.scss';
import React, { Fragment, Suspense, useMemo, useCallback, memo } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, BackTop } from 'antd';

import { copyright, fixedHeader, currentMenu } from '@helpers';
import { setLanguage, setCollapsed, setTheme, logoutAction } from '@actions';
import { Siderbar, Navbar } from './components';

export const PrimaryLayouts = memo(props => {
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
          <h1>Hello </h1>
        </div>
      </Layout>
    </Fragment>
  );
});
