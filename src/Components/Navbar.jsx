import React, { useState } from 'react';
import '../Styles/NavigationStyles.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useSpring, animated } from 'react-spring';
import { useDispatch } from 'react-redux';
import useCheckMobileScreen from '../Helpers/IsMobile';
import {
  _resetFilters,
  _setFilterOpenFilter,
} from '../Redux/Actions/Filters_Actions';

const Navbar = () => {
  const [display, setDisplay] = useState(false);
  const isMobile = useCheckMobileScreen();
  const dispatch = useDispatch();
  const props = useSpring({
    opacity: display ? 1 : 1,
    left: display ? '0' : '-100%',
    display: display ? 'grid' : 'none',
  });

  const handleClick = (displayToSet) => {
    if (isMobile) {
      setDisplay(displayToSet);
    }
    dispatch(_resetFilters());
    dispatch(_setFilterOpenFilter(''));
  };

  return !useCheckMobileScreen() ? (
    <div className="navigation">
      <Link to="/exchangerates/" onClick={handleClick}>
        Exchange Rates
      </Link>
      <Link to="/exchangerates/exchange" onClick={handleClick}>
        Exchange Rate Calculator
      </Link>
    </div>
  ) : (
    <div className="navigation mobile">
      <FontAwesomeIcon
        icon={faBars}
        id="bars_menu"
        onClick={() => handleClick(!display)}
        size="2x"
      />
      <animated.div className="navbar_content" style={{ ...props }}>
        <Link to="/exchangerates/" onClick={() => handleClick(false)}>
          Exchange Rates
        </Link>
        <Link
          to="/exchangerates/exchange"
          onClick={() => handleClick(false)}
        >
          Exchange Rate Calculator
        </Link>
      </animated.div>
    </div>
  );
};

Navbar.propTypes = {};

export default Navbar;
