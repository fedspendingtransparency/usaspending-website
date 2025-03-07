/**
 * ListCheckboxPrimary.jsx
 * Created by Josue Aguilar on 09/20/2024.
 */

import React from "react";
import PropTypes from "prop-types";
import replaceString from '../../../helpers/replaceString';

const propTypes = {
    category: PropTypes.object,
    selectedFilters: PropTypes.object,
    singleFilterChange: PropTypes.func,
    filters: PropTypes.object,
    searchString: PropTypes.string
};

const ListCheckboxPrimary = ({
    category, selectedFilters, singleFilterChange, filters, searchString
}) => {
    const selectFilter = (filter) => {
        const selection = {
            value: filter
        };
        singleFilterChange(selection);
    };
    const highlightText = (text) => replaceString(text, searchString, 'highlight');

    const items = category.filters?.map((filter, index) => (
        <li className="checkbox-filter__item" key={filters[filter]}>
            <input
                type="checkbox"
                id={`primary-checkbox-${index}`}
                value={filter}
                checked={selectedFilters?.has(filter)}
                onChange={() => selectFilter(filter)} />
            <div className="checkbox-filter__item-label">{highlightText(filters[filter])}</div>
        </li>
    ));

    return (
        <ul className="checkbox-filter__list list-checkbox">
            {items}
        </ul>
    );
};

ListCheckboxPrimary.propTypes = propTypes;

export default ListCheckboxPrimary;
