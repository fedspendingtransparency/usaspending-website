/**
 * AccordionCheckbox.jsx
 * Created by Josue Aguilar on 09/05/2024.
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import AccordionCheckboxPrimary from "./AccordionCheckboxPrimary";

const expandCheckboxCategoryAccordions = (filterCategoryMapping, selectedFilters) => {
    const toExpand = [];
    filterCategoryMapping.forEach((category) => {
        category.filters.forEach((type) => {
            if (selectedFilters.has(type)) {
                toExpand.push(category.id);
            }
        });
    });

    return toExpand;
};

const propTypes = {
    filters: PropTypes.object,
    filterCategoryMapping: PropTypes.arrayOf(PropTypes.object),
    selectedFilters: PropTypes.object,
    singleFilterChange: PropTypes.func,
    bulkFilterChange: PropTypes.func
};

const defaultProps = {
    filterTypeMapping: []
};

const AccordionCheckbox = ({
    filters, filterCategoryMapping, selectedFilters, singleFilterChange, bulkFilterChange
}) => {
    const [expandedCategories, setExpandedCategories] = useState(
        expandCheckboxCategoryAccordions(filterCategoryMapping, selectedFilters)
    );

    const toggleExpanded = (category) => {
        const containsId = expandedCategories?.indexOf(category.id);
        if (containsId <= -1) {
            setExpandedCategories([...expandedCategories, category.id]);
        }
        else {
            setExpandedCategories(expandedCategories.filter((item) => item !== category.id));
        }
    };

    const checkboxCategories = filterCategoryMapping.map((category) => (
        <AccordionCheckboxPrimary
            category={category}
            singleFilterChange={singleFilterChange}
            filters={filters}
            selectedFilters={selectedFilters}
            expandedCategories={expandedCategories}
            toggleExpanded={toggleExpanded}
            bulkFilterChange={bulkFilterChange}
            key={category.id} />
    ));

    return (
        <div className="filter-item-wrap">
            {checkboxCategories}
        </div>
    );
};

AccordionCheckbox.propTypes = propTypes;
AccordionCheckbox.defaultProps = defaultProps;

export default AccordionCheckbox;
