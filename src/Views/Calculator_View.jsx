import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Components/Header_Component';
import {
  _setFilterBaseCurrency,
  _setFilterExchangeAmount,
  _setFilterExchangeDate,
  _setFilterTargetCurrency,
} from '../Redux/Actions/Filters_Actions';
import ConversionResults from '../Components/ConversionResults';
import '../Styles/CalculatorStyles.scss';
import { _getYearsBetweenDates } from '../Helpers/DateHelpers';
import { _setError } from '../Redux/Actions/Errors_Actions';

const Calculator = (props) => {
  const dispatch = useDispatch();
  const { currencies } = useSelector((state) => state.global);
  const {
    baseCurrency,
    exchangeDate,
    targetCurrency,
    exchangeAmount,
  } = useSelector((state) => state.filters);
  const options = Object.keys(currencies).map((currency) => ({
    text: currency,
    value: currency,
  }));

  const dispatchMapping = {
    baseCurrency: _setFilterBaseCurrency,
    exchangeDate: _setFilterExchangeDate,
    targetCurrency: _setFilterTargetCurrency,
    exchangeAmount: _setFilterExchangeAmount,
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
      type: 'select',
      label: 'Target Currency',
      onChange: handleChange,
      id: 'targetCurrency',
      options,
      selectedValue: targetCurrency,
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
    heading: <h1>Convert Currency Values</h1>,
    subHeading: (
      <h2>
        Convert from your base currency into any of the listed
        exchange rates...
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
    <div id="exchange_rate_calculator">
      <Header
        {...headingParams}
        filters={filters}
        showAmount
        amount={exchangeAmount.toString()}
        onChange={handleChange}
      />
      <ConversionResults />
    </div>
  );
};

Calculator.propTypes = {};

export default Calculator;
