import React, { useEffect, memo, useMemo, useState } from 'react';
import { withI18n } from '@lingui/react';

import { Page, Loader, CustomModal } from '@components';
import {
  getUsersListProcess,
  closeModal,
  createNewUser,
  updateUser,
  setCurrentUser
} from '@actions';

import { Header } from './components/Header';
import { TableList } from './components/TableList';

const FirstCategory = withI18n()(
  memo(({ i18n }) => {
    return (
      <Page inner>
        <Header />
        <TableList />
      </Page>
    );
  })
);

export default FirstCategory;
