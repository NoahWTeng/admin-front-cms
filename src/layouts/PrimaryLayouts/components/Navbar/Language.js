import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Avatar } from 'antd';

import { changeLanguageProcess } from '@actions';
import './Navbar.scss';

export const LanguageSwitch = ({ i18n }) => {
  const dispatch = useDispatch();

  const { language } = useSelector((state) => state.language);
  const { languages } = i18n;

  const currentLanguage = useMemo(
    () => languages.find((item) => item.key === language),
    [language]
  );
  const toggleLanguage = (data) => dispatch(changeLanguageProcess(data.key));

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
        {languages.map((item) => (
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
};
