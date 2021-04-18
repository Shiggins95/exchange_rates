import React from 'react';
import PropTypes from 'prop-types';
import '../../Styles/SelectOption.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';

const SelectedOption = ({
  text, value, onRemove, inMenu,
}) => {
  const removeItem = (closeMenu) => {
    onRemove(value, closeMenu);
  };
  return (
    <div
      className={`selected_option ${
        inMenu ? 'in_menu' : 'not_in_menu'
      }`}
    >
      <div className="value">{text}</div>
      <div className="close">
        <FontAwesomeIcon
          icon={faTimesCircle}
          onClick={() => removeItem(!inMenu)}
        />
      </div>
    </div>
  );
};

SelectedOption.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  text: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  inMenu: PropTypes.bool,
};

SelectedOption.defaultProps = {
  inMenu: false,
  value: '',
};

export default SelectedOption;
