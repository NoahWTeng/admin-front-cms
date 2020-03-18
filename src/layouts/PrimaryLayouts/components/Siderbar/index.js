import './Siderbar.scss';
import logoLight from '@assets/images/logo-light.png';
import logoDark from '@assets/images/logo-dark.png';

import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Switch } from 'antd';
import { BulbOutlined, BulbFilled } from '@ant-design/icons';
import { Trans } from '@lingui/react';

import { ScrollBar } from '@components';
import { switchThemesSibebar } from '@actions';
import { SiderMenu } from './Menu';

export const Siderbar = memo(() => {
  const dispatch = useDispatch();
  const { isCollapsed, isDarkTheme } = useSelector(state => state.ui);
  const onThemeChange = value => dispatch(switchThemesSibebar(value));

  return (
    <Layout.Sider
      width={256}
      theme={isDarkTheme ? 'dark' : 'light'}
      breakpoint="lg"
      trigger={null}
      collapsible
      collapsed={isCollapsed}
      className={'sider'}
    >
      <div className={'brand'}>
        <div className={'logo'}>
          <img src={isDarkTheme ? logoLight : logoDark} alt="logo" />
        </div>
      </div>

      <div className={'menuContainer'}>
        <ScrollBar
          options={{
            // Disabled horizontal scrolling, https://github.com/utatti/perfect-scrollbar#options
            suppressScrollX: true
          }}
        >
          <SiderMenu />
        </ScrollBar>
      </div>

      {!isCollapsed ? (
        <div className={'switchTheme'}>
          <span className={isDarkTheme ? 'dark' : 'light'}>
            <BulbOutlined />
            <Trans>Switch Theme</Trans>
          </span>
          <Switch
            onChange={onThemeChange}
            defaultChecked={isDarkTheme}
            checkedChildren={<Trans>Dark</Trans>}
            unCheckedChildren={<Trans>Light</Trans>}
          />
        </div>
      ) : (
        <div className={'switchTheme'}>
          <Switch
            onChange={onThemeChange}
            defaultChecked={isDarkTheme}
            checkedChildren={<BulbOutlined />}
            unCheckedChildren={<BulbFilled />}
          />
        </div>
      )}
    </Layout.Sider>
  );
});
