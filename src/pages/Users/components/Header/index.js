import './heades.scss';
import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Row, Col, Popconfirm, Divider } from 'antd';
import { Trans } from '@lingui/react';
import { isEmpty } from 'ramda';
import { deleteUsersProcess, openModal } from '@actions';

export const Header = memo(({ i18n, selected, allUsers, pagination }) => {
  const dispatch = useDispatch();
  return (
    <>
      <h2>
        <Trans>Users list</Trans>
      </h2>
      <p>
        <Trans>Users section description</Trans>
      </p>
      <Divider style={{ marginTop: '24px', marginBottom: '24px' }} />
      <Row justify="end">
        {!isEmpty(selected) ? (
          <Col>
            {i18n.t`Selected ${selected.length} items`}
            <Popconfirm
              title={i18n.t`Are you sure to delete these items?`}
              placement="left"
              onConfirm={() =>
                dispatch(
                  deleteUsersProcess({ ids: selected, allUsers, pagination })
                )
              }
            >
              <Button type="danger" style={{ marginLeft: 8 }}>
                <Trans>Remove</Trans>
              </Button>
            </Popconfirm>
          </Col>
        ) : (
          <Button
            type="primary"
            ghost
            onClick={() => dispatch(openModal('Create'))}
          >
            <Trans>Create</Trans>
          </Button>
        )}
      </Row>
    </>
  );
});
