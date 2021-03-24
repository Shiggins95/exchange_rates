import { combineReducers } from 'redux';
import GlobalReducer from './Global_Reducer';
import FiltersReducer from './Filters_Reducer';
import ErrorsReducer from './Errors_Reducer';

export default combineReducers({
  global: GlobalReducer,
  filters: FiltersReducer,
  errors: ErrorsReducer,
});
