import React from 'react';
import { getStorage } from '@helpers';
import { useDispatch } from 'react-redux';
import { setAdmin } from '@actions';

const collapsed = getStorage.collapsed();
const theme = getStorage.theme();
const lang = getStorage.lang();
const admin = getStorage.admin();

function InitialStorage({ children }) {
  const dispatch = useDispatch();
  if (admin && admin.token) dispatch(setAdmin(admin));

  return children;
}

export { InitialStorage };
