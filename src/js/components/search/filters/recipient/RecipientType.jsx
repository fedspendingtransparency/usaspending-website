/**
 * RecipientType.jsx
 * Created by michaelbray on 5/17/17.
 */

import React from 'react';

import { recipientTypes, recipientTypeGroups } from 'dataMapping/search/recipientType';
import PrimaryCheckboxType from '../../../sharedComponents/checkbox/PrimaryCheckboxType';

const defaultProps = {
    recipientTypeMapping: [
        {
            id: 'recipient-business',
            name: 'Business',
            filters: recipientTypeGroups.business
        },
        {
            id: 'recipient-minority-owned-business',
            name: 'Minority Owned Business',
            filters: recipientTypeGroups.minority_owned_business
        },
        {
            id: 'recipient-women-owned-business',
            name: 'Women Owned Business',
            filters: recipientTypeGroups.women_owned_business
        },
        {
            id: 'recipient-veteran-owned-business',
            name: 'Veteran Owned Business',
            filters: recipientTypeGroups.veteran_owned_business
        },
        {
            id: 'recipient-special-designations',
            name: 'Special Designations',
            filters: recipientTypeGroups.special_designations
        },
        {
            id: 'recipient-nonprofit',
            name: 'Nonprofit',
            filters: recipientTypeGroups.nonprofit
        },
        {
            id: 'recipient-higher-education',
            name: 'Higher Education',
            filters: recipientTypeGroups.higher_education
        },
        {
            id: 'recipient-government',
            name: 'Government',
            filters: recipientTypeGroups.government
        },
        {
            id: 'recipient-individuals',
            name: 'Individuals',
            filters: [],
            value: recipientTypeGroups.individuals[0]
        }
    ]
};

const propTypes = {
    recipientTypeMapping: React.PropTypes.arrayOf(React.PropTypes.object),
    recipientType: React.PropTypes.object
};

export default class RecipientType extends React.Component {

    render() {
        const checkboxTypes = (
            this.props.recipientTypeMapping.map((type, index) =>
                <PrimaryCheckboxType
                    {...type}
                    {...this.props}
                    key={index}
                    types={recipientTypes}
                    filterType="Recipient"
                    selectedCheckboxes={this.props.recipientType}
                    enableAnalytics />
            ));

        return (
            <div className="checkbox-type-filter search-filter">
                <p className="sub-head">Recipient/Business Type</p>
                <ul className="checkbox-types">
                    {checkboxTypes}
                </ul>
            </div>
        );
    }
}

RecipientType.defaultProps = defaultProps;
RecipientType.propTypes = propTypes;
