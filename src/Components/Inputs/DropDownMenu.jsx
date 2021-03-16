import React from 'react';
import {
  faCaretDown,
  faCaretUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import '../../Styles/DropDownMenuStyles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { _setFilterOpenFilter } from '../../Redux/Actions/Filters_Actions';

const DropDownMenu = ({
  options,
  selectedValue,
  onChange,
  id,
  label,
  tabIndex,
  setOpenFilter,
}) => {
  const dispatch = useDispatch();
  const { openFilter } = useSelector((state) => state.filters);
  const showContent = openFilter === id;
  const handleClick = (event) => {
    const value = event.target.getAttribute('data-value');
    onChange(value, id);
    dispatch(_setFilterOpenFilter({ openFilter: '' }));
  };
  const openMenu = () => {
    const filterToSet = openFilter === id ? '' : id;
    dispatch(_setFilterOpenFilter({ openFilter: filterToSet }));
  };
  const selectedNode = options.filter(
    (option) => option.value.toString() === selectedValue.toString(),
  )[0];
  const currentText = selectedNode ? selectedNode.text : '';
  return (
    <div className="dropdown_menu_container">
      <div className="title">{label}</div>
      <div
        className="input_header"
        onClick={openMenu}
        tabIndex={tabIndex}
      >
        <p>{currentText}</p>
        <FontAwesomeIcon
          icon={showContent ? faCaretUp : faCaretDown}
        />
      </div>
      {showContent && (
        <div className="content">
          {options.map((option) => (
            <div
              className={`option ${
                selectedValue === option.value ? 'selected' : ''
              }`}
              data-value={option.value}
              key={option.value}
              onClick={handleClick}
            >
              {option.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

DropDownMenu.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  tabIndex: PropTypes.number,
  setOpenFilter: PropTypes.func,
};
DropDownMenu.defaultProps = {
  selectedValue: null,
  tabIndex: null,
  setOpenFilter: null,
};

export default DropDownMenu;
