import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { makeRequest } from '../Helpers/Requests';

const RefreshButton = ({
  setData,
  map,
  filters,
  setProcessing,
  processing,
  className,
  refreshType,
  setRefreshType,
  setPopupData,
}) => {
  const {
    access,
    includeAssigned,
    poNumber,
    date,
    poNumbers,
  } = filters;

  const errorPopupCallback = () => {
    setPopupData({
      popupTitle: '',
      display: false,
      popupClassName: '',
      popupMessage: '',
      callback: null,
    });
    setProcessing(false);
    setRefreshType('');
  };

  const performRefresh = async (successVal) => {
    if (setPopupData && className === 'full') {
      setPopupData({
        popupMessage: '',
        popupTitle: '',
        display: false,
        popupClassName: '',
        callback: null,
      });
    }
    if (successVal === true) {
      const constructedFilters = {
        access,
        includeAssigned,
        poNumber,
        date,
        bounds: map.getBounds().toJSON(),
        poNumbers,
      };

      setProcessing(true);
      setRefreshType(className);
      const { data, error, message } = await makeRequest({
        body: {
          ...constructedFilters,
          url: `${process.env.REACT_APP_NS_URL}&functionName=getCases`,
        },
      });

      if (error) {
        setPopupData({
          popupMessage:
            typeof message === 'string'
              ? message
              : JSON.stringify(message),
          popupTitle: 'ERROR_GETTING_CASES',
          popupClassName: 'error',
          callback: errorPopupCallback,
          display: true,
        });
        return;
      }

      setData(data, className);
    }
    setRefreshType('');
    setProcessing(false);
  };
  const handleRefresh = async () => {
    if (processing) {
      return;
    }

    setProcessing(true);
    setRefreshType(className);

    if (setPopupData && className === 'full') {
      setPopupData({
        popupMessage:
          'Are you sure you want to perform a full refresh? This may take longer and slow down the performance of the map...',
        popupTitle: 'CONFIRMATION',
        display: true,
        popupClassName: 'confirm',
        callback: performRefresh,
      });
    } else {
      await performRefresh(true);
    }
  };

  return (
    <div className={`refresh_button ${className}`}>
      {processing && refreshType === className && (
        <div className="refresh no_click">
          <div className="label">
            <p>
              {className === 'basic'
                ? 'Basic Refresh'
                : 'Full Refresh'}
            </p>
          </div>
          <div className="button">
            <div className="lds-dual-ring" />
          </div>
        </div>
      )}
      {(!processing || className !== refreshType) && (
        <div className="refresh">
          <div className="label">
            <p>
              {className === 'basic'
                ? 'Basic Refresh'
                : 'Full Refresh'}
            </p>
          </div>
          <div className="button">
            <FontAwesomeIcon
              icon={faSyncAlt}
              size="2x"
              onClick={handleRefresh}
            />
          </div>
        </div>
      )}
    </div>
  );
};

RefreshButton.propTypes = {
  setData: PropTypes.func.isRequired,
  map: PropTypes.object,
  filters: PropTypes.object.isRequired,
  setProcessing: PropTypes.func.isRequired,
  processing: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  refreshType: PropTypes.string.isRequired,
  setRefreshType: PropTypes.func.isRequired,
  setPopupData: PropTypes.func,
};

RefreshButton.defaultProps = {
  map: null,
  setPopupData: null,
};

export default RefreshButton;
