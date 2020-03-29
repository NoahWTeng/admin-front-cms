import './list.scss';
import React, { useState, memo, useMemo } from 'react';
import { Table, Modal } from 'antd';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { withI18n } from '@lingui/react';
import Highlighter from 'react-highlight-words';
import { useSelector, useDispatch } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';

import { columns } from './columns';
import {
  selectUsers,
  deleteUsersProcess,
  openModal,
  setCurrentUser,
  toggleChangePagination
} from '@actions';
import { handleRefresh } from '@helpers';

export const TableList = withI18n()(
  memo(({ i18n }) => {
    const getColumnProps = () => ({
      align: 'left',
      ellipsis: true,
      textWrap: 'word-break',
      render: (text, record) => text
    });

    const handleOperation = (record, e) => {
      if (e.key === 'Update') {
        dispatch(openModal(e.key));
        dispatch(setCurrentUser(record));
      }

      if (e.key === 'Remove') {
        Modal.confirm({
          title: i18n.t`Are you sure to delete this user?`,
          onOk: () => {
            dispatch(deleteUsersProcess([record._id]));
            handleRefresh(
              {
                page:
                  allUsers.length === 1 && pagination.current > 1
                    ? pagination.current - 1
                    : pagination.current,
                limit: pagination.pageSize
              },
              location,
              history
            );
          }
        });
      }
    };

    // const handleChangePage = page => {
    //   dispatch(toggleChangePagination(page));
    // };

    return (
      <Table
        // rowKey={record => record._id}
        // dataSource={allUsers}
        // pagination={{
        //   ...pagination,
        //   showTotal: total => i18n.t`Total ${total} Items`
        // }}
        // onChange={handleChangePage}
        className={'table'}
        bordered
        simple
        align="left"
        scroll={{ x: true }}
        columns={columns(i18n, getColumnProps, handleOperation)}
      />
    );
  })
);
