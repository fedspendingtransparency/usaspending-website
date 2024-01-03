/**
 * RecipientTypeAccordion.jsx
 * Created by michaelbray on 5/17/17.
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { recipientTypes, recipientTypeGroups } from 'dataMapping/search/recipientType';
import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';
import RecipientTypeList from "./RecipientTypeList";
import { usePrevious } from '../../../../helpers';

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
    toggleCheckboxType: PropTypes.func
};

const RecipientTypeAccordion = ({
    recipientTypeMapping,
    selectedTypes,
    dirtyFilters,
    toggleCheckboxType
}) => {
    const [expanded, setExpanded] = useState(expandRecipientTypeAccordions(recipientTypeMapping, selectedTypes));
    const [hint, setHint] = useState(null);
    const prevDirtyFilters = usePrevious(dirtyFilters);

    const toggleExpanded = (category) => {
        const containsId = expanded?.indexOf(category.id);
        if (containsId <= -1) {
            setExpanded([...expanded, category.id]);
        }
        else {
            setExpanded(expanded.filter((item) => item !== category.id));
        }
    };

    const checkboxTypes =
        recipientTypeMapping.map((category) => (
            <div className="recipient-type-filter">
                <div
                    className="recipient-type-filter__heading"
                    onClick={() => toggleExpanded(category)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") toggleExpanded(category);
                    }}
                    role="button"
                    tabIndex="0">
                    {!expanded?.includes(category.id) && <FontAwesomeIcon icon="chevron-right" />}
                    {expanded?.includes(category.id) && <FontAwesomeIcon icon="chevron-down" />}
                    <div className="recipient-type-filter__header">
                        <span>{category.name}</span>
                        <span className="recipient-type-filter__item-count">{category.filters?.length} {category.filters?.length === 1 ? 'type' : 'types'}</span>
                    </div>
                </div>
                <RecipientTypeList
                    expanded={expanded?.includes(category.id)}
                    selectedTypes={selectedTypes}
                    category={category}
                    toggleCheckboxType={toggleCheckboxType}
                    recipientTypes={recipientTypes} />
            </div>));

    useEffect(() => {
        if (dirtyFilters && prevDirtyFilters !== dirtyFilters) {
            if (hint) {
                hint.showHint();
            }
        }
    }, [dirtyFilters, hint, prevDirtyFilters]);

    return (
        <div className="filter-item-wrap">
            <div className="checkbox-type-filter">
                <ul className="checkbox-types">
                    {checkboxTypes}
                </ul>
                <SubmitHint
                    ref={(component) => {
                        setHint(component);
                    }} />
            </div>
        </div>
    );
};

RecipientTypeAccordion.defaultProps = defaultProps;
RecipientTypeAccordion.propTypes = propTypes;
export default RecipientTypeAccordion;
