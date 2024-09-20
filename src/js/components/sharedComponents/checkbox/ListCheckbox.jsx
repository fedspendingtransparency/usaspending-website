/**
 * ListCheckbox.jsx
 * Created by Josue Aguilar on 09/20/2024.
 */

import React from 'react';
import PropTypes from 'prop-types';

import ListCheckboxPrimary from "./ListCheckboxPrimary";

const propTypes = {
    filters: PropTypes.object,
    filterCategoryMapping: PropTypes.arrayOf(PropTypes.object),
    selectedFilters: PropTypes.object,
    singleFilterChange: PropTypes.func
};

const defaultProps = {
    filterTypeMapping: []
};

const ListCheckbox = ({
    filters, filterCategoryMapping, selectedFilters, singleFilterChange
}) => {
    const checkboxCategories = filterCategoryMapping.map((category) => (
        <div className="checkbox-filter__wrapper">
            <div
                className="checkbox-filter__header"
                role="button"
                tabIndex="0">
                <div className="checkbox-filter__header-label">{category.name}</div>
                <div className="checkbox-filter__header-count">
                    {category.filters?.length}{' '}
                    {category.filters?.length === 1 ? 'type' : 'types'}
                </div>
            </div>
            <ListCheckboxPrimary
                selectedFilters={selectedFilters}
                category={category}
                singleFilterChange={singleFilterChange}
                filters={filters} />
        </div>)
    );

    return (
        <div className="filter-item-wrap">
            {checkboxCategories}
        </div>
    );
};

ListCheckbox.propTypes = propTypes;
ListCheckbox.defaultProps = defaultProps;

export default ListCheckbox;
