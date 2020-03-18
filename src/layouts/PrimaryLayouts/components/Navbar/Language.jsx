import './Navbar.scss';

import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Menu, Avatar } from 'antd';
import { updatePath } from '@helpers';

import { changeLanguageProcess } from '@actions';

export const LanguageSwitch = withRouter(({ location, history, i18n }) => {
  const dispatch = useDispatch();
  const { language } = useSelector(state => state.language);
  const { languages } = i18n;

  const currentLanguage = useMemo(
    () => languages.find(item => item.key === language),
    [language]
  );
  const toggleLanguage = data => {
    dispatch(changeLanguageProcess(data.key));
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
