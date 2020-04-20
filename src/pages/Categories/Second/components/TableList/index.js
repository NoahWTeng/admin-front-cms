import './list.scss';
import React, { memo } from 'react';
import { Table, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { columns } from './columns';
import {
  openModal,
  setCurrentCategory,
  deleteCategory,
  toggleCategoryPagination,
} from '@actions';

export const TableList = memo(({ i18n }) => {
  const dispatch = useDispatch();
  const { category2, pagination } = useSelector((state) => state.categories);

  const getColumnProps = () => ({
    render: (text, record) => text,
  });

  const handleOperation = (record, e) => {
    if (e.key === 'Update') {
      dispatch(openModal(e.key));
      dispatch(setCurrentCategory(record));
    }

    if (e.key === 'Remove') {
      Modal.confirm({
        title: i18n.t`Are you sure to delete this user?`,
        onOk: () => {
          dispatch(
            deleteCategory({ ids: [record._id], category2, pagination })
          );
        },
      });
    }
  };

  const handleChangePage = (page) => dispatch(toggleCategoryPagination(page));

  return (
    <Table
      rowKey={(record) => record._id}
      dataSource={category2}
      pagination={{
        ...pagination,
        showTotal: (total) => i18n.t`Total ${total} Items`,
      }}
      onChange={handleChangePage}
      className={'table'}
      bordered
      simple
      scroll={{ x: true }}
      columns={columns(i18n, getColumnProps, handleOperation)}
    />
  );
});
