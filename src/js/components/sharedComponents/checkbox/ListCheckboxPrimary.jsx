/**
 * ListCheckboxPrimary.jsx
 * Created by Josue Aguilar on 09/20/2024.
 */

import React from "react";
import PropTypes from "prop-types";

import ListCheckboxPrimaryItem from "./ListCheckboxPrimaryItem";

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
    const items = category.filters?.map((filter) => {
        const label = filters[filter];
        return (
            <ListCheckboxPrimaryItem
                filter={filter}
                filters={filters}
                selectedFilters={selectedFilters}
                singleFilterChange={singleFilterChange}
                label={label}
                searchString={searchString} />
        );
    });

    return (
        <ul className="checkbox-filter__list list-checkbox">
            {items}
        </ul>
    );
};

ListCheckboxPrimary.propTypes = propTypes;

export default ListCheckboxPrimary;
