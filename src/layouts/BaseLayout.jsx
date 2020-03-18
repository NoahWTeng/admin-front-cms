import './BaseLayout.scss';
import React, { Fragment, memo } from 'react';
import { Helmet } from 'react-helmet';
import { siteName } from '@helpers';

export const BaseLayout = memo(({ children }) => {
  return (
    <Fragment>
      <Helmet>
        <title>{siteName}</title>
      </Helmet>
      {children}
    </Fragment>
  );
});
