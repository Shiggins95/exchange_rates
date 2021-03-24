import actionTypes from '../ActionTypes';

const {
  SET_FILTER_BASE_CURRENCY,
  SET_FILTER_OPEN_FILTER,
  SET_FILTER_EXCHANGE_DATE,
  SET_FILTER_TARGET_CURRENCY,
  SET_FILTER_EXCHANGE_AMOUNT,
  RESET_FILTERS,
} = actionTypes;

export const _setFilterBaseCurrency = (payload) => ({
  type: SET_FILTER_BASE_CURRENCY,
  payload,
});
export const _setFilterTargetCurrency = (payload) => ({
  type: SET_FILTER_TARGET_CURRENCY,
  payload,
});

export const _setFilterOpenFilter = (payload) => ({
  type: SET_FILTER_OPEN_FILTER,
  payload,
});

export const _setFilterExchangeDate = (payload) => ({
  type: SET_FILTER_EXCHANGE_DATE,
  payload,
});
export const _setFilterExchangeAmount = (payload) => ({
  type: SET_FILTER_EXCHANGE_AMOUNT,
  payload,
});
export const _resetFilters = () => ({
  type: RESET_FILTERS,
});
