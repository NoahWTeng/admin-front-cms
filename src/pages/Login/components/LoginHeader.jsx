import '../index.scss';
import React from 'react';

const LoginHeader = () => {
  return (
    <>
      <div className={'brand'}>
        <h2 className={'brand-text'}>Welcome!</h2>
      </div>
      <p>Sign in to your account</p>
    </>
  );
};

export { LoginHeader };
