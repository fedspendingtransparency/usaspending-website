/**
 * AwardLevelAndTypeFilter.jsx
 * Created by Seth Stoudenmier 03/01/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { CheckCircle, ExclamationCircle } from 'components/sharedComponents/icons/Icons';
import PrimaryCheckboxType from '../../../sharedComponents/checkbox/PrimaryCheckboxType';

const propTypes = {
    awardLevels: PropTypes.array,
    awardTypeLabels: PropTypes.object,
    currentAwardTypes: PropTypes.object,
    bulkAwardTypeChange: PropTypes.func,
    toggleAwardTypeChange: PropTypes.func
};

const AwardLevelAndTypeFilter = (props) => {
    const isValid = (
        props.currentAwardTypes.primeAwards.size > 0 ||
        props.currentAwardTypes.subAwards.size > 0
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

    const awardLevelCheckboxes = props.awardLevels
        .map((type, index) => {
            const selectedAwardTypes = props.currentAwardTypes[type.lookupName];

            return (<PrimaryCheckboxType
                {...type}
                {...props}
                key={index}
                types={props.awardTypeLabels}
                filterType="BulkDownload"
                isCollapsable={false}
                arrowState="expanded"
                selectedCheckboxes={selectedAwardTypes}
                bulkTypeChange={props.bulkAwardTypeChange}
                toggleCheckboxType={props.toggleAwardTypeChange} />);
        });
    return (
        <div className="download-filter">
            <h3 className="download-filter__title">
                {icon} Select the <span className="download-filter__title_em">award types</span> to include.
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
};

AwardLevelAndTypeFilter.propTypes = propTypes;
export default AwardLevelAndTypeFilter;
