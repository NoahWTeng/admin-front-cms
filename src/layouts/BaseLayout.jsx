import './BaseLayout.scss';
import React, { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { siteName, updatePath, queryStringToJSON } from '@helpers';

// import { changePage } from '@actions';

const Component = ({ children, location, history, changePage }) => {
  const app = useSelector(state => state.app);

  // useEffect(() => {
  //   const newPath = updatePath(location);

  //   history.push({
  //     pathname: `/${language}/${newPath}`,
  //     search: location.search
  //   });
  // }, [language]);

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
};

const BaseLayout = withRouter(Component);

export { BaseLayout };
