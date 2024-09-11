/**
 * CheckboxOnePrimary.jsx
 * Created by Josue Aguilar on 09/11/2024.
 */

import React from "react";
import PropTypes from "prop-types";

const propTypes = {
    category: PropTypes.object,
    selectedFilters: PropTypes.object,
    singleFilterChange: PropTypes.func,
    filters: PropTypes.object
};

const CheckboxOneSecondary = ({
    category, selectedFilters, singleFilterChange, filters, expanded
}) => {
    const selectFilter = (filter) => {
        const selection = {
            value: filter
        };
        singleFilterChange(selection);
    };

    return expanded &&
        category.filters?.map((filter, index) => (
            <label className="checkbox-filter__item">
                <input
                    type="checkbox"
                    id={`primary-checkbox-${index}`}
                    value={filter}
                    checked={selectedFilters?.has(filter)}
                    onChange={() => selectFilter(filter)} />
                <span className="checkbox-filter__item-label">{filters[filter]}</span>
            </label>));
};

CheckboxOneSecondary.propTypes = propTypes;

export default CheckboxOneSecondary;
