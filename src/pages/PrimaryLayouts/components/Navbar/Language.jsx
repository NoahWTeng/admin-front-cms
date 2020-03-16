import './Navbar.scss';

import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Menu, Avatar } from 'antd';

import { setLanguage } from '@actions';
import { updatePath } from '@helpers';

export const LanguageSwitch = withRouter(({ location, history, i18n }) => {
  const { languages } = i18n;
  const { language } = useSelector(state => state.app);
  const dispatch = useDispatch();

  const currentLanguage = useMemo(
    () => languages.find(item => item.key === language),
    [language]
  );

  const toggleLanguage = data => {
    const loadCatalog = async language => {
      const catalog = await import(
        /* webpackMode: "lazy", webpackChunkName: "i18n-[index]" */
        `@lingui/loader!../../../../../src/locales/${language}/messages.json`
      );
      dispatch(setLanguage({ language, catalog }));
    };
    loadCatalog(data.key);
    const newPath = updatePath(location);
    history.push({
      pathname: `/${data.key}/${newPath}`,
      search: location.search
    });
  };
  return (
    <Menu
      key="language"
      selectedKeys={[currentLanguage.key]}
      onClick={toggleLanguage}
      mode="horizontal"
    >
      <Menu.SubMenu
        title={<Avatar size="small" src={currentLanguage.flag.default} />}
      >
        {languages.map(item => (
          <Menu.Item key={item.key}>
            <Avatar
              size="small"
              style={{ marginRight: 8 }}
              src={item.flag.default}
            />
            {item.title}
          </Menu.Item>
        ))}
      </Menu.SubMenu>
    </Menu>
  );
});
