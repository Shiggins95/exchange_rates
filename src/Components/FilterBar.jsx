import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Inputs/Checkbox';
import DropDownMenu from './Inputs/DropDownMenu';
import DatePicker from './DatePicker/DatePicker';
import TextInput from './Inputs/TextInput';
import MultiSelect from './Inputs/MultipleSelect';
import '../Styles/FiltersStyles.scss';

const FilterBar = (props) => {
  const handleChange = (value, id) => {};

  const renderInput = (filter, key) => {
    const defaultFilterProps = {};
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

  const displayFilters = [
    {
      id: 'includeAssigned',
      normalOnChange: true,
      label: 'Include Assigned',
      type: 'checkbox',
      disabled: false,
    },
    {
      id: 'access',
      normalOnChange: true,
      label: 'Access',
      type: 'select',
      disabled: false,
    },
    {
      id: 'poNumber',
      normalOnChange: true,
      label: 'PO Number',
      type: 'text',
      disabled: false,
    },
    {
      id: 'date',
      normalOnChange: true,
      label: 'Date',
      type: 'date',
      disabled: false,
    },
  ];

  return (
    <div id="filters_container">
      <div className="left">
        {displayFilters.map((filter, index) =>
          renderInput(filter, index),
        )}
      </div>
      <div className="right">
        {/* <RefreshButton */}
        {/*  setData={() => {}} */}
        {/*  map={{}} */}
        {/*  filters={filters} */}
        {/*  setProcessing={setProcessing} */}
        {/*  processing={processing} */}
        {/*  className="basic" */}
        {/*  refreshType={refreshType} */}
        {/*  setRefreshType={setRefreshType} */}
        {/*  setPopupData={setPopupData} */}
        {/* /> */}
        {/* <RefreshButton */}
        {/*  setData={() => {}} */}
        {/*  map={{}} */}
        {/*  filters={filters} */}
        {/*  setProcessing={setProcessing} */}
        {/*  processing={processing} */}
        {/*  className="full" */}
        {/*  refreshType={refreshType} */}
        {/*  setRefreshType={setRefreshType} */}
        {/*  setPopupData={setPopupData} */}
        {/* /> */}
      </div>
    </div>
  );
};

FilterBar.propTypes = {};

export default FilterBar;
