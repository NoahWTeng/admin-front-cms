import React, { useEffect, memo } from 'react';
import { withI18n } from '@lingui/react';
import { useDispatch, useSelector } from 'react-redux';
import { type, isEmpty } from 'ramda';

import { Page, Loader, CustomModal, useNotification } from '@components';

import {
  getCategoriesListProcess,
  createNewCategory,
  updateCategory,
  resetMessageStatus,
} from '@actions';
import { Header, TableList } from './components';
import { setInitialValue } from './utils/modalInitialValue';
import { fieldsValue } from './utils/fieldsValue';
import { services } from '@helpers';

const Catalog = withI18n()(
  memo(({ i18n, location }) => {
    const dispatch = useDispatch();
    const {
      category1,
      category2,
      currentCategory,
      pagination,
      created,
      deleted,
      updated,
    } = useSelector((state) => state.categories);
    const { modalType, isModal } = useSelector((state) => state.modal);
    const { isFetching } = useSelector((state) => state.ui);
    const { openNotification } = useNotification();
    const pathname =
      location.pathname.split('/').slice(-1).toString() === 'first';

    useEffect(() => {
      let isMounted = true;
      if ((isMounted && isEmpty(category1)) || isEmpty(category2)) {
        dispatch(getCategoriesListProcess());
      }

      return () => {
        isMounted = false;
      };
    }, []);

    useEffect(() => {
      let isMounted = true;
      if (isMounted) {
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
      }
      return () => {
        isMounted = false;
        dispatch(resetMessageStatus());
      };
    }, [created, deleted, updated]);

    const handleOnOk = (data) => {
      if (data.id) {
        let body = {
          title: data.title,
          description: data.description,
          isActive: data.isActive,
          imageUrl:
            type(data.imageUrl) === 'Object'
              ? `${services.api_upload}${data.imageUrl.file.name}`
              : data.imageUrl,
        };

        if (!pathname) {
          body = {
            ...body,
            breadcrumbParentId: data.breadcrumbParentId,
            menuParentId: data.menuParentId,
          };
        }

        return dispatch(
          updateCategory({
            body,
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
        <Header pathname={pathname} />
        {!isFetching && (
          <TableList
            i18n={i18n}
            category1={category1}
            category2={category2}
            pagination={pagination}
            dispatch={dispatch}
            pathname={pathname}
          />
        )}
        {isModal && (
          <CustomModal
            i18n={i18n}
            onOk={handleOnOk}
            item={currentCategory}
            modalInitialValues={setInitialValue(
              currentCategory,
              modalType,
              pathname
            )}
            modalFields={fieldsValue(
              i18n,
              `${i18n._(modalType)}`,
              category1,
              pathname
            )}
          />
        )}
      </Page>
    );
  })
);

export default Catalog;
