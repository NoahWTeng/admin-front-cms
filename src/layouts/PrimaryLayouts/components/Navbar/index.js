import './Navbar.scss';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import classnames from 'classnames';

import { setCollapsed } from '@actions';
import { fixedHeader } from '@helpers';

import { RightContent } from './RightContent';

export const Navbar = () => {
  const { collapsed } = useSelector(state => state.app);
  const dispatch = useDispatch();

  const toggleCollapse = () => dispatch(setCollapsed(!collapsed));
  return (
    <Layout.Header
      className={classnames('header', {
        ['fixed']: fixedHeader,
        ['collapsed']: collapsed
      })}
      id="layoutHeader"
    >
      <div className={'button'} onClick={toggleCollapse}>
        {collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
      </div>
      <RightContent />
    </Layout.Header>
  );
};
