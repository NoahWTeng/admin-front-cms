import React, { useEffect } from 'react';
import { withI18n } from '@lingui/react';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsListProcess } from '@actions';
import { Header, TableList } from './components';

import { Page, Loader } from '@components';

function Products({ i18n }) {
  const dispatch = useDispatch();
  const { products, selected, pagination } = useSelector(
    (state) => state.products
  );
  const { isFetching } = useSelector((state) => state.ui);

  useEffect(() => {
    let isCurrent = true;

    if (isCurrent) dispatch(getProductsListProcess());

    return () => {
      isCurrent = false;
    };
  }, []);

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
