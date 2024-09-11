/**
 * CheckboxOnePrimary.jsx
 * Created by Josue Aguilar on 09/05/2024.
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import CheckboxOnePrimary from "./CheckboxOnePrimary";

const expandCheckboxTypeAccordions = (checkboxTypeMapping, selectedTypes) => {
    const toExpand = [];
    checkboxTypeMapping.forEach((category) => {
        category.filters.forEach((type) => {
            if (selectedTypes.has(type)) {
                toExpand.push(category.id);
            }
        });
    });

    return toExpand;
};

const propTypes = {
    filterTypes: PropTypes.object,
    filterTypeMapping: PropTypes.arrayOf(PropTypes.object),
    selectedTypes: PropTypes.object,
    toggleCheckboxType: PropTypes.func,
    bulkTypeChange: PropTypes.func
};

const defaultProps = {
    filterTypeMapping: []
};

const CheckboxOne = ({
    filterTypes, filterTypeMapping, selectedTypes, toggleCheckboxType, bulkTypeChange
}) => {
    const [expanded, setExpanded] = useState(
        expandCheckboxTypeAccordions(filterTypeMapping, selectedTypes)
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

    const checkboxTypes = filterTypeMapping.map((category) => (
        <CheckboxOnePrimary
            category={category}
            toggleCheckboxType={toggleCheckboxType}
            filterTypes={filterTypes}
            selectedTypes={selectedTypes}
            expanded={expanded}
            toggleExpanded={toggleExpanded}
            bulkTypeChange={bulkTypeChange} />
    ));

    return (
        <div className="filter-item-wrap">
            {checkboxTypes}
        </div>
    );
};

CheckboxOne.propTypes = propTypes;
CheckboxOne.defaultProps = defaultProps;

export default CheckboxOne;
