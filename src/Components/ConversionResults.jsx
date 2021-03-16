import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { _get } from '../Helpers/Requests';
import {
  _formatDateForDisplay,
  _formatDateForRequest,
} from '../Helpers/DateHelpers';
import { _formatCurrencyAmount } from '../Helpers/FormatCurrency';
import { _setError } from '../Redux/Actions/Errors_Actions';

const ConversionResults = (props) => {
  const {
    baseCurrency,
    targetCurrency,
    exchangeDate,
    exchangeAmount,
  } = useSelector((state) => state.filters);

  const dispatch = useDispatch();

  const [convertedAmount, setConvertedAmount] = useState('0');

  useEffect(() => {
    const date = _formatDateForRequest(exchangeDate);
    _get(
      `/${date}?base=${baseCurrency}&symbols=${targetCurrency}`,
    ).then((response) => {
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
      const { rates } = response;
      const newAmount = (
        exchangeAmount * rates[targetCurrency]
      ).toFixed(2);
      setConvertedAmount(newAmount);
    });
  }, [baseCurrency, targetCurrency, exchangeAmount, exchangeDate]);

  return (
    <div className="conversion_results_container">
      <div className="conversion_title">
        <h2>Conversion Result:</h2>
      </div>
      <div className="conversion_content">
        <div className="field">
          <h2>Base Currency</h2>
          <p>{baseCurrency}</p>
        </div>
        <div className="field">
          <h2>Target Currency</h2>
          <p>{targetCurrency}</p>
        </div>
        <div className="field">
          <h2>Exchange Date</h2>
          <p>{_formatDateForDisplay(exchangeDate)}</p>
        </div>
        <div className="field">
          <h2>Exchange Amount</h2>
          <p>
            {_formatCurrencyAmount(baseCurrency, exchangeAmount) ||
              _formatCurrencyAmount(baseCurrency, 0)}
          </p>
        </div>
        <div className="field result">
          <h2>Converted Amount</h2>
          <p>
            {_formatCurrencyAmount(targetCurrency, convertedAmount)}
          </p>
        </div>
      </div>
    </div>
  );
};

ConversionResults.propTypes = {};

export default ConversionResults;
