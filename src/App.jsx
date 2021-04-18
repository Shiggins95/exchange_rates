import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
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
          <Route exact path="/exchangerates" component={RatesPage} />
          <Route
            exact
            path="/exchangerates/exchange"
            component={Calculator}
          />
          <Route
            path="/*"
            render={() => <Redirect to="/exchangerates" />}
          />
        </Switch>
        <PopupWindow />
      </Router>
    </>
  );
}

export default App;
