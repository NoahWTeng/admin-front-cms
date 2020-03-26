import React from 'react';
import { Tag } from 'antd';
import { DropMenuDown } from '@components';
import { Trans } from '@lingui/react';
export const columns = (i18n, getColumnSearchProps, handleOperation) => {
  return [
    {
      title: <Trans>Name</Trans>,
      dataIndex: `fullName`,
      key: 'name',
      fixed: 'left',
      ...getColumnSearchProps('fullName')
    },
    {
      title: <Trans>Company</Trans>,
      dataIndex: ['billAddress', 'company'],
      key: 'company',
      ...getColumnSearchProps('billAddress.company')
    },
    {
      title: <Trans>TaxType</Trans>,
      dataIndex: ['billAddress', 'taxType'],
      key: 'taxType',
      render: range => (
        <span>
          <Tag color={'blue'} key={range}>
            {range}
          </Tag>
        </span>
      )
    },
    {
      title: <Trans>TaxNumber</Trans>,
      dataIndex: ['billAddress', 'taxNumber'],
      key: 'taxNumber',
      ...getColumnSearchProps('billAddress.taxNumber')
    },
    {
      title: <Trans>BillAddress</Trans>,
      dataIndex: ['billAddress', 'street'],
      key: 'street'
    },
    {
      title: <Trans>PostalCode</Trans>,
      dataIndex: ['billAddress', 'postCode'],
      key: 'postCode'
    },
    {
      title: <Trans>Town</Trans>,
      dataIndex: ['billAddress', 'town'],
      key: 'town'
    },
    {
      title: <Trans>Province</Trans>,
      dataIndex: ['billAddress', 'city'],
      key: 'city'
    },
    {
      title: <Trans>Country</Trans>,
      dataIndex: ['billAddress', 'country'],
      key: 'country'
    },
    {
      title: <Trans>Phone</Trans>,
      dataIndex: 'phone',
      key: 'phone',
      ...getColumnSearchProps('phone')
    },
    {
      title: <Trans>Email</Trans>,
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email')
    },
    {
      title: <Trans>Range</Trans>,
      key: 'range',
      dataIndex: 'range',
      render: range => (
        <span>
          <Tag color={range === 'particular' ? 'blue' : 'green'} key={range}>
            {range === 'particular' ? i18n.t`Particular` : i18n.t`Professional`}
          </Tag>
        </span>
      )
    },
    {
      title: <Trans>CreateTime</Trans>,
      dataIndex: 'createdAt',
      key: 'createdAt'
    },
    {
      title: <Trans>Operation</Trans>,
      key: 'operation',
      fixed: 'right',
      render: (text, record) => {
        return (
          <DropMenuDown
            onMenuClick={e => handleOperation(record, e)}
            menuOptions={[
              {
                key: 'Update',
                name: i18n.t`Update`
              },
              { key: 'Remove', name: i18n.t`Remove` }
            ]}
          />
        );
      }
    }
  ];
};
