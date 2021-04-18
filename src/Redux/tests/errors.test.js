import reducer from '../Reducers/Errors_Reducer';
import * as Actions from '../Actions/Errors_Actions';

describe('Error actions should effect redux state for errors', () => {
  it('should render default state', () => {
    const state = reducer(undefined, {});
    expect(state.error).toBe(false);
    expect(state.message).toBe('');
    expect(state.title).toBe('');
  });
  it('should be effected by set error action', () => {
    const errorPayload = {
      error: true,
      message: 'Error Occurred',
      title: 'ERROR_OCCURRED',
    };
    const state = reducer(undefined, Actions._setError(errorPayload));
    expect(state.error).toBe(true);
    expect(state.message).toBe('Error Occurred');
    expect(state.title).toBe('ERROR_OCCURRED');
  });
});
