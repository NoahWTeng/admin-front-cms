import './Footer.scss';

import React, { memo } from 'react';
import { Layout } from 'antd';
import { copyright } from '@helpers';

export const Footer = memo(() => {
  return (
    <Layout.Footer className={'footer'} copyright={copyright}>
      {copyright}
    </Layout.Footer>
  );
});
