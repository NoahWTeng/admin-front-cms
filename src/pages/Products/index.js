import React, { useEffect } from 'react';
import { withI18n } from '@lingui/react';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsListProcess, clearUpState } from '@actions';
import { Header, TableList } from './components';

import { Page, Loader, useNotification } from '@components';

function Products({ i18n }) {
  const dispatch = useDispatch();
  const { openNotification } = useNotification();
  const {
    isFetching,
    products,
    selected,
    pagination,
    created,
    deleted,
    updated,
  } = useSelector((state) => state.products);

  useEffect(() => {
    let isCurrent = true;

    if (isCurrent) dispatch(getProductsListProcess());

    return () => {
      dispatch(clearUpState());
      isCurrent = false;
    };
  }, []);

  useEffect(() => {
    if (created) {
      const description =
        created === 'error' ? 'ErrorCreated' : 'SuccessCreated';

      openNotification[created]({
        message: created,
        description,
      });
    }
    if (updated) {
      const description =
        updated === 'error' ? 'ErrorUpdated' : 'SuccessUpdated';

      openNotification[updated]({
        message: updated,
        description,
      });
    }
    if (deleted) {
      const description =
        deleted === 'error' ? 'ErrorDeleted' : 'SuccessDeleted';

      openNotification[deleted]({
        message: deleted,
        description,
      });
    }
  }, [created, deleted, updated]);

  return (
    <>
      <Page inner>
        {isFetching && <Loader spinning />}
        <Header
          i18n={i18n}
          selected={selected}
          products={products}
          pagination={pagination}
        />
        <TableList i18n={i18n} products={products} pagination={pagination} />
      </Page>
    </>
  );
}

export default withI18n()(Products);
