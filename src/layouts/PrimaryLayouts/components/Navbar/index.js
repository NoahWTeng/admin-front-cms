import './Navbar.scss';

import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import classnames from 'classnames';

import { toggleSidebarCollapsed } from '@actions';
import { fixedHeader } from '@helpers';

import { RightContent } from './RightContent';

export const Navbar = memo(() => {
  const isCollapsed = useSelector((state) => state.ui.isCollapsed);
  const dispatch = useDispatch();
  const toggleCollapse = () => dispatch(toggleSidebarCollapsed(!isCollapsed));

  return (
    <Layout.Header
      className={classnames('header', {
        ['fixed']: fixedHeader,
        ['collapsed']: isCollapsed,
      })}
      id="layoutHeader"
    >
      <div className={'button'} onClick={toggleCollapse}>
        {isCollapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
      </div>
      <RightContent />
    </Layout.Header>
  );
});
