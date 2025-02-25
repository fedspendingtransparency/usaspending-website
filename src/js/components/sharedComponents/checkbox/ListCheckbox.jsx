/**
 * ListCheckbox.jsx
 * Created by Josue Aguilar on 09/20/2024.
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ListCheckboxPrimary from "./ListCheckboxPrimary";
import SubmitHint from "../filterSidebar/SubmitHint";
import EntityDropdownAutocomplete from "../../search/filters/location/EntityDropdownAutocomplete";

const propTypes = {
    filters: PropTypes.object,
    filterCategoryMapping: PropTypes.arrayOf(PropTypes.object),
    selectedFilters: PropTypes.object,
    singleFilterChange: PropTypes.func,
    searchV2: PropTypes.bool
};

const ListCheckbox = ({
    filters, filterCategoryMapping = [], selectedFilters, singleFilterChange, searchV2
}) => {
    const [searchString, setSearchString] = useState('');
    const [filterCategory, setFilterCategory] = useState(filterCategoryMapping);
    const [noResults, setNoResults] = useState(false);

    const handleTextInputChange = (e) => {
        setSearchString(e.target.value);
    };

    const onClear = () => {
        setSearchString('');
    };

    const searchCategoryMapping = () => {
        // filter out definitions based on search text
        // eslint-disable-next-line no-unused-vars
        const filteredDefinitions = Object.fromEntries(Object.entries(filters).filter(([key, value]) => value.toLowerCase().includes(searchString.toLowerCase())));

        // filter out type mapping filters based on filteredDefinitions
        const filteredFilters = filterCategoryMapping.map((type) => ({
            ...type,
            filters: type.filters.filter((v) => Object.keys(filteredDefinitions).includes(v))
        }));

        // remove any categories that do not have any filters left
        const filteredCategories = filteredFilters.filter((type) => type.filters.length > 0);

        if (filteredCategories.length > 0) {
            setNoResults(false);
        }
        else {
            setNoResults(true);
        }

        setFilterCategory(filteredCategories);
    };

    const checkboxCategories = filterCategory.map((category) => (
        <div className="checkbox-filter__wrapper" key={category.id}>
            <div
                className="checkbox-filter__header list-checkbox"
                role="button"
                tabIndex="0">
                <div className="checkbox-filter__header-label-container">
                    <span className="checkbox-filter__header-label">{category.name}</span>
                    <span className="checkbox-filter__header-count">
                        {category.filters?.length}{' '}
                        {category.filters?.length === 1 ? 'type' : 'types'}
                    </span>
                </div>
            </div>
            <ListCheckboxPrimary
                selectedFilters={selectedFilters}
                category={category}
                singleFilterChange={singleFilterChange}
                filters={filters} />
        </div>)
    );

    useEffect(() => {
        searchCategoryMapping();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchString]);

    return (
        <div className="extent-competed-filter">
            <EntityDropdownAutocomplete
                placeholder="Search filters..."
                searchString={searchString}
                enabled
                handleTextInputChange={handleTextInputChange}
                context={{}}
                loading={false}
                isClearable
                onClear={onClear}
                searchIcon />
            {noResults ?
                <div className="no-results">No results found.</div>
                :
                <div className="filter-item-wrap">
                    {checkboxCategories}
                    { !searchV2 && <SubmitHint selectedFilters={selectedFilters} /> }
                </div>
            }
        </div>
    );
};

ListCheckbox.propTypes = propTypes;
export default ListCheckbox;
