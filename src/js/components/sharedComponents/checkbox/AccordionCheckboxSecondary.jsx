/**
 * AccordionCheckboxSecondary.jsx
 * Created by Josue Aguilar on 09/11/2024.
 */

import React from "react";
import PropTypes from "prop-types";

const propTypes = {
    category: PropTypes.object,
    selectedFilters: PropTypes.object,
    singleFilterChange: PropTypes.func,
    filters: PropTypes.object,
    expanded: PropTypes.bool
};

const AccordionCheckboxSecondary = ({
    category, selectedFilters, singleFilterChange, filters, expanded
}) => {
    const selectFilter = (filter) => {
        const selection = {
            value: filter
        };
        singleFilterChange(selection);
    };

    const items = category.filters?.map((filter, index) => (
        <li className="checkbox-filter__item" key={filters[filter]}>
            <input
                type="checkbox"
                id={`primary-checkbox-${index}`}
                value={filter}
                checked={selectedFilters?.has(filter)}
                onChange={() => selectFilter(filter)} />
            <div className="checkbox-filter__item-label">{filters[filter]}</div>
        </li>
    ));

    return (
        <ul className="checkbox-filter__list">
            {expanded && items}
        </ul>
    );
};

AccordionCheckboxSecondary.propTypes = propTypes;

export default AccordionCheckboxSecondary;
