/**
 * DateTypeFilter.jsx
 * Created by Lizzie Salita 11/2/17
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";

import { awardDownloadOptions } from 'dataMapping/bulkDownload/bulkDownloadOptions';
import FilterSectionTitle from 'components/bulkDownload/FilterSelectionTitle';
import BulkDownloadRadioButton from "../../../sharedComponents/BulkDownloadRadioButton";

const propTypes = { updateFilter: PropTypes.func };

// eslint-disable-next-line prefer-arrow-callback
const DateTypeFilter = memo(function DateTypeFilter({ updateFilter }) {
    const currentDateType = useSelector((state) => state.bulkDownload.awards.dateType);

    const onChange = (e) => {
        const target = e.target;
        updateFilter('dateType', target.value);
    };

    const dateTypes = awardDownloadOptions.dateTypes.map(({ name, label, description }) => (
        <BulkDownloadRadioButton
            name="dateType"
            value={name}
            checked={currentDateType === name}
            onChange={onChange}
            label={label}
            description={description}
            key={name} />
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
