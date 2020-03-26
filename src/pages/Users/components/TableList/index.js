import './List.scss';
import React, { useState, memo, useMemo } from 'react';
import { Table, Modal } from 'antd';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { withI18n } from '@lingui/react';
import Highlighter from 'react-highlight-words';
import { useSelector, useDispatch } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';

import { SearchFilter } from './SearchFilter';
import { columns } from './columns';
import {
  selectUsers,
  deleteUsersProcess,
  openModal,
  setCurrentUser,
  toggleChangePagination
} from '@actions';
import { handleRefresh } from '@helpers';

const colSpan = (text, record, dataIndex) => {
  return dataIndex === 'fullName' ? (
    <Link to={`user/${record._id}`}>{text}</Link>
  ) : (
    text
  );
};

export const TableList = withI18n()(
  memo(({ i18n }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const { allUsers, pagination } = useSelector(state => state.users);
    const [search, setSearch] = useState({
      searchText: '',
      searchedColumn: ''
    });

    const getColumnSearchProps = dataIndex => ({
      align: 'left',
      ellipsis: true,
      textWrap: 'word-break',
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
        visible
      }) =>
        visible && (
          <SearchFilter
            setSelectedKeys={setSelectedKeys}
            selectedKeys={selectedKeys}
            confirm={confirm}
            clearFilters={clearFilters}
            dataIndex={dataIndex}
            setSearch={setSearch}
          />
        ),
      filterIcon: useMemo(
        filtered => (
          <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        []
      ),
      onFilter: (value, record) => {
        if (dataIndex.includes('.')) {
          const dataToArray = dataIndex.split('.');
          return record[dataToArray[0]][dataToArray[1]]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase());
        }
        return record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      render: (text, record) =>
        search.searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{
              backgroundColor: '#ffc069',
              padding: 0
            }}
            searchWords={[search.searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ) : (
          useMemo(() => colSpan(text, record, dataIndex), [allUsers])
        )
    });

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        dispatch(selectUsers(selectedRowKeys));
      }
    };

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

    const handleChangePage = page => {
      dispatch(toggleChangePagination(page));
    };

    return (
      <Table
        rowKey={record => record._id}
        dataSource={allUsers}
        rowSelection={rowSelection}
        pagination={{
          ...pagination,
          showTotal: total => i18n.t`Total ${total} Items`
        }}
        onChange={handleChangePage}
        className={'table'}
        bordered
        simple
        align="left"
        scroll={{ x: true }}
        columns={columns(i18n, getColumnSearchProps, handleOperation)}
      />
    );
  })
);
