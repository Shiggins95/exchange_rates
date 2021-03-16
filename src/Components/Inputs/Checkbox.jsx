import React from 'react';
import PropTypes from 'prop-types';
import '../../Styles/Checkbox.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const Checkbox = ({
  onChange,
  selectedValue,
  id,
  label,
  tabIndex,
  openFilter,
  setOpenFilter,
}) => {
  const handleChange = () => {
    setOpenFilter(id);
    onChange(!selectedValue, id);
  };
  return (
    <div className="checkbox_container">
      <div className="title">{label}</div>
      <div
        className="checkbox"
        onClick={handleChange}
        tabIndex={tabIndex}
      >
        {selectedValue && <FontAwesomeIcon icon={faCheck} />}
      </div>
    </div>
  );
};

Checkbox.propTypes = {
  onChange: PropTypes.func.isRequired,
  selectedValue: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  tabIndex: PropTypes.number,
  openFilter: PropTypes.string,
  setOpenFilter: PropTypes.func,
};
Checkbox.defaultProps = {
  tabIndex: null,
  openFilter: null,
  setOpenFilter: null,
};

export default Checkbox;
