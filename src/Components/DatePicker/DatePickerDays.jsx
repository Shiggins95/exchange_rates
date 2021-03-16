import React from 'react';
import PropTypes from 'prop-types';

const DatePickerDays = ({ selectedValue, days, onClick }) => (
  <div className="days_of_month">
    {days.map((date, index) => (
      <div
        key={date.raw}
        className={`date ${
          date.current ? 'current_month' : 'non_current_month'
        } ${
          selectedValue && date.raw === selectedValue.getTime()
            ? 'selected'
            : ''
        }`}
        data-value={date.raw}
        onClick={onClick}
      >
        {date.val}
      </div>
    ))}
  </div>
);

DatePickerDays.propTypes = {
  days: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedValue: PropTypes.object,
  onClick: PropTypes.func.isRequired,
};

DatePickerDays.defaultProps = {
  selectedValue: null,
};

export default DatePickerDays;
