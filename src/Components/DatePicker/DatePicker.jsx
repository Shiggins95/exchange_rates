import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import '../../Styles/DatePickerStyles.scss';
import { useDispatch, useSelector } from 'react-redux';
import DatePickerBox from './DatePickerBox';
import { _formatDateForDisplay } from '../../Helpers/DateHelpers';
import { _setFilterOpenFilter } from '../../Redux/Actions/Filters_Actions';

const DatePicker = ({
  id,
  selectedValue,
  label,
  onChange,
  tabIndex,
}) => {
  const dispatch = useDispatch();
  const { openFilter, baseCurrency } = useSelector(
    (state) => state.filters,
  );
  const showContent = openFilter === id;
  const openMenu = () => {
    const filterToSet = openFilter === id ? '' : id;
    dispatch(_setFilterOpenFilter({ openFilter: filterToSet }));
  };
  const handleSelection = (value) => {
    dispatch(_setFilterOpenFilter({ openFilter: '' }));
    onChange(value, id);
  };
  return (
    <div className="date_picker_container">
      <div className="title">{label}</div>
      <div
        className="input_header"
        onClick={openMenu}
        tabIndex={tabIndex}
      >
        <p>{_formatDateForDisplay(selectedValue)}</p>
        <FontAwesomeIcon icon={faCalendarPlus} />
      </div>
      {showContent && (
        <div className="content">
          <DatePickerBox
            selectedValue={selectedValue}
            handleSelection={handleSelection}
          />
        </div>
      )}
    </div>
  );
};

DatePicker.propTypes = {
  selectedValue: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  tabIndex: PropTypes.number,
};
DatePicker.defaultProps = {
  selectedValue: null,
  tabIndex: null,
};

export default DatePicker;
