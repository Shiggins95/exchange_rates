import reducer from '../Reducers/Filters_Reducer';
import * as Actions from '../Actions/Filters_Actions';

describe('Filter actions should effect redux state', () => {
  it('should render default state', () => {
    const state = reducer(undefined, {});
    const date = state.exchangeDate;
    expect(state.baseCurrency).toBe('GBP');
    expect(state.openFilter).toBe('');
    expect(state.targetCurrency).toBe('USD');
    expect(state.exchangeAmount).toBe(0);
    expect(state.baseCurrency).toBe('GBP');
    expect(date.getDate()).toBe(new Date().getDate());
    expect(date.getMonth()).toBe(new Date().getMonth());
    expect(date.getFullYear()).toBe(new Date().getFullYear());
  });
  it('should set an open filter', () => {
    const state = reducer(undefined, Actions._setFilterOpenFilter({ openFilter: 'currency' }));
    expect(state.openFilter).toBe('currency');
  });
  it('should set a base currency', () => {
    const state = reducer(undefined, Actions._setFilterBaseCurrency({ baseCurrency: 'CNY' }));
    expect(state.baseCurrency).toBe('CNY');
  });
  it('should set a target currency', () => {
    const state = reducer(undefined, Actions._setFilterTargetCurrency({ targetCurrency: 'EUR' }));
    expect(state.targetCurrency).toBe('EUR');
  });
  it('should set an exchange amount', () => {
    const state = reducer(undefined, Actions._setFilterExchangeAmount({ exchangeAmount: 120 }));
    expect(state.exchangeAmount).toBe(120);
  });
  it('should set an exchange date', () => {
    const date = new Date(2018, 10, 21);
    const state = reducer(undefined, Actions._setFilterExchangeDate({ exchangeDate: date }));
    const newDate = state.exchangeDate;
    expect(newDate.getDate()).toBe(21);
    expect(newDate.getMonth()).toBe(10);
    expect(newDate.getFullYear()).toBe(2018);
  });
});
