import actionTypes from '../ActionTypes';

const {
  SET_FILTER_BASE_CURRENCY,
  SET_FILTER_OPEN_FILTER,
  SET_FILTER_TARGET_CURRENCY,
  SET_FILTER_EXCHANGE_DATE,
  SET_FILTER_EXCHANGE_AMOUNT,
  RESET_FILTERS,
} = actionTypes;
const startingState = {
  openFilter: '',
  baseCurrency: 'GBP',
  targetCurrency: 'USD',
  // exchangeDate: new Date(2000, 0, 1, 0, 0, 0),
  exchangeDate: new Date(),
  exchangeAmount: 0,
};

const FiltersReducer = (state = startingState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_FILTER_OPEN_FILTER:
      return { ...state, openFilter: payload.openFilter };
    case SET_FILTER_BASE_CURRENCY:
      return { ...state, baseCurrency: payload.baseCurrency };
    case SET_FILTER_TARGET_CURRENCY:
      return { ...state, targetCurrency: payload.targetCurrency };
    case SET_FILTER_EXCHANGE_DATE:
      return { ...state, exchangeDate: payload.exchangeDate };
    case SET_FILTER_EXCHANGE_AMOUNT:
      return { ...state, exchangeAmount: payload.exchangeAmount };
    case RESET_FILTERS:
      return { ...startingState };
    default:
      return { ...state };
  }
};

export default FiltersReducer;
