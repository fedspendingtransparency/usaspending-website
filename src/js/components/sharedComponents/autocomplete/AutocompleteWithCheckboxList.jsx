/**
 * AutocompleteWithCheckboxList.jsx
 * Created by JD House on 11/21/25.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import EntityDropdownAutocomplete from
    'components/sharedComponents/EntityDropdownAutocomplete';
import PrimaryCheckboxType from
    'components/sharedComponents/checkbox/PrimaryCheckboxType';
import Alert from "../Alert";

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

// eslint-disable-next-line prefer-arrow-callback
const AutocompleteWithCheckboxList = React.memo(function AutocompleteWithCheckboxList({
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
    placeholder = "Type at least 3 letters...",
    searchId
}) {
    const [allSelected, setAllSelected] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [showClearAll, setShowClearAll] = useState(true);
    const additionalClassName = filters.length >= limit ? 'bottom-fade' : '';
    const dropDownRef = useRef(null);

    const handleToggleAll = () => {
        if (toggleAll) {
            toggleAll(!allSelected);
        }
        setAllSelected(!allSelected);
    };

    const handleClear = () => {
        if (onSearchClear) onSearchClear();
    };

    const handleClearAll = () => {
        if (onClearAll) onClearAll();
        setShowClearAll(false);
    };

    const toggleDropdown = useCallback(() => {
        setIsOpen((prevState) => !prevState);
    }, []);

    const handleNoResultsLinkClick = () => {
        // GA event fire here
    };

    useEffect(() => {
        if (selectedFilters?.size > 0) {
            setAllSelected(true);
            setShowClearAll(true);
        }
        else {
            setShowClearAll(false);
        }
    }, [selectedFilters.size]);

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('click', handleOutsideClick);
        }
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [dropDownRef, isOpen]);

    const checkboxHeading = () => {
        if (!searchString) return null;

        // hide select all button for now until design direction
        const selectAllButton = false;

        return (
            <li className="autocomplete-heading">
                {searchString}
                {selectAllButton &&
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
            const alertBody = (
                <p>
                    Please check your spelling or try a broader search. Missing something?
                    <a
                        href="https://eex-survey.voc.ttecgov.us/se/0ADFD0F61A0367FE"
                        onClick={handleNoResultsLinkClick}>
                        &nbsp;Submit feedback on filters.&nbsp;
                    </a>
                </p>
            );
            return (
                <>
                    {showClearAll &&
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
                    }
                    <Alert
                        className="autocomplete-no-results"
                        header="Sorry, no results found"
                        body={alertBody}
                        type="warning"
                        icon />
                </>
            );
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

        if (showClearAll && !isOpen) {
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

        if (isOpen && filters?.length) {
            return (
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
            );
        }

        return null;
    };

    return (
        <div className={`extent-competed-filter ${filterType}`} ref={dropDownRef}>
            <EntityDropdownAutocomplete
                placeholder={placeholder}
                searchString={searchString}
                enabled
                handleTextInputChange={handleTextInputChange}
                loading={false}
                isClearable
                openDropdown={toggleDropdown}
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
});

AutocompleteWithCheckboxList.propTypes = propTypes;
export default AutocompleteWithCheckboxList;
