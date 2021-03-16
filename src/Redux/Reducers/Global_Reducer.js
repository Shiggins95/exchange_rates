import actionTypes from '../ActionTypes';

const { SET_GLOBAL_CURRENCIES } = actionTypes;
const startingState = {
  currencies: {},
};

const GlobalReducer = (state = startingState, action) => {
  const { payload, type } = action;
  if (type === SET_GLOBAL_CURRENCIES) {
    return { ...state, currencies: payload.currencies };
  }
  return { ...state };
};

export default GlobalReducer;
