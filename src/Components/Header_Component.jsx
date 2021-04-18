import React from 'react';
import PropTypes from 'prop-types';
import DropDownMenu from './Inputs/DropDownMenu';
import DatePicker from './DatePicker/DatePicker';
import Checkbox from './Inputs/Checkbox';
import TextInput from './Inputs/TextInput';
import MultiSelect from './Inputs/MultipleSelect';
import { _generateUniqueKey } from '../Helpers/KeyGen';

const Header = ({
  filters,
  heading,
  subHeading,
  tag,
  showAmount,
  amount,
  onChange,
}) => {
  const renderInput = (filter, key) => {
    const defaultFilterProps = { key };
    switch (filter.type) {
      case 'checkbox':
        return <Checkbox {...filter} {...defaultFilterProps} />;
      case 'select':
        return <DropDownMenu {...filter} {...defaultFilterProps} />;
      case 'date':
        return <DatePicker {...filter} {...defaultFilterProps} />;
      case 'text':
        return <TextInput {...filter} {...defaultFilterProps} />;
      case 'multiselect':
        return <MultiSelect {...filter} {...defaultFilterProps} />;
      default:
        return null;
    }
  };
  return (
    <div className="header">
      <div className="header_text">
        {heading && heading}
        {subHeading && subHeading}
        {tag && tag}
      </div>
      <div className="filters">
        <div className="left">
          {filters.map((filter) => renderInput(filter, _generateUniqueKey(filter.id)))}
          {showAmount && (
            <TextInput
              selectedValue={amount}
              onChange={onChange}
              id="exchangeAmount"
              label="Exchange Amount"
              tabIndex={0}
            />
          )}
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  filters: PropTypes.array.isRequired,
  heading: PropTypes.object.isRequired,
  subHeading: PropTypes.object.isRequired,
  tag: PropTypes.object.isRequired,
  showAmount: PropTypes.bool,
  amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func,
};

Header.defaultProps = {
  showAmount: false,
  amount: 0,
  onChange: () => {},
};

export default Header;
