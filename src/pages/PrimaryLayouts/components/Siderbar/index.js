import './Siderbar.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { Layout, Switch } from 'antd';
import { BulbOutlined } from '@ant-design/icons';
import { Trans } from '@lingui/react';

import { ScrollBar } from '@components';
import logoLight from '@assets/images/logo-light.png';
import logoDark from '@assets/images/logo-dark.png';
import { setTheme } from '@actions';
import { SiderMenu } from './Menu';

const { Sider } = Layout;

const Siderbar = ({ menus }) => {
  const dispatch = useDispatch();
  const { theme, collapsed } = useSelector(state => state.app);
  const onThemeChange = value => dispatch(setTheme(value));

  return (
    <Sider
      width={256}
      theme={theme}
      breakpoint="lg"
      trigger={null}
      collapsible
      collapsed={collapsed}
      className={'sider'}
    >
      <div className={'brand'}>
        <div className={'logo'}>
          <img src={theme === 'dark' ? logoLight : logoDark} alt="logo" />
        </div>
      </div>

      <div className={'menuContainer'}>
        <ScrollBar
          options={{
            // Disabled horizontal scrolling, https://github.com/utatti/perfect-scrollbar#options
            suppressScrollX: true
          }}
        >
          <SiderMenu menus={menus} theme={theme} collapsed={collapsed} />
        </ScrollBar>
      </div>

      {!collapsed && (
        <div className={'switchTheme'}>
          <span className={theme === 'dark' ? 'dark' : 'light'}>
            <BulbOutlined />
            <Trans>Switch Theme</Trans>
          </span>
          <Switch
            onChange={onThemeChange}
            defaultChecked={theme === 'dark'}
            checkedChildren={<Trans>Dark</Trans>}
            unCheckedChildren={<Trans>Light</Trans>}
          />
        </div>
      )}
    </Sider>
  );
};

Siderbar.prototypes = {
  menus: PropTypes.array.isRequired
};

export { Siderbar };
