import React, { useEffect, memo, useMemo } from 'react';
import { withI18n } from '@lingui/react';
import { isEmpty } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import { Page, Loader, CustomModal } from '@components';
import {
  getCategoriesListProcess,
  closeModal,
  createNewCategory,
  updateCategory,
  setCurrentCategory,
  clearUpState
} from '@actions';

import { Header } from './components/Header';
import { TableList } from './components/TableList';

import { fieldsValue } from './utils/fieldsValue';
import { setInitialValue } from './utils/modalInitialValue';

const FirstCategory = withI18n()(
  memo(({ i18n }) => {
    const dispatch = useDispatch();
    const { category1, currentCategory, isFetching } = useSelector(
      state => state.categories
    );
    const { modalType, isModal } = useSelector(state => state.modal);

    useEffect(() => {
      let isCurrent = true;

      if (isCurrent) dispatch(getCategoriesListProcess(1));

      return () => {
        dispatch(clearUpState());
        isCurrent = false;
      };
    }, []);

    const modalSetting = useMemo(
      () => ({
        item: modalType === 'Create' ? {} : currentCategory,
        title: `${i18n._(modalType)}`,
        visible: isModal,
        modalFields: fieldsValue(i18n, `${i18n._(modalType)}`),
        modalInitialValues: setInitialValue(currentCategory),
        onOk: data => {
          if (data.id) {
            const { title, description, isActive, level } = data;
            return dispatch(
              updateCategory({
                body: { title, description, isActive, level },
                paramsId: data.id
              })
            );
          }

          dispatch(createNewCategory(data));
        },
        onCancel: () => {
          dispatch(closeModal());
          dispatch(setCurrentCategory({}));
        }
      }),
      [modalType]
    );

    return (
      <Page inner>
        {isFetching && <Loader spinning />}
        {!isEmpty(category1) && !isFetching && (
          <>
            <Header />
            <TableList />
          </>
        )}
        {isModal && <CustomModal {...modalSetting} />}
      </Page>
    );
  })
);

export default FirstCategory;
