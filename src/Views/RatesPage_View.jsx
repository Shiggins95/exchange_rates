import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import DropDownMenu from '../Components/Inputs/DropDownMenu';
import '../Styles/FiltersStyles.scss';
import '../Styles/RatesPageStyles.scss';
import {
  _setFilterBaseCurrency,
  _setFilterExchangeDate,
} from '../Redux/Actions/Filters_Actions';
import DatePicker from '../Components/DatePicker/DatePicker';
import RatesTable from '../Components/RatesTable';
import Header from '../Components/Header_Component';
import { _setError } from '../Redux/Actions/Errors_Actions';

const RatesPage = (props) => {
  const scrollRef = createRef();
  const dispatch = useDispatch();
  const { currencies } = useSelector((state) => state.global);
  const { baseCurrency, exchangeDate } = useSelector(
    (state) => state.filters,
  );
  const options = Object.keys(currencies).map((currency) => ({
    text: currency,
    value: currency,
  }));

  const dispatchMapping = {
    baseCurrency: _setFilterBaseCurrency,
    exchangeDate: _setFilterExchangeDate,
  };

  const handleChange = (value, id) => {
    if (id.toLowerCase().indexOf('date') !== -1) {
      const earliestDate = new Date(2000, 0, 1, 0, 0, 0);
      if (value.getTime() < earliestDate.getTime()) {
        dispatch(
          _setError({
            error: true,
            title: 'DATE_TOO_LONG_AGO',
            message:
              'Whatcha doing going way back there. I can only get around 20 years of dates. Jheeezo',
          }),
        );
        return;
      }
      if (value.getTime() > new Date().getTime()) {
        dispatch(
          _setError({
            error: true,
            title: 'DATE_IN_FUTURE',
            message:
              "Whatcha think I am? A time traveller? If I could get future exchange rates I'd be a forex guru. Get back in the past chump!",
          }),
        );
        return;
      }
    }
    const dispatchFunction = dispatchMapping[id];
    dispatch(dispatchFunction({ [id]: value }));
  };

  const filters = [
    {
      type: 'select',
      label: 'Base Currency',
      onChange: handleChange,
      id: 'baseCurrency',
      options,
      selectedValue: baseCurrency,
    },
    {
      type: 'date',
      label: 'Exchange Date',
      onChange: handleChange,
      selectedValue: exchangeDate,
      id: 'exchangeDate',
    },
  ];
  const headingParams = {
    heading: <h1>View Exchange Rates, Past & Present</h1>,
    subHeading: (
      <h2>
        View a list of exchange rates from today, and from dates in
        the past
      </h2>
    ),
    tag: (
      <p>
        Powered by{' '}
        <a
          href="https://ratesapi.io/"
          target="_blank"
          rel="noreferrer"
        >
          ratesapi.io
        </a>
      </p>
    ),
  };

  return (
    <div id="present_rates_container">
      <Header filters={filters} {...headingParams} />
      <div className="rates_table" ref={scrollRef}>
        <RatesTable scrollRef={scrollRef} />
      </div>
    </div>
  );
};

RatesPage.propTypes = {};

export default RatesPage;
