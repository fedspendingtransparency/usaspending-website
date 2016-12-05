/**
 * AwardType.jsx
 * Created by Emily Gullo 11/01/2016
 **/

import React from 'react';

import { awardTypeGroups } from 'dataMapping/search/awardType';
import PrimaryAwardType from './PrimaryAwardType';

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
    awardTypes: React.PropTypes.arrayOf(React.PropTypes.object)
};

export default class AwardType extends React.Component {

    render() {
        const awardTypes = (
            this.props.awardTypes.map((type, index) =>
                <PrimaryAwardType {...type} {...this.props} key={index} />
        ));

        return (
            <div className="award-type-filter search-filter">
                <ul className="award-types">
                    {awardTypes}
                </ul>
            </div>
        );
    }
}
AwardType.defaultProps = defaultProps;
AwardType.propTypes = propTypes;
