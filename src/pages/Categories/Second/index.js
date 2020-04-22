import React, { useEffect, memo } from 'react';
import { withI18n } from '@lingui/react';
import { useDispatch, useSelector } from 'react-redux';
import { type } from 'ramda';

import { Page, Loader, CustomModal } from '@components';
import {
  getCategories2ListProcess,
  getCategoriesListProcess,
  createNewCategory,
  updateCategory,
  clearUpState,
} from '@actions';
import { services } from '@helpers';
import { Header } from './components/Header';
import { TableList } from './components/TableList';
import { fieldsValue } from './utils/fieldsValue';
import { setInitialValue } from './utils/modalInitialValue';

const FirstCategory = withI18n()(
  memo(({ i18n }) => {
    const dispatch = useDispatch();
    const {
      category1,
      category2,
      currentCategory,
      isFetching,
      pagination,
    } = useSelector((state) => state.categories);
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
          imageUrl,
        } = data;

        return dispatch(
          updateCategory({
            body: {
              title,
              description,
              isActive,
              breadcrumbParentId,
              menuParentId,
              imageUrl:
                type(imageUrl) === 'Object'
                  ? `${services.api_upload}${imageUrl.file.name}`
                  : imageUrl,
            },
            paramsId: data.id,
          })
        );
      }
      dispatch(
        createNewCategory({
          ...data,
          imageUrl: `${services.api_upload}${data.imageUrl.file.name}`,
        })
      );
    };

    return (
      <Page inner>
        {isFetching && <Loader spinning />}
        {!isFetching && (
          <>
            <Header />
            <TableList
              i18n={i18n}
              dispatch={dispatch}
              category2={category2}
              pagination={pagination}
              isFetching={isFetching}
            />
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
