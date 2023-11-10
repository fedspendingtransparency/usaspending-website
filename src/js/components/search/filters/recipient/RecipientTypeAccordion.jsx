/**
 * RecipientTypeAccordion.jsx
 * Created by michaelbray on 5/17/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { recipientTypes, recipientTypeGroups } from 'dataMapping/search/recipientType';
import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';
import RecipientTypeList from "./RecipientTypeList";

const defaultProps = {
    recipientTypeMapping: [
        {
            id: 'recipient-business',
            name: 'General Business',
            filters: recipientTypeGroups.category_business
        },
        {
            id: 'recipient-minority-owned-business',
            name: 'Minority Owned Business',
            filters: recipientTypeGroups.category_minority_owned_business
        },
        {
            id: 'recipient-women-owned-business',
            name: 'Women Owned Business',
            filters: recipientTypeGroups.category_woman_owned_business
        },
        {
            id: 'recipient-veteran-owned-business',
            name: 'Veteran Owned Business',
            filters: recipientTypeGroups.category_veteran_owned_business
        },
        {
            id: 'recipient-special-designations',
            name: 'Special Designations',
            filters: recipientTypeGroups.category_special_designations
        },
        {
            id: 'recipient-nonprofit',
            name: 'Nonprofit',
            filters: recipientTypeGroups.category_nonprofit
        },
        {
            id: 'recipient-higher-education',
            name: 'Higher Education',
            filters: recipientTypeGroups.category_higher_education
        },
        {
            id: 'recipient-government',
            name: 'Government',
            filters: recipientTypeGroups.category_government
        },
        {
            id: 'recipient-individuals',
            name: 'Individuals',
            filters: recipientTypeGroups.category_individuals
        }
    ]
};

const expandRecipientTypeAccordions = (recipientTypeMapping, selectedTypes) => {
    const toExpand = [];
    recipientTypeMapping.forEach((category) => {
        category.filters.forEach((type) => {
            if (selectedTypes.has(type)) {
                toExpand.push(category.id);
            }
        });
    });

    return toExpand;
};

const propTypes = {
    recipientTypeMapping: PropTypes.arrayOf(PropTypes.object),
    selectedTypes: PropTypes.object,
    dirtyFilters: PropTypes.symbol,
    expandRecipientTypeAccordions: PropTypes.func
};

export default class RecipientTypeAccordion extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: expandRecipientTypeAccordions(this.props.recipientTypeMapping, this.props.selectedTypes),
            selectedTypes: []
        };

        this.toggleExpanded = this.toggleExpanded.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.dirtyFilters && prevProps.dirtyFilters !== this.props.dirtyFilters) {
            if (this.hint) {
                this.hint.showHint();
            }
        }
    }

    toggleExpanded(category) {
        const containsId = this.state.expanded?.indexOf(category.id);
        if (containsId <= -1) {
            this.setState({ expanded: [...this.state.expanded, category.id] });
        }
        else {
            this.setState({ expanded: this.state.expanded.filter((item) => item !== category.id) });
        }
    }

    render() {
        const checkboxTypes =
            this.props.recipientTypeMapping.map((category) => (
                <div className="recipient-type-filter">
                    <div className="recipient-type-filter__heading">
                        <div
                            onClick={() => this.toggleExpanded(category)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") this.toggleExpanded(category);
                            }}
                            role="button"
                            tabIndex="0">
                            {!this.state.expanded?.includes(category.id) && <FontAwesomeIcon icon="chevron-right" />}
                            {this.state.expanded?.includes(category.id) && <FontAwesomeIcon icon="chevron-down" />}
                        </div>
                        <div>
                            <span className="recipient-type-filter__header">{category.name}&nbsp;&nbsp;</span>
                            <span className="recipient-type-filter__item-count">{category.filters?.length} types</span>
                        </div>
                    </div>
                    <RecipientTypeList
                        expanded={this.state.expanded?.includes(category.id)}
                        selectedTypes={this.props.selectedTypes}
                        category={category}
                        toggleCheckboxType={this.props.toggleCheckboxType}
                        recipientTypes={recipientTypes} />
                </div>));

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

RecipientTypeAccordion.defaultProps = defaultProps;
RecipientTypeAccordion.propTypes = propTypes;
