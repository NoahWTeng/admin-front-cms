import React from 'react';
import { Tag } from 'antd';
import { Link } from 'react-router-dom';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import { DropMenuDown } from '@components';
import { Trans } from '@lingui/react';

const styles = {
  align: 'left',
  ellipsis: true,
};
const fontCircleSize = { fontSize: '22px' };

export const columns = (i18n, getColumnSearchProps, handleOperation) => {
  return [
    {
      title: <Trans>Availability</Trans>,
      dataIndex: 'availability',
      key: 'availability',
      render: (text, record) =>
        record.availability ? (
          <CheckCircleTwoTone twoToneColor="#52c41a" style={fontCircleSize} />
        ) : (
          <CloseCircleTwoTone twoToneColor="#eb2f96" style={fontCircleSize} />
        ),
    },
    {
      title: <Trans>Product</Trans>,
      dataIndex: `title`,
      key: 'title',
      ...styles,
      render: (text, record) => (
        <Link to={`product/${record._id}`}>{`${record.title}`}</Link>
      ),
    },
    {
      title: <Trans>Category</Trans>,
      dataIndex: 'category',
      key: 'category',
      ...getColumnSearchProps('category'),
      ...styles,
    },
    {
      title: <Trans>Sku</Trans>,
      dataIndex: 'sku',
      key: 'sku',
      ...getColumnSearchProps('sku'),
      ...styles,
    },
    {
      title: <Trans>CostPrice</Trans>,
      dataIndex: 'originalPrice',
      key: 'originalPrice',
      ...getColumnSearchProps('originalPrice'),
      ...styles,
      render: (text, record) => (
        <Tag color="red">{`${record.originalPrice.toFixed(2)} ${
          record.currency
        }`}</Tag>
      ),
    },
    {
      title: <Trans>SellPrice</Trans>,
      dataIndex: 'sellPrice',
      key: 'sellPrice',
      ...getColumnSearchProps('sellPrice'),
      ...styles,
      render: (text, record) => (
        <Tag color="green">{`${record.sellPrice.toFixed(2)} ${
          record.currency
        }`}</Tag>
      ),
    },
    {
      title: <Trans>Tax</Trans>,
      dataIndex: 'tax',
      key: 'tax',
      ...getColumnSearchProps('tax'),
      ...styles,
      render: (text, record) => <span>{`${record.tax} % I.V.A`}</span>,
    },
    {
      title: <Trans>TaxInclude</Trans>,
      dataIndex: 'taxInclude',
      key: 'taxInclude',
      render: (text, record) =>
        record.taxInclude ? (
          <CheckCircleTwoTone twoToneColor="#52c41a" style={fontCircleSize} />
        ) : (
          <CloseCircleTwoTone twoToneColor="#eb2f96" style={fontCircleSize} />
        ),
    },
    {
      title: <Trans>PriceWithTax</Trans>,
      dataIndex: 'priceTax',
      key: 'priceTax',
      ...getColumnSearchProps('priceTax'),
      ...styles,
      render: (text, record) => (
        <Tag color="#87d068">{`${record.priceTax.toFixed(2)} ${
          record.currency
        }`}</Tag>
      ),
    },
    {
      title: <Trans>Stock</Trans>,
      dataIndex: 'stock',
      key: 'stock',
      ...getColumnSearchProps('stock'),
      render: (text, record) =>
        record.stock > 0 ? (
          <span
            style={{ color: 'green', fontWeight: '600' }}
          >{`${record.stock} pcs`}</span>
        ) : (
          <span
            style={{ color: 'red', fontWeight: '600' }}
          >{`${record.stock} pcs`}</span>
        ),
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
