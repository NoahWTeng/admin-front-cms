import React, { Fragment, useState, useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';
import { withRouter, Link } from 'react-router-dom';

import { arrayToTree, queryAncestors, currentMenu } from '@helpers';
const { SubMenu } = Menu;

const selected = (menus, hasMenu) =>
  queryAncestors(menus, hasMenu, 'menuParentId').map(({ id }) => id);

const SiderMenu = memo(
  withRouter(({ theme, menus, location, collapsed }) => {
    // Generating tree-structured data for menu content.
    const menuTree = useMemo(() => arrayToTree(menus, 'id', 'menuParentId'), [
      menus
    ]);

    // Find a menu that matches the pathname.
    const hasMenu = useMemo(() => currentMenu(menus, location), [
      menus,
      location
    ]);

    // Find the key that should be selected according to the current menu.
    const selectedKeys = selected(menus, hasMenu);

    const [openKeys, setOpenKeys] = useState([hasMenu.menuParentId]);

    const onOpenChange = keys => {
      const rootSubmenuKeys = menus.filter(_ => !_.menuParentId).map(_ => _.id);
      const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
      let newOpenKeys = keys;

      if (rootSubmenuKeys.indexOf(latestOpenKey) !== -1) {
        newOpenKeys = latestOpenKey ? [latestOpenKey] : [];
      }
      setOpenKeys(keys);
    };

    const generateMenus = data => {
      return data.map(item => {
        if (item.children) {
          return (
            <SubMenu
              key={item.id}
              title={
                <Fragment>
                  <span>
                    {item.icon} {item.name}
                  </span>
                </Fragment>
              }
            >
              {generateMenus(item.children)}
            </SubMenu>
          );
        }
        return (
          <Menu.Item key={item.id}>
            <Link to={item.route}>
              <span>
                {item.icon} {item.name}
              </span>
            </Link>
          </Menu.Item>
        );
      });
    };
    const menuProps = collapsed ? {} : { openKeys };

    return (
      <Menu
        mode="inline"
        theme={theme}
        onOpenChange={onOpenChange}
        defaultSelectedKeys={selectedKeys}
        {...menuProps}
      >
        {generateMenus(menuTree)}
      </Menu>
    );
  })
);

SiderMenu.propTypes = {
  menus: PropTypes.array.isRequired,
  theme: PropTypes.string.isRequired,
  location: PropTypes.object,
  collapsed: PropTypes.bool.isRequired
};

export { SiderMenu };
