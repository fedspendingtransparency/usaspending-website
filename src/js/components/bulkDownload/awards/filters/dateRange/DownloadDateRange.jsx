/**
 * DownloadDateRange.jsx
 * Created by Lizzie Salita 11/1/17
 **/

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import CustomDatePicker from './CustomDatePicker';

const propTypes = {
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    onDateChange: PropTypes.func,
    error: PropTypes.object
};

// eslint-disable-next-line prefer-arrow-callback
const DownloadDateRange = memo(function DownloadDateRange({
    startDate = '01/01/2016',
    endDate = '12/31/2016',
    onDateChange,
    error = { active: false }
}) {
    return (
        <div className="datepicker-container">
            <CustomDatePicker
                value={startDate}
                type="startDateBulk"
                onDateChange={onDateChange}
                title={<>Start Date <span className="required"> (Required)</span></>}
                min="2000-10-01"
                error={error} />
            <CustomDatePicker
                value={endDate}
                type="endDateBulk"
                title={<>End Date <span className="required"> (Required)</span></>}
                onDateChange={onDateChange}
                min="2000-10-01"
                error={error} />
        </div>
    );
});

DownloadDateRange.propTypes = propTypes;

export default DownloadDateRange;
