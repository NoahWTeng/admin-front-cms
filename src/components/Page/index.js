import './Page.scss';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Loader } from '@components';

const loadingStyle = {
  height: 'calc(100vh - 184px)',
  overflow: 'hidden'
};

export const Page = ({
  className,
  children,
  inner = false,
  isLoading = false
}) => {
  return (
    <div
      className={classnames(className, {
        ['contentInner']: inner
      })}
      style={isLoading ? loadingStyle : null}
    >
      {isLoading ? <Loader spinning /> : ''}
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
