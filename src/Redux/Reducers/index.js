import { combineReducers } from 'redux';
import RatesPageReducer from './RatesPage_Reducer';
import GlobalReducer from './Global_Reducer';
import FiltersReducer from './Filters_Reducer';
import ErrorsReducer from './Errors_Reducer';

export default combineReducers({
  ratesPage: RatesPageReducer,
  global: GlobalReducer,
  filters: FiltersReducer,
  errors: ErrorsReducer,
});
