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
    bulkPrimeAwardTypeChange: PropTypes.func,
    bulkSubAwardTypeChange: PropTypes.func,
    togglePrimeAwardTypeChange: PropTypes.func,
    toggleSubAwardTypeChange: PropTypes.func
};

export default class AwardLevelAndTypeFilter extends React.Component {
    render() {
        const isValid = (
            this.props.currentAwardTypes.primeAwards.size > 0 ||
            this.props.currentAwardTypes.subAwards.size > 0
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

        const awardLevels = this.props.awardLevels
            .map((type, index) => {
                const selectedAwardTypes = this.props.currentAwardTypes[type.lookupName];
                const bulkCheckboxFunc = type.lookupName === 'primeAwards'
                    ? this.props.bulkPrimeAwardTypeChange
                    : this.props.bulkSubAwardTypeChange;
                const toggleCheckboxFunc = type.lookupName === 'primeAwards'
                    ? this.props.togglePrimeAwardTypeChange
                    : this.props.toggleSubAwardTypeChange;

                return (<PrimaryCheckboxType
                    {...type}
                    {...this.props}
                    key={index}
                    types={this.props.awardTypeLabels}
                    filterType="BulkDownload"
                    collapsable={false}
                    arrowState="expanded"
                    selectedCheckboxes={selectedAwardTypes}
                    bulkTypeChange={bulkCheckboxFunc}
                    toggleCheckboxType={toggleCheckboxFunc} />);
            });
        return (
            <div className="download-filter">
                <h3 className="download-filter__title">
                    {icon} Select the <span className="download-filter__title_em">award types</span> to include.
                </h3>
                <div className="checkbox-type-filter">
                    <div className="filter-item-wrap">
                        <ul className="download-filter__unordered-list">
                            {awardLevels}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

AwardLevelAndTypeFilter.propTypes = propTypes;
