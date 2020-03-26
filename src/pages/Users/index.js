import React, { useEffect, memo, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withI18n } from '@lingui/react';
import { isEmpty, equals } from 'ramda';

import { Header, TableList } from './components';
import { Page, Loader, CustomModal } from '@components';
import {
  getUsersListProcess,
  closeModal,
  createNewUser,
  updateUser,
  setCurrentUser
} from '@actions';
import { fieldsValue } from './utils/fieldsValue';
import { dataSchema } from './utils/dataSchema';
import { setInitialValue } from './utils/modalInitialValue';

const Users = withI18n()(
  memo(({ i18n }) => {
    const dispatch = useDispatch();
    const { currentUser, allUsers } = useSelector(state => state.users);
    const { modalType, isModal } = useSelector(state => state.modal);

    useEffect(() => {
      let isCurrent = true;
      const getUsers = () => {
        dispatch(getUsersListProcess());
      };
      if (isCurrent) getUsers();

      return () => (isCurrent = false);
    }, []);

    const modalSetting = useMemo(
      () => ({
        item: modalType === 'Create' ? {} : currentUser,
        title: `${i18n._(modalType)}`,
        visible: isModal,
        modalFields: fieldsValue(i18n, `${i18n._(modalType)}`),
        modalInitialValues: setInitialValue(currentUser),
        onOk: data => {
          const changeDataSchema = dataSchema(data, modalType);
          if (data.id) {
            return dispatch(
              updateUser({ body: changeDataSchema, paramsId: data.id })
            );
          }
          dispatch(createNewUser(changeDataSchema));
        },
        onCancel: () => {
          dispatch(closeModal());
          dispatch(setCurrentUser({}));
        }
      }),
      [modalType]
    );
    return (
      <Page inner>
        {isEmpty(allUsers) && <Loader spinning opacity />}
        {!isEmpty(allUsers) && (
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

export default Users;
