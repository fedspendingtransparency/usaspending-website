/**
 * DownloadDateRange.jsx
 * Created by Lizzie Salita 11/1/17
 **/

import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'components/sharedComponents/DatePicker';

const propTypes = {
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    onDateChange: PropTypes.func,
    hideError: PropTypes.func
};

const DownloadDateRange = ({
    startDate = '01/01/2016',
    endDate = '12/31/2016',
    onDateChange,
    hideError
}) => (
    <div className="date-pickers">
        <DatePicker
            value={startDate}
            type="startDateBulk"
            onDateChange={onDateChange}
            title="Start Date"
            hideError={hideError}
            min="2001-10-01" />
        <DatePicker
            value={endDate}
            type="endDateBulk"
            title="End Date"
            onDateChange={onDateChange}
            hideError={hideError}
            min="2001-10-01" />
    </div>
);

DownloadDateRange.propTypes = propTypes;

export default DownloadDateRange;
