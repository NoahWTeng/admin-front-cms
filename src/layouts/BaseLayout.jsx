import './BaseLayout.scss';
import React, { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { siteName, updatePath, queryStringToJSON } from '@helpers';

// import { changePage } from '@actions';

const BaseLayout = withRouter(({ children, location, history }) => {
  const dispatch = useDispatch();
  const { language } = useSelector(state => state.app);

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

export { BaseLayout };
