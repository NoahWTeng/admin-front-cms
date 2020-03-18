import './index.scss';
import React, { Fragment, memo } from 'react';
import { Layout } from 'antd';

import { fixedHeader } from '@helpers';
import { Siderbar, Navbar } from './components';

export const PrimaryLayouts = memo(() => {
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
