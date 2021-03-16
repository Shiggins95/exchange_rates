import React, { createRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import '../Styles/PopupWindowStyles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { _setError } from '../Redux/Actions/Errors_Actions';

const PopupWindow = () => {
  const dispatch = useDispatch();
  const { error, message, title } = useSelector(
    (state) => state.errors,
  );
  const props = useSpring({
    opacity: error ? 1 : 0,
    top: error ? '0px' : '100%',
    display: error ? 'grid' : 'none',
  });

  const handleClose = () => {
    dispatch(
      _setError({
        error: false,
        title: '',
        message: '',
      }),
    );
  };

  return (
    <animated.div
      className="popup_bg"
      style={{
        ...props,
        zIndex: 12,
      }}
    >
      <div
        className="popup_window"
        style={{
          width: '400px',
          minHeight: 200,
        }}
      >
        <div className="title">
          <p>{title}</p>
        </div>
        <div
          className="content"
          style={{
            overflow: 'scroll',
          }}
        >
          <p>{message}</p>
        </div>
        <div className="buttons">
          <button
            type="button"
            className="decline"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>
    </animated.div>
  );
};

PopupWindow.propTypes = {};

PopupWindow.defaultProps = {
  callback: () => {},
};

export default PopupWindow;
