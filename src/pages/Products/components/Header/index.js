import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { Button, Row, Col, Popconfirm, Divider } from 'antd';
import { Trans } from '@lingui/react';
import { isEmpty } from 'ramda';
import { deleteProductsProcess } from '@actions';
import './heades.scss';

export const Header = memo(({ i18n, selected, products, pagination }) => {
  const dispatch = useDispatch();
  return (
    <>
      <h2>
        <Trans>Products List</Trans>
      </h2>
      <p>
        <Trans>Products section description</Trans>
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
                  deleteProductsProcess({
                    ids: selected,
                    products,
                    pagination,
                  })
                )
              }
            >
              <Button type="danger" style={{ marginLeft: 8 }}>
                <Trans>Remove</Trans>
              </Button>
            </Popconfirm>
          </Col>
        ) : (
          <Button type="primary" ghost>
            <Link to={`products/create`}>
              <Trans>Create</Trans>
            </Link>
          </Button>
        )}
      </Row>
    </>
  );
});
