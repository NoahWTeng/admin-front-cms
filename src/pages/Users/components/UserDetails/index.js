import React, { useEffect, memo } from 'react';
import { Button, PageHeader } from 'antd';
import { withI18n, Trans } from '@lingui/react';
import { HeadContent } from './HeadContent';
import { isEmpty, pickBy } from 'ramda';
import { useSelector, useDispatch } from 'react-redux';
import { openModal, getUserById, updateUser, clearUpState } from '@actions';
import { Page, CustomModal, Page404, useNotification } from '@components';
import { fieldsValue } from '../../utils/fieldsValue';
import { setInitialValue } from '../../utils/modalInitialValue';

import './index.scss';

const UserDetail = withI18n()(
  memo(({ i18n, history, match }) => {
    const dispatch = useDispatch();
    const { modalType, isModal } = useSelector((state) => state.modal);
    const { currentUser, error, isFetching, updated } = useSelector(
      (state) => state.users
    );
    const { openNotification } = useNotification();

    useEffect(() => {
      let isMounted = true;
      if (isMounted) dispatch(getUserById(match.params.id));

      return () => {
        dispatch(clearUpState());
        isMounted = false;
      };
    }, []);

    useEffect(() => {
      if (updated) {
        const description =
          updated === 'error' ? 'ErrorUpdated' : 'SuccessUpdated';

        openNotification[updated]({
          message: updated,
          description,
        });
      }
    }, [updated]);

    const handleOnOk = (data) => {
      const notId = (val, key) =>
        !['id', '_id', 'createdAt', 'updatedAt'].includes(key);
      const shippingNotId = pickBy(notId, data);
      const currentUserNotId = pickBy(notId, currentUser);

      return dispatch(
        updateUser({
          body: { ...currentUserNotId, shipping: shippingNotId },
          paramsId: data.id,
        })
      );
    };

    if (error) return <Page404 />;

    return (
      <>
        <Page inner>
          {!isEmpty(currentUser) && !isFetching && (
            <PageHeader
              ghost={false}
              onBack={() => history.goBack()}
              title={i18n.t`ShippAddress`}
              extra={[
                <Button
                  key="1"
                  type="primary"
                  onClick={() => dispatch(openModal('UpdateShipp'))}
                >
                  <Trans>{'Update'}</Trans>
                </Button>,
              ]}
            >
              <HeadContent i18n={i18n} user={currentUser} />
            </PageHeader>
          )}
        </Page>
        {isModal && (
          <CustomModal
            i18n={i18n}
            onOk={handleOnOk}
            item={currentUser}
            modalInitialValues={setInitialValue(currentUser, modalType)}
            modalFields={fieldsValue(i18n, `${i18n._(modalType)}`)}
          />
        )}
      </>
    );
  })
);

export default UserDetail;
