import './Bread.scss';
import React, { Fragment } from 'react';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { withI18n } from '@lingui/react';
import { pathMatchRegexp, queryAncestors } from '@helpers';

export const Bread = withI18n()(({ i18n }) => {
  const routesList = useSelector(state => state.language.routesList);
  const location = useLocation();

  const generateBreadcrumbs = paths => {
    return paths.map((item, key) => {
      const content = item && (
        <Fragment>
          {item.icon} {item.name}
        </Fragment>
      );
      return (
        item && (
          <Breadcrumb.Item key={key}>
            {paths.length - 1 !== key ? (
              <Link to={item.route || '#'}>{content}</Link>
            ) : (
              content
            )}
          </Breadcrumb.Item>
        )
      );
    });
  };
  // Find a route that matches the pathname.
  const currentRoute = routesList.find(
    ({ route }) => route && pathMatchRegexp(route, location.pathname)
  );
  //   Find the breadcrumb navigation of the current route match and all its ancestors.
  const paths = currentRoute
    ? queryAncestors(routesList, currentRoute, 'breadcrumbParentId').reverse()
    : [
        routesList[0],
        {
          id: 404,
          name: i18n.t`Not Found`
        }
      ];

  return (
    <Breadcrumb className={'bread'}>{generateBreadcrumbs(paths)}</Breadcrumb>
  );
});
