import './Loader.scss';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon } from 'antd';

export const Loader = ({ spinning = false, fullScreen }) => {
  return (
    <div
      className={classNames('loader', {
        ['hidden']: !spinning,
        ['fullScreen']: fullScreen
      })}
    >
      <div className={'warpper'}>
        <Icon type="loading" style={{ fontSize: 24 }} spin />
        <div className={'text'}>LOADING</div>
      </div>
    </div>
  );
};

Loader.propTypes = {
  spinning: PropTypes.bool,
  fullScreen: PropTypes.bool
};
