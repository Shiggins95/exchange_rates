import React, { createRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import SelectedOption from './SelectedOption';
import '../../Styles/MultiSelectStyles.scss';

const MultiSelect = ({
  inputType,
  options,
  label,
  selectedValue,
  onChange,
  id,
  openFilter,
  setOpenFilter,
  placeholder,
  setPopupData,
  tabIndex,
}) => {
  const [currentSearch, setCurrentSearch] = useState('');
  const focusRef = createRef();
  const showContent = openFilter === id;
  const handleClick = (event) => {
    const value = event.target.getAttribute('data-value');
    onChange(value, id);
    setOpenFilter('');
  };
  const openMenu = () => {
    const filterToSet = openFilter === id ? '' : id;
    setOpenFilter(filterToSet);
  };
  const onRemove = (value, closeMenu) => {
    // eslint-disable-next-line no-debugger
    debugger;
    const newValues = selectedValue.filter(
      (val) => val.text !== value,
    );
    onChange(newValues, id);
    if (closeMenu) {
      setOpenFilter('');
    }
  };

  const popupCallback = () => {
    setPopupData({
      popupClassName: '',
      popupMessage: '',
      popupTitle: '',
      display: false,
      callback: null,
    });
  };

  const handleEnter = (event) => {
    event.preventDefault();
    if (!currentSearch) {
      setPopupData({
        popupClassName: 'error',
        popupMessage: 'Please enter a value',
        popupTitle: 'MISSING_VALUE',
        display: true,
        callback: popupCallback,
      });
      return;
    }
    const alreadyExistingValue = selectedValue.filter(
      (value) => value.text === currentSearch,
    );
    if (alreadyExistingValue.length > 0) {
      setPopupData({
        popupClassName: 'error',
        popupMessage: `The value ${currentSearch} has already been added`,
        popupTitle: 'DUPLICATE_VALUE',
        display: true,
        callback: popupCallback,
      });
      return;
    }
    setCurrentSearch('');
    onChange([{ text: currentSearch }, ...selectedValue], id);
    if (focusRef.current) {
      focusRef.current.focus();
    }
    // setOpenFilter('');
  };
  const handleChange = (event) => {
    const { value } = event.target;
    setCurrentSearch(value);
  };

  useEffect(() => {
    if (showContent && focusRef.current) {
      focusRef.current.focus();
    }
  }, [showContent]);

  return (
    <div className="multiple_select_container">
      <div className="title">{label}</div>
      <div className="header" tabIndex={tabIndex}>
        <div className="values">
          {selectedValue.map(({ text, value }, index) => (
            <SelectedOption
              onRemove={onRemove}
              value={text}
              text={text}
              key={index}
            />
          ))}
        </div>
        <div className="add" onClick={openMenu}>
          <FontAwesomeIcon icon={faPlus} data-fa-mask-id="comment" />
        </div>
      </div>
      {showContent && (
        <div className={`content ${inputType}`}>
          <div className="search_bar">
            <form className="input" onSubmit={handleEnter}>
              <input
                type="text"
                placeholder={placeholder}
                onChange={handleChange}
                ref={focusRef}
                value={currentSearch}
              />
            </form>
            <div className="search">
              <FontAwesomeIcon
                icon={faCheck}
                onClick={handleEnter}
                id="fa_confirm"
              />
            </div>
          </div>
          <div className="options">
            {inputType === 'text'
              && selectedValue.map(({ text }, index) => (
                <SelectedOption
                  onRemove={onRemove}
                  text={text}
                  value={text}
                  inMenu
                  key={index}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

MultiSelect.propTypes = {
  inputType: PropTypes.string.isRequired,
  options: PropTypes.array,
  selectedValue: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  openFilter: PropTypes.string,
  setOpenFilter: PropTypes.func,
  setPopupData: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  tabIndex: PropTypes.number.isRequired,
};

MultiSelect.defaultProps = {
  options: [],
  selectedValue: [],
  openFilter: null,
  setOpenFilter: () => {},
};

export default MultiSelect;
