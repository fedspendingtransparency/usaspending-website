/**
 * DownloadDateRange.jsx
 * Created by Lizzie Salita 11/1/17
 **/

import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'components/sharedComponents/DatePicker';

const propTypes = {
    onDateChange: PropTypes.func,
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    showError: PropTypes.func,
    hideError: PropTypes.func,
    startingTab: PropTypes.number
};

const DownloadDateRange = ({
    onDateChange,
    startDate = '01/01/2016',
    endDate = '12/31/2016',
    showError,
    hideError,
    startingTab
}) => (
    <div className="date-pickers">
        <DatePicker
            type="startDateBulk"
            title="Start Date"
            tabIndex={startingTab}
            onDateChange={onDateChange}
            value={startDate}
            opposite={endDate}
            showError={showError}
            hideError={hideError} />
        <DatePicker
            type="endDateBulk"
            title="End Date"
            tabIndex={startingTab + 4}
            onDateChange={onDateChange}
            value={endDate}
            opposite={startDate}
            showError={showError}
            hideError={hideError} />
    </div>
);

DownloadDateRange.propTypes = propTypes;

export default DownloadDateRange;
