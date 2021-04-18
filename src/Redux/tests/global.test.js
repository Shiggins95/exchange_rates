import reducer from '../Reducers/Global_Reducer';
import * as Actions from '../Actions/Global_Actions';

describe('Global actions should effect redux state', () => {
  it('should have default state', () => {
    const state = reducer(undefined, {});
    expect(JSON.stringify(state.currencies)).toBe('{}');
  });
  it('should allow currencies to be set', () => {
    const state = reducer(undefined, Actions._setGlobalCurrencies({ currencies: { GBP: '123' } }));
    expect(JSON.stringify(state.currencies)).toBe(JSON.stringify({ GBP: '123' }));
    expect(state.currencies.GBP).toBe('123');
  });
});
