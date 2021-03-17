import React from 'react';
import PropTypes from 'prop-types';
import '../Styles/NavigationStyles.scss';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const i = 0;
  return (
    <div className="navigation">
      <Link to="/exchangerates/">Exchange Rates</Link>
      <Link to="/exchangerates/exchange">
        Exchange Rate Calculator
      </Link>
    </div>
  );
};

Navbar.propTypes = {};

export default Navbar;
