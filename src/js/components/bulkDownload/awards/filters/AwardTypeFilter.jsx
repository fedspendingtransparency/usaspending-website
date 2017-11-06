/**
 * AwardTypeFilter.jsx
 * Created by Lizzie Salita 11/2/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { CheckCircle, ExclamationTriangle } from 'components/sharedComponents/icons/Icons';
import { indexOf, remove, concat } from 'lodash';

import DownloadCheckbox from '../../DownloadCheckbox';

const propTypes = {
    awardTypes: PropTypes.array,
    currentAwardTypes: PropTypes.array,
    updateFilter: PropTypes.func
};

export default class AwardTypeFilter extends React.Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(name, value) {
        if (value) {
            const updatedAwardTypes = concat(this.props.currentAwardTypes, [name]);
            this.props.updateFilter('award_types', updatedAwardTypes);
        }
        else {
            const updatedAwardTypes = remove(this.props.currentAwardTypes, (item) => item !== name);
            this.props.updateFilter('award_types', updatedAwardTypes);
        }
    }

    render() {
        const awardTypesArray = this.props.currentAwardTypes;

        const currentAwardTypes = {
            contracts: (indexOf(awardTypesArray, 'contracts') !== -1),
            grants: (indexOf(awardTypesArray, 'grants') !== -1),
            direct_payments: (indexOf(awardTypesArray, 'direct_payments') !== -1),
            loans: (indexOf(awardTypesArray, 'loans') !== -1),
            other_financial_assistance: (indexOf(awardTypesArray, 'other_financial_assistance') !== -1)
        };

        const isValid = (
            currentAwardTypes.contracts ||
                currentAwardTypes.grants ||
                currentAwardTypes.direct_payments ||
                currentAwardTypes.loans ||
                currentAwardTypes.other_financial_assistance
        );

        let icon = (
            <div className="icon valid">
                <CheckCircle />
            </div>
        );

        if (!isValid) {
            icon = (
                <div className="icon invalid">
                    <ExclamationTriangle />
                </div>
            );
        }

        const awardTypes = this.props.awardTypes.map((type) => (
            <DownloadCheckbox
                key={type.name}
                name={type.name}
                label={type.label}
                checked={currentAwardTypes[type.name]}
                onChange={this.onChange} />
        ));

        return (
            <div className="filter-section">
                <h5 className="filter-section-title">
                    {icon} Select the <span>award types</span> to include.
                </h5>
                <div className="filter-section-content">
                    {awardTypes}
                </div>
            </div>
        );
    }
}

AwardTypeFilter.propTypes = propTypes;
