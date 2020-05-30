import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Row, Divider } from 'antd';
import { Trans } from '@lingui/react';
import { openModal } from '@actions';
import './heades.scss';

export const Header = memo(({ pathname }) => {
  const dispatch = useDispatch();

  const toggleModalCreate = () => dispatch(openModal('Create'));

  return (
    <>
      <h2>
        {pathname ? (
          <Trans>First category list</Trans>
        ) : (
          <Trans>Second category list</Trans>
        )}
      </h2>
      <p>
        {pathname ? (
          <Trans>First category description</Trans>
        ) : (
          <Trans>Second category description</Trans>
        )}
      </p>
      <Divider style={{ marginTop: '24px', marginBottom: '24px' }} />
      <Row justify="end">
        <Button type="primary" ghost onClick={toggleModalCreate}>
          <Trans>Create</Trans>
        </Button>
      </Row>
    </>
  );
});
