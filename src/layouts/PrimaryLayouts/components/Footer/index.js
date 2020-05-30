import React, { memo } from 'react';
import { Layout } from 'antd';
import { copyright } from '@helpers';
import './Footer.scss';

export const Footer = memo(() => {
  return (
    <Layout.Footer className={'footer'} copyright={copyright}>
      {copyright}
    </Layout.Footer>
  );
});
