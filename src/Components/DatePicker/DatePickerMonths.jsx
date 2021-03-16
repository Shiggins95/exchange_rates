import React, { createRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { _getMonths } from '../../Helpers/DateHelpers';
import '../../Styles/DatePickerMonthsStyles.scss';

const DatePickerMonths = ({ selectedValue, onClick }) => {
  const ref = createRef();
  const months = _getMonths();
  // useEffect(() => {
  //   if (ref.current) {
  //     ref.current.scrollIntoView({
  //       behaviour: 'smooth',
  //     });
  //   }
  // }, []);
  return (
    <div className="month_select_container">
      {Object.keys(months).map((month) => (
        <div
          key={months[month]}
          className={`month_select ${
            month.toString() === selectedValue.getMonth().toString()
              ? 'selected'
              : ''
          }`}
          ref={
            month.toString() === selectedValue.getMonth().toString()
              ? ref
              : null
          }
          onClick={onClick}
          data-value={new Date(
            selectedValue.getFullYear(),
            parseInt(month, 10),
            1,
          ).getTime()}
        >
          {months[month]}
        </div>
      ))}
    </div>
  );
};

DatePickerMonths.propTypes = {
  selectedValue: PropTypes.object,
  onClick: PropTypes.func.isRequired,
};

DatePickerMonths.defaultProps = {
  selectedValue: null,
};

export default DatePickerMonths;
