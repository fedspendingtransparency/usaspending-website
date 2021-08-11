/**
 * AwardType.jsx
 * Created by Emily Gullo 11/01/2016
 **/

import React from 'react';
import PropTypes from 'prop-types';

import { awardTypeGroups, awardTypeCodes } from 'dataMapping/search/awardType';
import PrimaryCheckboxType from 'components/sharedComponents/checkbox/PrimaryCheckboxType';
import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';

const awardTypesData = [
    {
        id: 'award-contracts',
        name: 'Contracts',
        filters: awardTypeGroups.contracts
    },
    {
        id: 'indefinite-delivery-vehicle',
        name: 'Contract IDVs',
        filters: awardTypeGroups.idvs
    },
    {
        id: 'award-grants',
        name: 'Grants',
        filters: awardTypeGroups.grants
    },
    {
        id: 'award-direct-payments',
        name: 'Direct Payments',
        filters: awardTypeGroups.direct_payments
    },
    {
        id: 'award-loans',
        name: 'Loans',
        filters: awardTypeGroups.loans
    },
    {
        id: 'award-other',
        name: 'Other',
        filters: awardTypeGroups.other
    }
];

const propTypes = {
    awardTypes: PropTypes.arrayOf(PropTypes.object),
    awardType: PropTypes.object,
    bulkTypeChange: PropTypes.func,
    dirtyFilters: PropTypes.symbol
};

export default class AwardType extends React.Component {
    componentDidUpdate(prevProps) {
        if (this.props.dirtyFilters && prevProps.dirtyFilters !== this.props.dirtyFilters) {
            if (this.hint) {
                this.hint.showHint();
            }
        }
    }

    render() {
        const awardTypes = awardTypesData
            .map((type, index) => (
                <PrimaryCheckboxType
                    {...type}
                    {...this.props}
                    key={index}
                    types={awardTypeCodes}
                    filterType="Award"
                    selectedCheckboxes={this.props.awardType}
                    bulkTypeChange={this.props.bulkTypeChange} />
            ));

        return (
            <div className="award-type-filter search-filter checkbox-type-filter">
                <div className="filter-item-wrap">
                    <ul className="checkbox-types">
                        {awardTypes}
                    </ul>
                    <SubmitHint
                        ref={(component) => {
                            this.hint = component;
                        }} />
                </div>
            </div>
        );
    }
}
AwardType.propTypes = propTypes;
