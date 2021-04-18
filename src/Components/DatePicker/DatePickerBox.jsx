/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { _getMonths } from '../../Helpers/DateHelpers';
import DatePickerDays from './DatePickerDays';
import '../../Styles/DatePickerBoxStyles.scss';
import DatePickerMonths from './DatePickerMonths';

const DatePickerBox = ({ handleSelection, selectedValue }) => {
  // To be used in manipulating the current month of view
  const [currentDate, setCurrentDate] = useState(
    selectedValue || new Date(),
  );
  // to render to current months days
  const [datesToRender, setDatesToRender] = useState([]);
  const [screen, setScreen] = useState('days');
  // for displaying the current month
  const months = _getMonths();

  // for displaying the current months day headings e.g. Mon Tue...
  const daysOutOfOrder = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  /**
   * function to format the date at the top of the date picker
   * @return {string}
   */
  const formatPreviewDate = () => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    return `${months[month].substring(0, 3)} ${year}`;
  };
  /**
   * easy function to return the first day of current month
   * @return {Date}
   */
  const getFirstDateOfMonth = () => new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  /**
   * easy function to return the last day of current month
   * @return {Date}
   */
  const getLastDateOfMonth = () => new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  );
  /**
   * function to populate the days to render in the current month
   * @return {void}
   */
  const populateDates = () => {
    let previousDates = [];
    const otherDates = [];
    // get first date object of the month
    const firstDateRaw = getFirstDateOfMonth();
    // get first date of month - actual date number
    const firstDate = firstDateRaw.getDate();
    // get first day of month, e.g if its monday, tuesday etc
    const firstDay = firstDateRaw.getDay() || 7;
    // get last date object of the month
    const lastDateRaw = getLastDateOfMonth();
    // get last date of month - actual date number
    const lastDate = lastDateRaw.getDate();
    // get last day of month, e.g if its monday, tuesday etc
    const lastDay = lastDateRaw.getDay();
    // create copy of the first day to use in iteration to pad out
    // the start of the calendar so it will always have days populated
    // until monday
    const firstDateCopy = new Date(firstDateRaw);
    // create copy of the first date to use in iteration to get each day
    // of current month
    const actualDate = new Date(firstDateRaw);
    // create copy of last date to use in iteration to pad out the
    // end of the calendar so it will always have days populated until
    // sunday
    const lastDateCopy = new Date(lastDateRaw);
    // loop from the first day until you reach the closest monday (in the past)
    // add objects to previous dates array to render before current months
    // e.g if the first day of the month was a thursday, this would add 3 days in before
    for (let date = firstDay; date > 1; date--) {
      firstDateCopy.setDate(firstDateCopy.getDate() - 1);
      previousDates.push({
        current: false,
        val: firstDateCopy.getDate(),
        raw: firstDateCopy.getTime(),
      });
    }
    // sort based on the date as the above loop puts them in revers order
    previousDates = previousDates.sort(
      (date1, date2) => date1.val - date2.val,
    );
    // loop through from first date until last date and add info object
    // to other dates array
    for (let date = firstDate; date <= lastDate; date++) {
      otherDates.push({
        current: true,
        val: date,
        raw: actualDate.getTime(),
      });
      actualDate.setDate(actualDate.getDate() + 1);
    }

    // loop from last day until you reach the closest sunday. Exact same logic as 1st loop
    // except in reverse
    for (let date = lastDay; date < 7; date++) {
      lastDateCopy.setDate(lastDateCopy.getDate() + 1);
      otherDates.push({
        current: false,
        val: lastDateCopy.getDate(),
        raw: lastDateCopy.getTime(),
      });
    }
    // concat previous dates and other dates to have them in order in single array
    const dates = previousDates.concat(otherDates);
    // set state
    setDatesToRender(dates);
  };
  useEffect(() => {
    // each time the current date changes, repopulate dates
    populateDates();
  }, [currentDate]);
  /**
   * function to set state to next month after current
   * @return {void}
   */
  const getNextMonth = () => {
    const nextMonth = new Date(currentDate.getTime());
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentDate(nextMonth);
  };
  /**
   * function to set state to previous month before current
   * @return {void}
   */
  const getPreviousMonth = () => {
    const nextMonth = new Date(currentDate.getTime());
    nextMonth.setMonth(nextMonth.getMonth() - 1);
    setCurrentDate(nextMonth);
  };
  /**
   * function to change current date and close the popup box
   * @param {Object} event - click event
   */
  const handleDateClick = (event) => {
    const currentVal = event.target.getAttribute('data-value');
    const newDate = new Date(parseInt(currentVal, 10));
    handleSelection(newDate);
  };

  const handleMonthSelection = (event) => {
    const currentVal = event.target.getAttribute('data-value');
    const newDate = new Date(parseInt(currentVal, 10));
    setCurrentDate(newDate);
    setScreen('days');
  };
  const handleMonthClick = () => {
    setScreen('months');
  };
  return (
    <div className="date_picker_box_container">
      {screen !== 'months' && (
        <div className="picker_header">
          <div className="left_arr arrow" onClick={getPreviousMonth}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </div>
          <div className="date_preview" onClick={handleMonthClick}>
            {formatPreviewDate()}
          </div>
          <div className="right_arr arrow" onClick={getNextMonth}>
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </div>
      )}
      {screen !== 'months' && (
        <div className="days_info">
          {daysOutOfOrder.map((day) => (
            <p key={day} className="day_info">
              {day.substring(0, 3)}
            </p>
          ))}
        </div>
      )}
      {screen === 'days' && (
        <DatePickerDays
          days={datesToRender}
          onClick={handleDateClick}
          selectedValue={selectedValue}
        />
      )}
      {screen === 'months' && (
        <DatePickerMonths
          onClick={handleMonthSelection}
          selectedValue={currentDate}
        />
      )}
    </div>
  );
};

DatePickerBox.propTypes = {
  handleSelection: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  selectedValue: PropTypes.object,
};

DatePickerBox.defaultProps = {
  selectedValue: null,
};

export default DatePickerBox;
