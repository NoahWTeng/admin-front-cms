import React from 'react';
import { Tag } from 'antd';
import { Link } from 'react-router-dom';

import { DropMenuDown } from '@components';
import { Trans } from '@lingui/react';

const styles = {
  align: 'left',
  ellipsis: true,
};

export const columns = (i18n, getColumnSearchProps, handleOperation) => {
  return [
    {
      title: <Trans>UserName</Trans>,
      dataIndex: `firstName`,
      key: 'name',
      fixed: 'left',
      ...styles,
      render: (text, record) => (
        <Link to={`user/${record._id}`}>
          {`${record.firstName} ${record.lastName1}`}
        </Link>
      ),
    },
    {
      title: <Trans>Email</Trans>,
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
      ...styles,
    },
    {
      title: <Trans>Phone</Trans>,
      dataIndex: 'phone',
      key: 'phone',
      ...getColumnSearchProps('phone'),
      ...styles,
    },
    {
      title: <Trans>Range</Trans>,
      key: 'range',
      dataIndex: 'range',
      ...styles,
      render: (range) => (
        <span>
          <Tag color={range === 'particular' ? 'blue' : 'green'} key={range}>
            {range === 'particular' ? i18n.t`Particular` : i18n.t`Professional`}
          </Tag>
        </span>
      ),
    },
    {
      title: <Trans>Company</Trans>,
      dataIndex: 'company',
      key: 'company',
      ...styles,
      ...getColumnSearchProps('company'),
    },
    {
      title: <Trans>TaxType</Trans>,
      dataIndex: 'taxType',
      key: 'taxType',
      ...styles,
      render: (range) => (
        <span>
          <Tag color={'blue'} key={range}>
            {range}
          </Tag>
        </span>
      ),
    },
    {
      title: <Trans>TaxNumber</Trans>,
      dataIndex: 'taxNumber',
      key: 'taxNumber',
      ...styles,
      ...getColumnSearchProps('taxNumber'),
    },
    {
      title: <Trans>BillAddress</Trans>,
      dataIndex: 'street',
      key: 'street',
      ...styles,
    },
    {
      title: <Trans>PostalCode</Trans>,
      dataIndex: 'postCode',
      key: 'postCode',
      ...styles,
    },
    {
      title: <Trans>Town</Trans>,
      dataIndex: 'town',
      key: 'town',
      ...styles,
    },
    {
      title: <Trans>Province</Trans>,
      dataIndex: 'city',
      key: 'city',
      ...styles,
    },
    {
      title: <Trans>Country</Trans>,
      dataIndex: 'country',
      key: 'country',
      ...styles,
    },
    {
      title: <Trans>CreateTime</Trans>,
      dataIndex: 'createdAt',
      key: 'createdAt',
      ...styles,
    },
    {
      title: <Trans>Operation</Trans>,
      key: 'operation',
      fixed: 'right',
      ...styles,
      render: (text, record) => {
        return (
          <DropMenuDown
            onMenuClick={(e) => handleOperation(record, e)}
            menuOptions={[
              {
                key: 'Update',
                name: i18n.t`Update`,
              },
              { key: 'Remove', name: i18n.t`Remove` },
            ]}
          />
        );
      },
    },
  ];
};
