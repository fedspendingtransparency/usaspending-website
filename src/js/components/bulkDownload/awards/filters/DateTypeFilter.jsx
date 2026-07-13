/**
 * DateTypeFilter.jsx
 * Created by Lizzie Salita 11/2/17
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";

import { awardDownloadOptions } from '../../../../dataMapping/bulkDownload/bulkDownloadOptions';
import FilterSectionTitle from '../../../../components/bulkDownload/FilterSelectionTitle';

const propTypes = { updateFilter: PropTypes.func };

// eslint-disable-next-line prefer-arrow-callback
const DateTypeFilter = memo(function DateTypeFilter({ updateFilter }) {
    const currentDateType = useSelector((state) => state.bulkDownload.awards.dateType);

    const onChange = (e) => {
        const target = e.target;
        updateFilter('dateType', target.value);
    };

    const dateTypes = awardDownloadOptions.dateTypes.map((dateType) => (
        <div
            className="radio"
            key={dateType.name}>
            <label className="radio-label" htmlFor="dateType">
                <input
                    type="radio"
                    aria-label={dateType.name}
                    value={dateType.name}
                    name="dateType"
                    checked={currentDateType === dateType.name}
                    onChange={onChange} />
                <div className="text-container">
                    {dateType.label}
                    <div className="radio-description">
                        {dateType.description}
                    </div>
                </div>
            </label>
        </div>
    ));

    return (
        <div className="download-filter">
            <FilterSectionTitle type="date" />
            <div className="download-filter__content date-type">
                {dateTypes}
            </div>
        </div>
    );
});

DateTypeFilter.propTypes = propTypes;
export default DateTypeFilter;
