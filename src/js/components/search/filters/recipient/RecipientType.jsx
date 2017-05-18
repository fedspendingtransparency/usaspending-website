/**
 * RecipientType.jsx
 * Created by michaelbray on 5/17/17.
 */

import React from 'react';

import { recipientTypeGroups } from 'dataMapping/search/recipientType';
import PrimaryCheckboxType from '../../../sharedComponents/checkbox/PrimaryCheckboxType';

const defaultProps = {
    recipientTypes: [
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
    recipientTypes: React.PropTypes.arrayOf(React.PropTypes.object),
    recipientType: React.PropTypes.object
};

export default class RecipientType extends React.Component {

    render() {
        const recipientTypes = (
            this.props.recipientTypes.map((type, index) =>
                <PrimaryCheckboxType
                    {...type}
                    {...this.props}
                    key={index}
                    filterType="Recipient"
                    selectedCheckboxes={this.props.recipientType} />
            ));

        return (
            <div className="checkbox-type-filter search-filter">
                <p>Recipient Type</p>
                <ul className="checkbox-types">
                    {recipientTypes}
                </ul>
            </div>
        );
    }
}

RecipientType.defaultProps = defaultProps;
RecipientType.propTypes = propTypes;
