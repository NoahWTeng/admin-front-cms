import './Page.scss';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Loader } from '@components';

export const Page = props => {
  const { className, children, inner = false, isFetching = false } = props;

  const loadingStyle = {
    height: 'calc(100vh - 184px)',
    overflow: 'hidden'
  };

  return (
    <div
      className={classnames(className, {
        ['contentInner']: inner
      })}
      style={isFetching ? loadingStyle : null}
    >
      {isFetching ? <Loader spinning /> : ''}
      {children}
    </div>
  );
};

Page.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  isFetching: PropTypes.bool,
  inner: PropTypes.bool
};
