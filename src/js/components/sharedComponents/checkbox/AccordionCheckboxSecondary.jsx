/**
 * AccordionCheckboxSecondary.jsx
 * Created by Josue Aguilar on 09/11/2024.
 */

import React from "react";
import PropTypes from "prop-types";

import AccordionCheckboxSecondaryItem from "./AccordionCheckboxSecondaryItem";

const propTypes = {
    category: PropTypes.object,
    selectedFilters: PropTypes.object,
    singleFilterChange: PropTypes.func,
    filters: PropTypes.object,
    customLabels: PropTypes.object,
    expanded: PropTypes.bool,
    searchString: PropTypes.string
};

const AccordionCheckboxSecondary = ({
    category, selectedFilters, singleFilterChange, filters, customLabels, expanded, searchString
}) => {
    const items = category.filters?.map((filter) => {
        const filterKey = filters[filter];
        const customLabel = customLabels?.[filter] ?? false;

        return (
            <AccordionCheckboxSecondaryItem
                filter={filter}
                filterKey={filterKey}
                selectedFilters={selectedFilters}
                customLabel={customLabel}
                searchString={searchString}
                singleFilterChange={singleFilterChange}
                key={filterKey} />
        );
    });

    return (
        <ul className="checkbox-filter__list accordion-checkbox">
            {expanded && items}
        </ul>
    );
};

AccordionCheckboxSecondary.propTypes = propTypes;

export default AccordionCheckboxSecondary;
