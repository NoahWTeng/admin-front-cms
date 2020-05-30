import React, { useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withI18n } from '@lingui/react';
import { pickBy } from 'ramda';

import { Header, TableList } from './components';
import { Page, Loader, CustomModal } from '@components';
import {
  getUsersListProcess,
  createNewUser,
  updateUser,
  clearUpState,
} from '@actions';
import { fieldsValue } from './utils/fieldsValue';
import { setInitialValue } from './utils/modalInitialValue';

const Users = withI18n()(
  memo(({ i18n }) => {
    const dispatch = useDispatch();
    const {
      currentUser,
      allUsers,
      isFetching,
      pagination,
      selected,
    } = useSelector((state) => state.users);

    const { modalType, isModal } = useSelector((state) => state.modal);

    useEffect(() => {
      let isMounted = true;

      if (isMounted) dispatch(getUsersListProcess());

      return () => {
        dispatch(clearUpState());
        isMounted = false;
      };
    }, []);

    const handleOnOk = (data) => {
      if (data.id) {
        const notId = (val, key) => key !== 'id';
        const dataNotId = pickBy(notId, data);
        return dispatch(updateUser({ body: dataNotId, paramsId: data.id }));
      }

      dispatch(createNewUser(data));
    };

    return (
      <>
        <Page inner>
          {isFetching && <Loader spinning />}
          {!isFetching && (
            <>
              <Header
                i18n={i18n}
                selected={selected}
                allUsers={allUsers}
                pagination={pagination}
              />
              <TableList
                i18n={i18n}
                allUsers={allUsers}
                pagination={pagination}
              />
            </>
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

export default Users;
