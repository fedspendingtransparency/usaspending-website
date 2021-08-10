/**
 * RecipientType.jsx
 * Created by michaelbray on 5/17/17.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { recipientTypes, recipientTypeGroups } from 'dataMapping/search/recipientType';
import PrimaryCheckboxType from 'components/sharedComponents/checkbox/PrimaryCheckboxType';
import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';

const defaultProps = {
    recipientTypeMapping: [
        {
            id: 'recipient-business',
            name: 'Business',
            filters: recipientTypeGroups.category_business
        },
        {
            id: 'recipient-minority-owned-business',
            name: 'Minority Owned Business',
            filters: recipientTypeGroups.minority_owned_business
        },
        {
            id: 'recipient-women-owned-business',
            name: 'Women Owned Business',
            filters: recipientTypeGroups.woman_owned_business
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
    recipientTypeMapping: PropTypes.arrayOf(PropTypes.object),
    selectedTypes: PropTypes.object,
    dirtyFilters: PropTypes.symbol
};

export default class RecipientType extends React.Component {
    componentDidUpdate(prevProps) {
        if (this.props.dirtyFilters && prevProps.dirtyFilters !== this.props.dirtyFilters) {
            if (this.hint) {
                this.hint.showHint();
            }
        }
    }

    render() {
        const checkboxTypes =
            this.props.recipientTypeMapping.map((type, index) =>
                (<PrimaryCheckboxType
                    {...type}
                    {...this.props}
                    key={index}
                    types={recipientTypes}
                    filterType="Recipient"
                    selectedCheckboxes={this.props.selectedTypes} />
                )
            );

        return (
            <div className="filter-item-wrap">
                <div className="checkbox-type-filter">
                    <ul className="checkbox-types">
                        {checkboxTypes}
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

RecipientType.defaultProps = defaultProps;
RecipientType.propTypes = propTypes;
