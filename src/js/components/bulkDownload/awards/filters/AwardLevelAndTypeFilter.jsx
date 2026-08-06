/**
 * AwardLevelAndTypeFilter.jsx
 * Created by Seth Stoudenmier 03/01/20
 */

import React, { memo } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { awardDownloadOptions } from 'dataMapping/bulkDownload/bulkDownloadOptions';
import {
    bulkAwardTypeChange, toggleAwardTypeChange
} from "redux/actions/bulkDownload/bulkDownloadActions";
import PrimaryCheckboxType from 'components/sharedComponents/checkbox/PrimaryCheckboxType';
import FilterSectionTitle from 'components/bulkDownload/FilterSelectionTitle';

const awardTypeLabels = Object.assign(
    {},
    ...Object.entries(awardDownloadOptions.awardTypeLookups)
        .map(([key, value]) => ({ [key]: value.label }))
);

// eslint-disable-next-line prefer-arrow-callback
const AwardLevelAndTypeFilter = memo(function AwardLevelAndTypeFilter() {
    const currentAwardTypes = useSelector((state) => state.bulkDownload.awards.awardTypes);
    const dispatch = useDispatch();

    const bulkTypeChange = (selection) => dispatch(bulkAwardTypeChange(selection));
    const toggleCheckboxType = (selection) => dispatch(toggleAwardTypeChange(selection));

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
                    bulkTypeChange={bulkTypeChange}
                    toggleCheckboxType={toggleCheckboxType}
                    key={`award-type__${id}`} />
            );
        });
    return (
        <div className="download-filter">
            <FilterSectionTitle type="awardType" />
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

export default AwardLevelAndTypeFilter;
