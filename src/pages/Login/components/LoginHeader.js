import React, { memo } from 'react';
import '../index.scss';

export const LoginHeader = memo(() => {
  return (
    <>
      <div className={'brand'}>
        <h2 className={'brand-text'}>Welcome!</h2>
      </div>
      <p>Sign in to your account</p>
    </>
  );
});
