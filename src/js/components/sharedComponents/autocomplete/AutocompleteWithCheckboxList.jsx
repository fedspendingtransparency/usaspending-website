/**
 * Created by JD House on 11/21/25.
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EntityDropdownAutocomplete from '../../search/filters/location/EntityDropdownAutocomplete';
import PrimaryCheckboxType from '../checkbox/PrimaryCheckboxType';

const propTypes = {
    filterType: PropTypes.string,
    handleTextInputChange: PropTypes.func,
    onSearchClear: PropTypes.func,
    onClearAll: PropTypes.func,
    searchString: PropTypes.string,
    filters: PropTypes.array,
    selectedFilters: PropTypes.array,
    toggleSingleFilter: PropTypes.func,
    toggleAll: PropTypes.func,
    additionalText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    isLoading: PropTypes.bool,
    noResults: PropTypes.bool,
    limit: PropTypes.number,
    placeholder: PropTypes.string,
    searchId: PropTypes.string
};

const AutocompleteWithCheckboxList = ({
    filterType,
    handleTextInputChange,
    onSearchClear,
    onClearAll,
    searchString,
    filters,
    selectedFilters,
    toggleSingleFilter,
    toggleAll,
    additionalText = null,
    isLoading,
    noResults,
    limit = 500,
    placeholder = "Search filters ...",
    searchId
}) => {
    const [allSelected, setAllSelected] = useState(false);
    const additionalClassName = filters.length >= limit ? 'bottom-fade' : '';

    const handleToggleAll = () => {
        if (toggleAll) {
            toggleAll(!allSelected);
        }
        setAllSelected(!allSelected);
    };

    useEffect(() => {
        if (selectedFilters?.count === filters?.count) {
            setAllSelected(true);
        }
    }, [filters?.count, selectedFilters?.count]);

    const checkboxHeading = () => {
        if (!searchString) return null;

        return (
            <li className="autocomplete-heading">
                {searchString}
                <button
                    type="button"
                    aria-label="Select All filters"
                    className="toggle-all__button"
                    tabIndex="0"
                    onClick={handleToggleAll} >
                    {allSelected ? 'Deselect All' : 'Select All'}
                </button>
            </li>
        );
    };

    const resultsContainer = () => {
        if (noResults) {
            return <div className="no-results">No results found.</div>;
        }

        if (isLoading) {
            return (
                <div className="loading-message-container">
                    <FontAwesomeIcon icon="spinner" spin />
                    <div className="loading-message-container__text">Loading your data...</div>
                </div>
            );
        }

        return (
            <>
                {filters?.length ? (
                    <div className={`checkbox-type-filter ${additionalClassName}`} >
                        <ul className="autocomplete-checkbox">

                            {checkboxHeading()}
                            {filters?.map((filter) => (
                                <>
                                    <PrimaryCheckboxType
                                        name={filter.name || filter.title}
                                        value={filter.value}
                                        key={filter.key}
                                        toggleCheckboxType={toggleSingleFilter}
                                        selectedCheckboxes={selectedFilters} />
                                </>
                            ))}
                        </ul>
                        {additionalText && additionalText}
                    </div>
                ) : (
                    <div className="clear-all__container">
                        <button
                            type="button"
                            aria-label={`Clear all ${filterType} filters`}
                            className="clear-all__button"
                            tabIndex="0"
                            onClick={onClearAll} >
                            {`Clear all ${filterType} filters`}
                        </button>
                    </div>
                )}
            </>
        );
    };

    return (
        <div className="extent-competed-filter">
            <EntityDropdownAutocomplete
                placeholder={placeholder}
                searchString={searchString}
                enabled
                handleTextInputChange={handleTextInputChange}
                loading={false}
                isClearable
                onClear={onSearchClear}
                searchIcon
                id={searchId} />
            <div className="filter-item-wrap">
                <div className="checkbox-filter__wrapper" >
                    {resultsContainer()}
                </div>
            </div>
        </div>
    );
};

AutocompleteWithCheckboxList.propTypes = propTypes;
export default AutocompleteWithCheckboxList;
