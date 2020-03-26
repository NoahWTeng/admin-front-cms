import './index.scss';
import React, { useMemo, useEffect, memo } from 'react';
import { Button, PageHeader } from 'antd';
import { withI18n, Trans } from '@lingui/react';
import { HeadContent } from './HeadContent';
import { useSelector, useDispatch } from 'react-redux';
import { openModal, closeModal, getUserById, updateUser } from '@actions';
import { isEmpty } from 'lodash';
import { Page, CustomModal, Page404 } from '@components';
import { fieldsValue } from '../../utils/fieldsValue';
import { setInitialValue } from '../../utils/modalInitialValue';
import { dataSchema } from '../../utils/dataSchema';

const UserDetail = withI18n()(
  memo(({ i18n, history, match }) => {
    const dispatch = useDispatch();
    const { modalType, isModal } = useSelector(state => state.modal);
    const { currentUser, error } = useSelector(state => state.users);

    useEffect(() => {
      let isCurrent = true;
      const getUser = () => {
        dispatch(getUserById(match.params.id));
      };
      if (isCurrent) getUser();

      return () => (isCurrent = false);
    }, []);

    const modalSetting = useMemo(
      () => ({
        item: currentUser,
        title: `${i18n._(modalType)}`,
        visible: isModal,
        modalFields: fieldsValue(i18n, `${i18n._(modalType)}`),
        modalInitialValues: setInitialValue(currentUser, modalType),
        onOk: data => {
          const changeDataSchema = dataSchema(data, modalType);
          dispatch(updateUser({ body: changeDataSchema, paramsId: data.id }));
        },
        onCancel: () => {
          dispatch(closeModal());
        }
      }),
      [modalType]
    );

    if (error) return <Page404 />;

    return (
      <Page inner>
        {!isEmpty(currentUser) && (
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
              </Button>
            ]}
          >
            <HeadContent i18n={i18n} user={currentUser} />
          </PageHeader>
        )}
        {isModal && <CustomModal {...modalSetting} />}
      </Page>
    );
  })
);

export default UserDetail;
