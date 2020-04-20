import React, { useEffect, memo, useMemo } from 'react';
import { withI18n } from '@lingui/react';
import { isEmpty } from 'ramda';
import { useDispatch, useSelector } from 'react-redux';

import { Page, Loader, CustomModal } from '@components';
import {
  getCategories2ListProcess,
  getCategoriesListProcess,
  createNewCategory,
  updateCategory,
  clearUpState,
} from '@actions';

import { Header } from './components/Header';
import { TableList } from './components/TableList';

import { fieldsValue } from './utils/fieldsValue';
import { setInitialValue } from './utils/modalInitialValue';

const FirstCategory = withI18n()(
  memo(({ i18n }) => {
    const dispatch = useDispatch();
    const { category1, category2, currentCategory, isFetching } = useSelector(
      (state) => state.categories
    );
    const { modalType, isModal } = useSelector((state) => state.modal);

    useEffect(() => {
      let isMounted = true;

      if (isMounted) {
        dispatch(getCategoriesListProcess());
        dispatch(getCategories2ListProcess());
      }

      return () => {
        dispatch(clearUpState());
        isMounted = false;
      };
    }, []);

    const handleOnOk = (data) => {
      if (data.id) {
        const {
          title,
          description,
          isActive,
          breadcrumbParentId,
          menuParentId,
        } = data;
        return dispatch(
          updateCategory({
            body: {
              title,
              description,
              isActive,
              breadcrumbParentId,
              menuParentId,
            },
            paramsId: data.id,
          })
        );
      }
      dispatch(createNewCategory(data));
    };

    return (
      <Page inner>
        {isFetching && <Loader spinning />}
        {!isEmpty(category2) && !isFetching && (
          <>
            <Header />
            <TableList i18n={i18n} />
          </>
        )}
        {isModal && (
          <CustomModal
            i18n={i18n}
            onOk={handleOnOk}
            item={currentCategory}
            modalInitialValues={setInitialValue(currentCategory, modalType)}
            modalFields={fieldsValue(i18n, `${i18n._(modalType)}`, category1)}
          />
        )}
      </Page>
    );
  })
);

export default FirstCategory;
