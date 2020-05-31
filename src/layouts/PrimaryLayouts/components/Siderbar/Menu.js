import React, { Fragment, useState, useMemo, memo } from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { arrayToTree, queryAncestors, currentMenu } from '@helpers';

const selected = (menus, hasMenu) =>
  queryAncestors(menus, hasMenu, 'menuParentId').map(({ id }) => id);

const routerFilter = (routes) => routes.filter((_) => _.menuParentId !== '-1');

const generateMenus = (data) => {
  return data.map((item) => {
    if (item.children) {
      return (
        <Menu.SubMenu
          key={item.id}
          title={
            <Fragment>
              {item.icon}
              <span>{item.name}</span>
            </Fragment>
          }
        >
          {generateMenus(item.children)}
        </Menu.SubMenu>
      );
    }
    return (
      <Menu.Item key={item.id}>
        <Link to={item.route}>
          {item.icon}
          <span>{item.name}</span>
        </Link>
      </Menu.Item>
    );
  });
};

export const SiderMenu = memo(({ isCollapsed, isDarkTheme }) => {
  const location = useLocation();

  const routesList = useSelector((state) => state.language.routesList);
  // Check query page is exists
  const menus = useMemo(() => routerFilter(routesList), [routesList]);
  // // Generating tree-structured data for menu content.
  const menuTree = useMemo(() => arrayToTree(menus, 'id', 'menuParentId'), [
    menus,
  ]);

  // // Find a menu that matches the pathname.
  const hasMenu = useMemo(() => currentMenu(menus, location), [
    menus,
    location,
  ]);

  // Find the key that should be selected according to the current menu.
  const selectedKeys = !!hasMenu && selected(menus, hasMenu);

  // Find the key if selectedKeys is empty.
  const deepFindSelectedKeys = menus
    .map(({ route, id }) => {
      if (route) {
        const pathRoute = route.split('/').splice(1);
        const pathName = location.pathname.split('/').splice(2);
        const checker = pathName.some((name) => pathRoute.includes(name));
        if (checker) {
          return id;
        }
      }
    })
    .filter((data) => data !== undefined);

  const [openKeys, setOpenKeys] = useState(
    [hasMenu && hasMenu.menuParentId] || []
  );

  const onOpenChange = (keys) => {
    const rootSubmenuKeys = menus
      .filter((_) => !_.menuParentId)
      .map((_) => _.id);
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    let newOpenKeys = keys;
    if (rootSubmenuKeys.indexOf(latestOpenKey) !== -1) {
      newOpenKeys = [latestOpenKey] || [];
    }
    setOpenKeys(keys);
  };

  const menuProps = isCollapsed ? {} : { openKeys };

  const generateTree = useMemo(() => generateMenus(menuTree), [menuTree]);

  return (
    <Menu
      mode="inline"
      theme={isDarkTheme ? 'dark' : 'light'}
      onOpenChange={onOpenChange}
      selectedKeys={selectedKeys || deepFindSelectedKeys}
      {...menuProps}
    >
      {generateTree}
    </Menu>
  );
});
