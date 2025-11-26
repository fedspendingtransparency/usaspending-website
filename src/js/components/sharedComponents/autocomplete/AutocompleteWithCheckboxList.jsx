/**
 * Created by JD House on 11/21/25.
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EntityDropdownAutocomplete from '../../search/filters/location/EntityDropdownAutocomplete';
import PrimaryCheckboxType from '../checkbox/PrimaryCheckboxType';

const propTypes = {
    filterType: PropTypes.string,
    handleTextInputChange: PropTypes.func,
    onSearchClear: PropTypes.func,
    searchString: PropTypes.string,
    filters: PropTypes.array,
    selectedFilters: PropTypes.array,
    toggleSingleFilter: PropTypes.func,
    toggleAll: PropTypes.func,
    additionalText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    isLoading: PropTypes.bool,
    limit: PropTypes.number
};

const AutocompleteWithCheckboxList = ({
    filterType,
    handleTextInputChange,
    onSearchClear,
    searchString,
    filters,
    selectedFilters,
    toggleSingleFilter,
    toggleAll,
    additionalText,
    isLoading,
    limit = 500
}) => {
    const [allSelected, setAllSelected] = useState(false);

    useEffect(() => {
        if (selectedFilters?.count === filters?.count) {
            setAllSelected(true);
        }
    }, [filters.count, selectedFilters.count]);

    const handleToggleAll = () => {
        if (toggleAll) {
            toggleAll(!allSelected);
        }
        setAllSelected(!allSelected);
    };


    const filterGroup = () => {
        if (filters?.length > 0) {
            return (
                <div className="recipient-results__container">
                    <div className="clear-all__container">
                        <button
                            type="button"
                            aria-label="Select All filters"
                            className="clear-all__button"
                            tabIndex="0"
                            onClick={handleToggleAll} >
                            {allSelected ? 'Deselect All' : 'Select All'}
                        </button>
                    </div>
                    <div className={`checkbox-type-filter ${filters.length >= limit ? 'bottom-fade' : ''}`}>
                        {filters?.map((filter) => (
                            <PrimaryCheckboxType
                                name={filter.name}
                                value={filter.value}
                                key={filter.key}
                                toggleCheckboxType={toggleSingleFilter}
                                selectedCheckboxes={selectedFilters} />
                        ))}
                    </div>
                </div>
            );
        }

        if (searchString > 3) {
            // user searched for something with no results;
            return (
                <div className="recipient-list__message">
                    No results found.
                </div>
            );
        }

        return null;
    };

    return (
        <div className="filter-item-wrap">
            <EntityDropdownAutocomplete
                placeholder="Search filters..."
                enabled
                handleTextInputChange={handleTextInputChange}
                context={{}}
                searchString={searchString}
                isClearable
                loading={false}
                onClear={onSearchClear}
                searchIcon />
            <div className="clear-all__container">
                <button
                    type="button"
                    aria-label={`Clear all ${filterType} filters`}
                    className="clear-all__button"
                    tabIndex="0"
                    onClick={onSearchClear} >
                    {`Clear all ${filterType} filters`}
                </button>
            </div>
            { isLoading ? (
                <div className="recipient-filter-message-container">
                    <FontAwesomeIcon icon="spinner" spin />
                    <div className="recipient-filter-message-container__text">Loading your data...</div>
                </div>

            ) : (
                <>
                    {filters && filterGroup()}
                    {additionalText && additionalText}
                </>

            )}
        </div>
    );
};

AutocompleteWithCheckboxList.propTypes = propTypes;
export default AutocompleteWithCheckboxList;
