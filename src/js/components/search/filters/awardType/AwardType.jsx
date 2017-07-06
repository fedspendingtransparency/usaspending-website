/**
 * AwardType.jsx
 * Created by Emily Gullo 11/01/2016
 **/

import React from 'react';
import PropTypes from 'prop-types';

import { awardTypeGroups, awardTypeCodes } from 'dataMapping/search/awardType';
import PrimaryCheckboxType from 'components/sharedComponents/checkbox/PrimaryCheckboxType';

const defaultProps = {
    awardTypes: [
        {
            id: 'award-contracts',
            name: 'Contracts',
            filters: awardTypeGroups.contracts
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
            id: 'award-insurance',
            name: 'Insurance',
            filters: [],
            value: awardTypeGroups.insurance[0]
        }
    ]
};

const propTypes = {
    awardTypes: PropTypes.arrayOf(PropTypes.object),
    awardType: PropTypes.object,
    bulkTypeChange: PropTypes.func
};

export default class AwardType extends React.Component {

    render() {
        const awardTypes = (
            this.props.awardTypes.map((type, index) =>
                <PrimaryCheckboxType
                    {...type}
                    {...this.props}
                    key={index}
                    types={awardTypeCodes}
                    filterType="Award"
                    selectedCheckboxes={this.props.awardType}
                    bulkTypeChange={this.props.bulkTypeChange}
                    enableAnalytics />
            ));

        return (
            <div className="award-type-filter search-filter checkbox-type-filter">
                <div className="filter-item-wrap">
                    <ul className="checkbox-types">
                        {awardTypes}
                    </ul>
                </div>
            </div>
        );
    }
}
AwardType.defaultProps = defaultProps;
AwardType.propTypes = propTypes;
