/**
 * AwardLevelAndTypeFilter.jsx
 * Created by Seth Stoudenmier 03/01/20
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import { CheckCircle, ExclamationCircle } from 'components/sharedComponents/icons/Icons';
import { awardDownloadOptions } from 'dataMapping/bulkDownload/bulkDownloadOptions';
import PrimaryCheckboxType from 'components/sharedComponents/checkbox/PrimaryCheckboxType';

const awardTypeLabels = Object.assign(
    {},
    ...Object.entries(awardDownloadOptions.awardTypeLookups)
        .map(([key, value]) => ({ [key]: value.label }))
);

const propTypes = {
    bulkAwardTypeChange: PropTypes.func,
    toggleAwardTypeChange: PropTypes.func
};

// eslint-disable-next-line prefer-arrow-callback
const AwardLevelAndTypeFilter = memo(function AwardLevelAndTypeFilter({
    bulkAwardTypeChange,
    toggleAwardTypeChange
}) {
    const currentAwardTypes = useSelector((state) => state.bulkDownload.awards.awardTypes);

    const isValid = (
        currentAwardTypes.primeAwards.size > 0 ||
        currentAwardTypes.subAwards.size > 0
    );

    let icon = (
        <div className="icon valid">
            <CheckCircle />
        </div>
    );

    if (!isValid) {
        icon = (
            <div className="icon invalid">
                <ExclamationCircle />
            </div>
        );
    }

    const awardLevelCheckboxes = awardDownloadOptions.awardLevels
        .map(({
            id, name, lookupName, filters
        }) => {
            const selectedAwardTypes = currentAwardTypes[lookupName];

            return (
                <PrimaryCheckboxType
                    id={id}
                    name={name}
                    lookupName={lookupName}
                    filters={filters}
                    filterType="BulkDownload"
                    types={awardTypeLabels}
                    arrowState="expanded"
                    selectedCheckboxes={selectedAwardTypes}
                    isCollapsable={false}
                    bulkTypeChange={bulkAwardTypeChange}
                    toggleCheckboxType={toggleAwardTypeChange}
                    key={`award-type__${id}`} />
            );
        });
    return (
        <div className="download-filter">
            <h3 className="download-filter__title">
                {icon} Select the
                <span className="download-filter__title_em"> award types </span>
                to include.
            </h3>
            <div className="checkbox-type-filter">
                <div className="filter-item-wrap">
                    <ul className="download-filter__unordered-list">
                        {awardLevelCheckboxes}
                    </ul>
                </div>
            </div>
        </div>
    );
});

AwardLevelAndTypeFilter.propTypes = propTypes;
export default AwardLevelAndTypeFilter;
