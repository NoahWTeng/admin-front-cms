import './BaseLayout.scss';
import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { siteName } from '@helpers';

export const BaseLayout = ({ children }) => {
  return (
    <Fragment>
      <Helmet>
        <title>{siteName}</title>
      </Helmet>
      {children}
    </Fragment>
  );
};
