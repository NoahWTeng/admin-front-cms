import React, { memo } from 'react';
import { Button, Input } from 'antd';
import { Trans, withI18n } from '@lingui/react';
import { SearchOutlined } from '@ant-design/icons';

export const SearchFilter = withI18n()(
  memo(
    ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      dataIndex,
      i18n,
      setSearch
    }) => {
      const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearch({
          searchText: selectedKeys[0],
          searchedColumn: dataIndex
        });
      };

      const handleReset = clearFilters => {
        clearFilters();
        setSearch({ searchText: '' });
      };
      return (
        <div style={{ padding: 8 }}>
          <Input
            placeholder={i18n.t`Search...`}
            value={selectedKeys[0]}
            onChange={e =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{
              width: 188,
              marginBottom: 8,
              display: 'block'
            }}
          />

          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            <Trans>Search</Trans>
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            <Trans>Reset</Trans>
          </Button>
        </div>
      );
    }
  )
);
