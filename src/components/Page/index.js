import './Page.scss';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const Page = ({ className, children, inner = false }) => {
  return (
    <div
      className={classnames(className, {
        ['contentInner']: inner
      })}
    >
      {children}
    </div>
  );
};

Page.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  inner: PropTypes.bool
};
