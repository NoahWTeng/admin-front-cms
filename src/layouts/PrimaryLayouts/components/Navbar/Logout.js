import './Navbar.scss';
import avatar from '@assets/svg/jockey.svg';

import React, { Fragment, memo } from 'react';
import { useDispatch } from 'react-redux';
import { PoweroffOutlined } from '@ant-design/icons';
import { Menu, Avatar } from 'antd';
import { Trans } from '@lingui/react';
import { logoutAdmin } from '@actions';

export const Logout = memo(() => {
  const dispatch = useDispatch();
  const handleLogout = () => dispatch(logoutAdmin());

  return (
    <Menu key="user" mode="horizontal">
      <Menu.SubMenu
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
        <Menu.Item key="SignOut" onClick={handleLogout}>
          <PoweroffOutlined />
          <Trans>Sign out</Trans>
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
});
