/**
 * DateTypeFilter.jsx
 * Created by Lizzie Salita 11/2/17
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { awardDownloadOptions } from 'dataMapping/bulkDownload/bulkDownloadOptions';
import { CheckCircle, ExclamationCircle } from 'components/sharedComponents/icons/Icons';
import { useSelector } from "react-redux";

const propTypes = { updateFilter: PropTypes.func };

// eslint-disable-next-line prefer-arrow-callback
const DateTypeFilter = memo(function DateTypeFilter({
    updateFilter
}) {
    const currentDateType = useSelector((state) => state.bulkDownload.awards.dateType);

    const valid = currentDateType !== '';

    const onChange = (e) => {
        const target = e.target;
        updateFilter('dateType', target.value);
    };

    let icon = (
        <div className="icon valid">
            <CheckCircle />
        </div>
    );
    if (!valid) {
        icon = (
            <div className="icon invalid">
                <ExclamationCircle />
            </div>
        );
    }
    const dateTypes = awardDownloadOptions.dateTypes.map((dateType) => (
        <div
            className="radio"
            key={dateType.name}>
            <input
                type="radio"
                aria-label={dateType.name}
                value={dateType.name}
                name="dateType"
                checked={currentDateType === dateType.name}
                onChange={onChange} />
            <label className="radio-label" htmlFor="dateType">
                {dateType.label}
            </label>
            <div className="radio-description">
                {dateType.description}
            </div>
        </div>
    ));

    return (
        <div className="download-filter">
            <h3 className="download-filter__title">
                {icon} Select a
                <span className="download-filter__title_em"> date type </span>
                for the date range below.
            </h3>
            <div className="download-filter__content">
                {dateTypes}
            </div>
        </div>
    );
});

DateTypeFilter.propTypes = propTypes;
export default DateTypeFilter;
