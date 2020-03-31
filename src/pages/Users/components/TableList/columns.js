import React from 'react';
import { Tag } from 'antd';
import { DropMenuDown } from '@components';
import { Trans } from '@lingui/react';

const styles = {
  align: 'left',
  ellipsis: true,
  textWrap: 'word-break'
};

export const columns = (i18n, getColumnSearchProps, handleOperation) => {
  return [
    {
      title: <Trans>UserName</Trans>,
      dataIndex: `fullName`,
      key: 'name',
      fixed: 'left',
      ...styles,
      ...getColumnSearchProps('fullName')
    },
    {
      title: <Trans>Company</Trans>,
      dataIndex: ['billAddress', 'company'],
      key: 'company',
      ...styles,
      ...getColumnSearchProps('billAddress.company')
    },
    {
      title: <Trans>TaxType</Trans>,
      dataIndex: ['billAddress', 'taxType'],
      key: 'taxType',
      ...styles,
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
      ...styles,
      ...getColumnSearchProps('billAddress.taxNumber')
    },
    {
      title: <Trans>BillAddress</Trans>,
      dataIndex: ['billAddress', 'street'],
      key: 'street',
      ...styles
    },
    {
      title: <Trans>PostalCode</Trans>,
      dataIndex: ['billAddress', 'postCode'],
      key: 'postCode',
      ...styles
    },
    {
      title: <Trans>Town</Trans>,
      dataIndex: ['billAddress', 'town'],
      key: 'town',
      ...styles
    },
    {
      title: <Trans>Province</Trans>,
      dataIndex: ['billAddress', 'city'],
      key: 'city',
      ...styles
    },
    {
      title: <Trans>Country</Trans>,
      dataIndex: ['billAddress', 'country'],
      key: 'country',
      ...styles
    },
    {
      title: <Trans>Phone</Trans>,
      dataIndex: 'phone',
      key: 'phone',
      ...getColumnSearchProps('phone'),
      ...styles
    },
    {
      title: <Trans>Email</Trans>,
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
      ...styles
    },
    {
      title: <Trans>Range</Trans>,
      key: 'range',
      dataIndex: 'range',
      ...styles,
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
      key: 'createdAt',
      ...styles
    },
    {
      title: <Trans>Operation</Trans>,
      key: 'operation',
      fixed: 'right',
      ...styles,
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
