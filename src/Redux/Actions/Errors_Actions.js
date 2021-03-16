import actionTypes from '../ActionTypes';

const { SET_ERROR } = actionTypes;

export const _setError = (payload) => ({
  type: SET_ERROR,
  payload,
});
