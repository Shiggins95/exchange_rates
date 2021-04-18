import React, { createRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { _get } from '../Helpers/Requests';
import { _formatDateForRequest } from '../Helpers/DateHelpers';
import { _generateUniqueKey } from '../Helpers/KeyGen';
import '../Styles/RatesTableStyles.scss';
import { _formatCurrencyAmount } from '../Helpers/FormatCurrency';
import { _setError } from '../Redux/Actions/Errors_Actions';

const RatesTable = () => {
  const [rates, setRates] = useState(null);
  const [currentSort, setCurrentSort] = useState('');
  const { baseCurrency, exchangeDate } = useSelector(
    (state) => state.filters,
  );
  const dispatch = useDispatch();

  const sortCurrencies = (type) => {
    let newRatesArray = [];
    // go through each exchange rate and add to rates array to be sorted
    Object.keys(rates).forEach((rate) => {
      newRatesArray.push({
        rate,
        amount: rates[rate],
      });
    });
    // sort array. if the sort type is the current sort type then sort in reverse order
    newRatesArray = newRatesArray.sort((rate1, rate2) => (currentSort === type
      ? rate1.amount - rate2.amount
      : rate2.amount - rate1.amount
    ));

    // put together new rates object to keep format of data uniform
    const newRates = {};
    newRatesArray.forEach(({ rate, amount }) => {
      newRates[rate] = amount;
    });

    // reset sort if necessary
    if (type === currentSort) {
      setCurrentSort('');
    } else {
      setCurrentSort(type);
    }
    // update rates
    setRates(newRates);
  };

  useEffect(() => {
    // get initial currencies
    _get(
      `/${_formatDateForRequest(exchangeDate)}?base=${baseCurrency}`,
    ).then((response) => {
      // if error, display error popup message
      if (response.error) {
        dispatch(
          _setError({
            title: 'FAILED_TO_FETCH_RATES',
            message: `${response.error}. You may need to select a date in the future.`,
            error: true,
          }),
        );
        return;
      }
      setRates(response.rates);
    });
  }, [baseCurrency, exchangeDate]);

  return (
    rates && (
      <div className="rates_table_container">
        <div className="table_header">
          <div className="table_line header_line">
            <p>Currency</p>
            <p
              className="sortable"
              onClick={() => sortCurrencies('er')}
            >
              Exchange Rate
            </p>
            <p
              className="sortable"
              onClick={() => sortCurrencies('er')}
            >
              Currency Example
            </p>
          </div>
        </div>
        <div className="table_content">
          {Object.keys(rates).map((currency) => (
            <div
              className="table_line"
              key={_generateUniqueKey(currency)}
            >
              <p>{currency}</p>
              <p>{rates[currency]}</p>
              <p>
                {_formatCurrencyAmount(currency, rates[currency])}
              </p>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

RatesTable.propTypes = {

};

export default RatesTable;
