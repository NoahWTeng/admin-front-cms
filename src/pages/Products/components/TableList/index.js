import React, { useState, memo, useMemo } from 'react';
import { Table, Modal } from 'antd';
import Highlighter from 'react-highlight-words';
import { useDispatch } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';

import { SearchFilter } from './SearchFilter';
import { columns } from './columns';
import {
  selectProducts,
  deleteProductsProcess,
  setCurrentProduct,
  toggleChangePagination,
} from '@actions';

import './list.scss';

export const TableList = memo(({ i18n, products, pagination }) => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState({
    searchText: '',
    searchedColumn: '',
  });

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      visible,
    }) =>
      visible && (
        <SearchFilter
          setSelectedKeys={setSelectedKeys}
          selectedKeys={selectedKeys}
          confirm={confirm}
          clearFilters={clearFilters}
          dataIndex={dataIndex}
          setSearch={setSearch}
          i18n={i18n}
        />
      ),
    filterIcon: useMemo(
      (filtered) => (
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
            padding: 0,
          }}
          searchWords={[search.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  const rowSelection = {
    onChange: (selectedRowKeys) => {
      dispatch(selectProducts(selectedRowKeys));
    },
  };

  const handleOperation = (record, e) => {
    if (e.key === 'Update') {
      console.log('update product');
      dispatch(setCurrentProduct(record));
    }

    if (e.key === 'Remove') {
      Modal.confirm({
        title: i18n.t`Are you sure to delete this user?`,
        onOk: () => {
          dispatch(
            deleteProductsProcess({ ids: [record._id], products, pagination })
          );
        },
      });
    }
  };

  return (
    <Table
      rowKey={(record) => record._id}
      dataSource={products}
      rowSelection={rowSelection}
      pagination={{
        ...pagination,
        showTotal: (total) => i18n.t`Total ${total} Items`,
      }}
      onChange={(page) => dispatch(toggleChangePagination(page))}
      className={'table'}
      bordered
      simple
      scroll={{ x: true }}
      columns={columns(i18n, getColumnSearchProps, handleOperation)}
    />
  );
});
