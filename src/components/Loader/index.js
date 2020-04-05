import './Loader.scss';
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { LoadingOutlined } from '@ant-design/icons';

export const Loader = memo(({ spinning = false, fullScreen }) => {
  return (
    <div
      className={classNames('loader', {
        ['hidden']: !spinning,
        ['fullScreen']: fullScreen
      })}
    >
      <div className={'warpper'}>
        <LoadingOutlined style={{ fontSize: 24 }} />
        <div className={'text'}>LOADING</div>
      </div>
    </div>
  );
});

Loader.propTypes = {
  spinning: PropTypes.bool,
  fullScreen: PropTypes.bool
};
