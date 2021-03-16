import actionTypes from '../ActionTypes';

const { SET_RATES_PAGE_CURRENCY, SET_RATES_PAGE_DATE } = actionTypes;

const startingState = {
  currency: '',
  date: '',
};

const RatesPageReducer = (state = startingState, action) => {
  const { payload, type } = action;

  switch (type) {
    case SET_RATES_PAGE_CURRENCY:
      return { ...state, currency: payload.currency };
    case SET_RATES_PAGE_DATE:
      return { ...state, date: payload.date };
    default:
      return { ...state };
  }
};

export default RatesPageReducer;
