/**
 * Created by JD House on 11/21/25.
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EntityDropdownAutocomplete from '../../search/filters/location/EntityDropdownAutocomplete';
import PrimaryCheckboxType from '../checkbox/PrimaryCheckboxType';

const propTypes = {
    handleTextInputChange: PropTypes.func,
    onSearchClear: PropTypes.func,
    onClearAll: PropTypes.func,
    searchString: PropTypes.string,
    filterType: PropTypes.string,
    filters: PropTypes.array,
    selectedFilters: PropTypes.array,
    toggleSingleFilter: PropTypes.func,
    toggleAll: PropTypes.func,
    additionalText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    isLoading: PropTypes.bool,
    errorMessage: PropTypes.string,
    noResults: PropTypes.bool,
    limit: PropTypes.number,
    placeholder: PropTypes.string,
    searchId: PropTypes.string
};

const AutocompleteWithCheckboxList = ({
    handleTextInputChange,
    onSearchClear,
    onClearAll,
    searchString,
    filterType,
    filters,
    selectedFilters,
    toggleSingleFilter,
    toggleAll,
    additionalText = null,
    isLoading,
    errorMessage,
    noResults,
    limit = 500,
    placeholder = "Search filters ...",
    searchId
}) => {
    const [allSelected, setAllSelected] = useState(false);
    const [showClearAll, setShowClearAll] = useState(false);
    const additionalClassName = filters.length >= limit ? 'bottom-fade' : '';

    const handleToggleAll = () => {
        if (toggleAll) {
            toggleAll(!allSelected);
        }
        setAllSelected(!allSelected);
    };

    const handleClear = () => {
        if (onSearchClear) onSearchClear();
        if (selectedFilters?.size > 0) setShowClearAll(true);
    };

    const handleClearAll = () => {
        if (onClearAll) onClearAll();
        setShowClearAll(false);
    };

    useEffect(() => {
        if (selectedFilters?.size === 0) {
            setAllSelected(false);
        }
    }, [selectedFilters.size]);

    useEffect(() => {
        if (filters?.length) {
            setShowClearAll(false);
        }
    }, [filters]);

    const checkboxHeading = () => {
        if (!searchString) return null;

        return (
            <li className="autocomplete-heading">
                {searchString}
                {false &&
                // hide for now until design direction
                    <button
                        type="button"
                        aria-label="Select All filters"
                        className="toggle-all__button"
                        tabIndex="0"
                        onClick={handleToggleAll} >
                        {allSelected ? 'Deselect All' : 'Select All'}
                    </button>
                }
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

        if (errorMessage) {
            return <div className="error-message">{errorMessage}</div>;
        }

        if (showClearAll) {
            return (
                <div className="clear-all__container">
                    <button
                        type="button"
                        aria-label={`Clear all ${filterType}`}
                        className="clear-all__button"
                        tabIndex="0"
                        onClick={handleClearAll} >
                        {`Clear all ${filterType}`}
                    </button>
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
                ) : null }
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
                onClear={handleClear}
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
