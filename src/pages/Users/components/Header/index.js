import './heades.scss';
import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Row, Col, Popconfirm } from 'antd';
import { Trans, withI18n } from '@lingui/react';
import { isEmpty } from 'lodash';
import { deleteUsersProcess, openModal } from '@actions';

export const Header = withI18n()(
  memo(({ i18n }) => {
    const dispatch = useDispatch();
    const selected = useSelector(state => state.users.selected);

    const deleteSeletedUsers = () => {
      dispatch(deleteUsersProcess(selected));
    };

    const toggleModalCreate = () => dispatch(openModal('Create'));

    return (
      <Row justify="end">
        {!isEmpty(selected) ? (
          <Col>
            {i18n.t`Selected ${selected.length} items`}
            <Popconfirm
              title={i18n.t`Are you sure to delete these items?`}
              placement="left"
              onConfirm={deleteSeletedUsers}
            >
              <Button type="danger" style={{ marginLeft: 8 }}>
                <Trans>Remove</Trans>
              </Button>
            </Popconfirm>
          </Col>
        ) : (
          <Button type="primary" ghost onClick={toggleModalCreate}>
            <Trans>Create</Trans>
          </Button>
        )}
      </Row>
    );
  })
);
