import React, { useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, PageHeader } from 'antd';
import { withI18n, Trans } from '@lingui/react';
import { pickBy } from 'ramda';
import { openModal, getUserById, updateUser } from '@actions';
import { Page, CustomModal, Page404, Loader } from '@components';
import { fieldsValue } from '../../utils/fieldsValue';
import { setInitialValue } from '../../utils/modalInitialValue';
import { HeadContent } from './HeadContent';

import './index.scss';

const UserDetail = withI18n()(
  memo(({ i18n, history, match }) => {
    const dispatch = useDispatch();
    const { modalType, isModal } = useSelector((state) => state.modal);

    const { currentUser, error, isFetching } = useSelector(
      (state) => state.users
    );

    useEffect(() => {
      let isMounted = true;
      if (isMounted) dispatch(getUserById(match.params.id));

      return () => {
        isMounted = false;
      };
    }, []);

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
          {isFetching && <Loader spinning />}
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
            {!isFetching && <HeadContent i18n={i18n} user={currentUser} />}
          </PageHeader>
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
