/**
 * AccordionCheckboxSecondary.jsx
 * Created by Josue Aguilar on 09/11/2024.
 */

import React from "react";
import PropTypes from "prop-types";
import replaceString from '../../../helpers/replaceString';

const propTypes = {
    category: PropTypes.object,
    selectedFilters: PropTypes.object,
    singleFilterChange: PropTypes.func,
    filters: PropTypes.object,
    customLabels: PropTypes.object,
    expanded: PropTypes.bool,
    searchString: PropTypes.string
};

// sub-filters hidden from the user, but  passed to the API when the parent filter is selected
const excludedSubFilters = "IDV_B";

const AccordionCheckboxSecondary = ({
    category, selectedFilters, singleFilterChange, filters, customLabels, expanded, searchString
}) => {
    const selectFilter = (filter) => {
        const selection = {
            value: filter
        };

        singleFilterChange(selection);
    };
    const highlightText = (text) => replaceString(text, searchString, 'highlight');
    const items = category.filters?.map((filter, index) => (
        <li className={`checkbox-filter__item ${filter === excludedSubFilters ? 'hidden' : ''}`} key={filters[filter]}>
            <input
                type="checkbox"
                id={`primary-checkbox-${index}`}
                value={filter}
                checked={selectedFilters?.has(filter)}
                onChange={() => selectFilter(filter)} />
            {customLabels && customLabels[filter] ?
                <div className="checkbox-filter__item-label">{highlightText(customLabels[filter])}</div>
                :
                <div className="checkbox-filter__item-label">{highlightText(filters[filter])}</div>
            }
        </li>
    ));

    return (
        <ul className="checkbox-filter__list accordion-checkbox">
            {expanded && items}
        </ul>
    );
};

AccordionCheckboxSecondary.propTypes = propTypes;

export default AccordionCheckboxSecondary;
