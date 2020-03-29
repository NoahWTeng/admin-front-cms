import './heades.scss';
import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Row, Col, Popconfirm, Divider } from 'antd';
import { Trans, withI18n } from '@lingui/react';
import { isEmpty } from 'lodash';
import { deleteUsersProcess, openModal } from '@actions';

export const Header = withI18n()(
  memo(({ i18n }) => {
    const dispatch = useDispatch();
    const selected = useSelector(state => state.users.selected);

    return (
      <>
        <h2>
          <Trans>First category list</Trans>
        </h2>
        <p>
          <Trans>First category description</Trans>
        </p>
        <Divider style={{ marginTop: '24px', marginBottom: '24px' }} />
        <Row justify="end">
          <Button type="primary" ghost>
            <Trans>Create</Trans>
          </Button>
        </Row>
      </>
    );
  })
);
