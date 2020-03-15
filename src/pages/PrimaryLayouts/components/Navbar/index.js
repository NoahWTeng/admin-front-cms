import './Navbar.scss';
import React, { Fragment, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PoweroffOutlined
} from '@ant-design/icons';
import { withRouter } from 'react-router-dom';

import { Layout, Menu, Avatar } from 'antd';
import { Trans } from '@lingui/react';
import { i18n } from '@helpers';
import avatar from '@assets/svg/jockey.svg';
import classnames from 'classnames';
import { setLanguage, setCollapsed, logoutAction } from '@actions';
import { fixedHeader, updatePath } from '@helpers';

const { Header } = Layout;
const { Item, SubMenu } = Menu;

export const Navbar = withRouter(({ location, history }) => {
  const { collapsed, language } = useSelector(state => state.app);
  const dispatch = useDispatch();

  const handleLogout = () => dispatch(logoutAction());

  const toggleCollapse = () => dispatch(setCollapsed(!collapsed));

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

  const rightContent = [
    <Menu key="user" mode="horizontal">
      <SubMenu
        title={
          <Fragment>
            <span style={{ color: '#999', marginRight: 4 }}>
              <Trans>Hi,</Trans>
            </span>
            <span>Noah Wang</span>
            <Avatar style={{ marginLeft: 8 }} src={avatar} />
          </Fragment>
        }
      >
        <Item key="SignOut" onClick={handleLogout}>
          <PoweroffOutlined />
          <Trans>Sign out</Trans>
        </Item>
      </SubMenu>
    </Menu>
  ];

  if (i18n) {
    const { languages } = i18n;
    const currentLanguage = useMemo(
      () => languages.find(item => item.key === language),
      [language]
    );

    rightContent.unshift(
      <Menu
        key="language"
        selectedKeys={[currentLanguage.key]}
        onClick={toggleLanguage}
        mode="horizontal"
      >
        <SubMenu
          title={<Avatar size="small" src={currentLanguage.flag.default} />}
        >
          {languages.map(item => (
            <Item key={item.key}>
              <Avatar
                size="small"
                style={{ marginRight: 8 }}
                src={item.flag.default}
              />
              {item.title}
            </Item>
          ))}
        </SubMenu>
      </Menu>
    );
  }

  return (
    <Header
      className={classnames('header', {
        ['fixed']: fixedHeader,
        ['collapsed']: collapsed
      })}
      id="layoutHeader"
    >
      <div className={'button'} onClick={toggleCollapse}>
        {collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
      </div>

      <div className={'rightContainer'}>{rightContent}</div>
    </Header>
  );
});
