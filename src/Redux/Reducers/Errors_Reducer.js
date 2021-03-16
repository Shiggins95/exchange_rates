import actionTypes from '../ActionTypes';

const { SET_ERROR } = actionTypes;

const startingState = {
  error: false,
  message: '',
  title: '',
};

const ErrorsReducer = (state = startingState, action) => {
  const { payload, type } = action;

  switch (type) {
    case SET_ERROR:
      return {
        ...state,
        error: payload.error,
        message: payload.message,
        title: payload.title,
      };
    default:
      return { ...state };
  }
};

export default ErrorsReducer;
