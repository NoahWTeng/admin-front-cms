import React from 'react';
import { DropMenuDown } from '@components';
import { Trans } from '@lingui/react';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';

const styles = {
  align: 'left',
  ellipsis: true,
};

const fontCircleSize = { fontSize: '22px' };

export const columns = (
  i18n,
  getColumnSearchProps,
  handleOperation,
  pathname
) => {
  const dataId = [
    {
      title: <Trans>Id</Trans>,
      dataIndex: `_id`,
      key: 'id',
      ...styles,
      ...getColumnSearchProps('_id'),
    },
  ];
  const first = [
    {
      title: <Trans>Category name</Trans>,
      dataIndex: `title`,
      key: 'title',
      ...styles,
      ...getColumnSearchProps('title'),
    },
    {
      title: <Trans>Description</Trans>,
      dataIndex: 'description',
      key: 'description',
      ...styles,
    },
    {
      title: <Trans>Imagen</Trans>,
      dataIndex: 'imagenUrl',
      key: 'imagenUrl',
      width: 200,
      render: (_, record) => (
        <img alt={record.imageUrl} src={record.imageUrl} width="100%" />
      ),
    },
    {
      title: <Trans>Active</Trans>,
      dataIndex: 'isActive',
      key: 'isActive',
      render: (text, record) =>
        record.isActive ? (
          <CheckCircleTwoTone twoToneColor="#52c41a" style={fontCircleSize} />
        ) : (
          <CloseCircleTwoTone twoToneColor="#eb2f96" style={fontCircleSize} />
        ),
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
  if (pathname) return [...first, ...dataId];
  const second = [
    {
      title: <Trans>Parent</Trans>,
      dataIndex: ['breadcrumbParentId', 'title'],
      key: 'breadcrumbParentId',
      ...styles,
    },
    {
      title: <Trans>ParentId</Trans>,
      dataIndex: ['breadcrumbParentId', '_id'],
      key: 'breadcrumbParentId',
      ...styles,
      ...getColumnSearchProps('breadcrumbParentId'),
    },
  ];

  return [...second, ...first];
};
