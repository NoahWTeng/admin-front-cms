import React, { useEffect, memo } from 'react';
import { withI18n } from '@lingui/react';
import { useDispatch, useSelector } from 'react-redux';
import { type } from 'ramda';

import { Page, Loader, CustomModal, useNotification } from '@components';
import {
  getCategoriesListProcess,
  createNewCategory,
  updateCategory,
  clearUpState,
} from '@actions';

import { Header } from './components/Header';
import { TableList } from './components/TableList';
import { fieldsValue } from './utils/fieldsValue';
import { setInitialValue } from './utils/modalInitialValue';
import { services } from '@helpers';

const FirstCategory = withI18n()(
  memo(({ i18n }) => {
    const dispatch = useDispatch();
    const {
      category1,
      currentCategory,
      pagination,
      created,
      deleted,
      updated,
    } = useSelector((state) => state.categories);
    const { modalType, isModal } = useSelector((state) => state.modal);
    const { isFetching } = useSelector((state) => state.ui);
    const { openNotification } = useNotification();

    useEffect(() => {
      let isMounted = true;

      if (isMounted) dispatch(getCategoriesListProcess());

      return () => {
        dispatch(clearUpState());

        isMounted = false;
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

    const handleOnOk = (data) => {
      if (data.id) {
        const { title, description, isActive, imageUrl } = data;
        return dispatch(
          updateCategory({
            body: {
              title,
              description,
              isActive,
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
          imageUrl: data.imageUrl
            ? `${services.api_upload}${data.imageUrl.file.name}`
            : '',
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
              category1={category1}
              pagination={pagination}
              dispatch={dispatch}
            />
          </>
        )}
        {isModal && (
          <CustomModal
            i18n={i18n}
            onOk={handleOnOk}
            item={currentCategory}
            modalInitialValues={setInitialValue(currentCategory, modalType)}
            modalFields={fieldsValue(i18n, `${i18n._(modalType)}`)}
          />
        )}
      </Page>
    );
  })
);

export default FirstCategory;
