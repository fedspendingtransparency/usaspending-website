/**
 * DownloadDateRange.jsx
 * Created by Lizzie Salita 11/1/17
 **/

import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'components/sharedComponents/DatePicker';

const propTypes = {
    onDateChange: PropTypes.func,
    hideError: PropTypes.func
};

const DownloadDateRange = ({
    onDateChange,
    hideError
}) => (
    <div className="date-pickers">
        <DatePicker
            type="startDateBulk"
            onDateChange={onDateChange}
            title="Start Date"
            hideError={hideError} />
        <DatePicker
            type="endDateBulk"
            title="End Date"
            onDateChange={onDateChange}
            hideError={hideError} />
    </div>
);

DownloadDateRange.propTypes = propTypes;

export default DownloadDateRange;
