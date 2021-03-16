import actionTypes from '../ActionTypes';

const { SET_GLOBAL_CURRENCIES } = actionTypes;
// eslint-disable-next-line
export const _setGlobalCurrencies = (payload) => ({
  type: SET_GLOBAL_CURRENCIES,
  payload,
});
