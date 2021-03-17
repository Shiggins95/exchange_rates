import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import RatesPage from './Views/RatesPage_View';
import Navbar from './Components/Navbar';
import { _get } from './Helpers/Requests';
import { _setGlobalCurrencies } from './Redux/Actions/Global_Actions';
import './Styles/App.scss';
import Calculator from './Views/Calculator_View';
import PopupWindow from './Components/PopupWindow';
import { _setError } from './Redux/Actions/Errors_Actions';

function App() {
  const dispatch = useDispatch();
  const [{ error, message }, setError] = useState({
    error: false,
    message: '',
  });

  useEffect(() => {
    _get('/latest?base=GBP').then((response) => {
      if (response.error) {
        dispatch(
          _setError({
            title: 'FAILED_TO_FETCH_RATES',
            message: `${response.error}. You may need to select a date in the future.`,
            error: true,
          }),
        );
        return;
      }
      const { rates } = response;
      dispatch(_setGlobalCurrencies({ currencies: rates }));
    });
  }, []);

  return (
    <>
      {/* <FilterBar /> */}
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={RatesPage} />
          <Route exact path="/exchange" component={Calculator} />
        </Switch>
        <PopupWindow />
      </Router>
    </>
  );
}

export default App;
