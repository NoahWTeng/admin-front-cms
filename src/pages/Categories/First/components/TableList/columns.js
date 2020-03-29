import React from 'react';
import { Tag } from 'antd';
import { DropMenuDown } from '@components';
import { Trans } from '@lingui/react';
export const columns = (i18n, getColumnSearchProps, handleOperation) => {
  return [
    {
      title: <Trans>Id</Trans>,
      dataIndex: `fullName`,
      key: 'name',
      fixed: 'left',
      ...getColumnSearchProps('fullName')
    },
    {
      title: <Trans>Name</Trans>,
      dataIndex: ['billAddress', 'company'],
      key: 'company',
      ...getColumnSearchProps('billAddress.company')
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
