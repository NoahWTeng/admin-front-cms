import './BaseLayout.scss';
import React, { Fragment, useEffect, memo } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import { siteName, updatePath, queryStringToJSON } from '@helpers';

// import { changePage } from '@actions';

export const BaseLayout = memo(({ children }) => {
  // useEffect(() => {
  //   const pages = queryStringToJSON(location.search);
  //   pages.page ? changePage(pages) : changePage({ page: 1, limit: 10 });
  // }, [location.search, location.pathname]);

  return (
    <Fragment>
      <Helmet>
        <title>{siteName}</title>
      </Helmet>
      {children}
    </Fragment>
  );
});
