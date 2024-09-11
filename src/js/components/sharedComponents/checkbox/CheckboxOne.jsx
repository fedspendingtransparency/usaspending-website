/**
 * CheckboxOnePrimary.jsx
 * Created by Josue Aguilar on 09/05/2024.
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import CheckboxOnePrimary from "./CheckboxOnePrimary";

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

const CheckboxOne = ({
    filters, filterCategoryMapping, selectedFilters, singleFilterChange, bulkFilterChange
}) => {
    const [expanded, setExpanded] = useState(
        expandCheckboxCategoryAccordions(filterCategoryMapping, selectedFilters)
    );

    const toggleExpanded = (category) => {
        const containsId = expanded?.indexOf(category.id);
        if (containsId <= -1) {
            setExpanded([...expanded, category.id]);
        }
        else {
            setExpanded(expanded.filter((item) => item !== category.id));
        }
    };

    const checkboxCategories = filterCategoryMapping.map((category) => (
        <CheckboxOnePrimary
            category={category}
            singleFilterChange={singleFilterChange}
            filters={filters}
            selectedFilters={selectedFilters}
            expandedCategories={expanded}
            toggleExpanded={toggleExpanded}
            bulkFilterChange={bulkFilterChange} />
    ));

    return (
        <div className="filter-item-wrap">
            {checkboxCategories}
        </div>
    );
};

CheckboxOne.propTypes = propTypes;
CheckboxOne.defaultProps = defaultProps;

export default CheckboxOne;
