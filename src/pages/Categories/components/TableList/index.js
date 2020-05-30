import React, { memo } from 'react';
import { Table, Modal } from 'antd';

import { columns } from './columns';
import {
  openModal,
  setCurrentCategory,
  deleteCategory,
  toggleCategoryPagination,
} from '@actions';
import './list.scss';

export const TableList = memo(
  ({ i18n, category1, category2, pagination, pathname, dispatch }) => {
    const getColumnProps = () => ({
      render: (text, record) => text,
    });

    const handleOperation = (record, e) => {
      if (e.key === 'Update') {
        dispatch(openModal(e.key));
        dispatch(setCurrentCategory(record));
      }

      if (e.key === 'Remove') {
        const category = pathname ? category1 : category2;

        Modal.confirm({
          title: i18n.t`Are you sure to delete this user?`,
          onOk: () => {
            dispatch(
              deleteCategory({ ids: [record._id], category, pagination })
            );
          },
        });
      }
    };

    const handleChangePage = (page) => dispatch(toggleCategoryPagination(page));
    return (
      <Table
        rowKey={(record) => record._id}
        dataSource={pathname ? category1 : category2}
        pagination={{
          ...pagination,
          showTotal: (total) => i18n.t`Total ${total} Items`,
        }}
        onChange={handleChangePage}
        className={'table'}
        bordered
        simple
        scroll={{ x: true }}
        columns={columns(i18n, getColumnProps, handleOperation, pathname)}
      />
    );
  }
);
