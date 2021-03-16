import React from 'react';
import PropTypes from 'prop-types';
import '../../Styles/TextInputStyles.scss';
import { useDispatch } from 'react-redux';
import { _setFilterOpenFilter } from '../../Redux/Actions/Filters_Actions';

const TextInput = ({
  onChange,
  id,
  selectedValue,
  label,
  tabIndex,
  disabled,
}) => {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    onChange(event.target.value, id);
  };
  const closeOtherFilters = () => {
    debugger;
    // dispatch(_setFilterOpenFilter({ openFilter: id }));
  };
  return (
    <div className="text_input_container">
      <div className="title">{label}</div>
      <input
        type="text"
        onChange={handleChange}
        value={selectedValue}
        onClick={closeOtherFilters}
        tabIndex={tabIndex}
        disabled={false}
        className={disabled ? 'disabled' : ''}
      />
    </div>
  );
};

TextInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  selectedValue: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  tabIndex: PropTypes.number,
  disabled: PropTypes.bool,
};

TextInput.defaultProps = {
  tabIndex: null,
  disabled: false,
};

export default TextInput;
