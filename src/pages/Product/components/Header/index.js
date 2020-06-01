import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { Divider } from 'antd';
import { Trans } from '@lingui/react';
import './heades.scss';

export const Header = memo(({ i18n, selected, allUsers, pagination }) => {
  return (
    <>
      <h2>
        <Trans>Create product</Trans>
      </h2>
      <p>
        <Trans>Product section description</Trans>
      </p>
      <Divider style={{ marginTop: '24px', marginBottom: '24px' }} />
    </>
  );
});
