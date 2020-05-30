import React, { memo } from 'react';
import { i18n } from '@helpers';
import { LanguageSwitch } from './Language';
import { Logout } from './Logout';
import './Navbar.scss';

export const RightContent = memo(() => {
  return (
    <div className={'rightContainer'}>
      {i18n && <LanguageSwitch i18n={i18n} />}
      <Logout />
    </div>
  );
});
