import './Bread.scss';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { withI18n } from '@lingui/react';
import { pathMatchRegexp, queryAncestors } from '@helpers';

const Component = ({ routeList, location, i18n }) => {
  const generateBreadcrumbs = paths => {
    return paths.map((item, key) => {
      const content = item && (
        <Fragment>
          {item.icon && (
            <Icon
              type={item.icon}
              style={{
                marginRight: 4
              }}
            />
          )}
          {item.name}
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
  const currentRoute = routeList.find(
    _ => _.route && pathMatchRegexp(_.route, location.pathname)
  );
  //   Find the breadcrumb navigation of the current route match and all its ancestors.
  const paths = currentRoute
    ? queryAncestors(routeList, currentRoute, 'breadcrumbParentId').reverse()
    : [
        routeList[0],
        {
          id: 404,
          name: i18n.t`Not Found`
        }
      ];
  return (
    <Breadcrumb className={'bread'}>{generateBreadcrumbs(paths)}</Breadcrumb>
  );
};

Component.propTypes = {
  routeList: PropTypes.array
};

export const Bread = withRouter(withI18n()(Component));
