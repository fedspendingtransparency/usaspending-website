/**
 * EntityDropdown.jsx
 * Created by Kevin Li 10/30/17
 */

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash-es';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TooltipWrapper } from "data-transparency-ui";

import { defaultLocationValues }
    from "containers/search/filters/location/LocationPickerContainer";
import EntityDropdownList from './EntityDropdownList';
import EntityWarning from './EntityWarning';
import EntityDropdownAutocomplete from './EntityDropdownAutocomplete';
import { CDTooltip } from "../tooltips/AdvancedSearchTooltip";

const propTypes = {
    value: PropTypes.object,
    placeholder: PropTypes.string,
    title: PropTypes.string,
    options: PropTypes.array,
    selectEntity: PropTypes.func,
    field: PropTypes.string,
    enabled: PropTypes.bool,
    generateDisclaimer: PropTypes.func,
    matchKey: PropTypes.string,
    setSearchString: PropTypes.func,
    searchString: PropTypes.string,
    loading: PropTypes.bool,
    type: PropTypes.oneOf(["autocomplete", "button"]),
    showDisclaimer: PropTypes.bool
};

const alphabetRegex = /([a-z]|[0-9])/;

const EntityDropdown = ({
    value,
    placeholder,
    title,
    options,
    selectEntity,
    field,
    enabled = true,
    generateDisclaimer,
    matchKey = 'name',
    setSearchString,
    searchString,
    loading = false,
    type = 'button',
    showDisclaimer = false
}) => {
    const [expanded, setExpanded] = useState(false);
    const [showWarning, setShowWarning] = useState(false);

    const wrapperDiv = useRef(null);
    const dropdown = useRef(null);

    const warningId = `location-field-warning-${uniqueId()}`;
    const uniqueIdentifier = uniqueId();
    const isAutocomplete = (type === 'autocomplete');
    const autocompleteClass = isAutocomplete ? 'geo-entity-dropdown_autocomplete' : '';
    const warningField = title.split(" (")[0];

    let placeholderLocal = '';
    let label = value.name;
    let disabled = '';
    let hideWarning = 'hide';
    let dropdownRef = null;

    const getSelectedItemIdentifier = () => value[matchKey];

    const closeDropdown = (e) => {
        if (e?.key === 'Escape' || e?.key === 'Enter' || e?.type === 'mouseup') {
            setExpanded(false);
        }
    };

    const handleDeselection = (e) => {
        if (wrapperDiv.current && !wrapperDiv.current.contains(e.target)) {
            // clicked outside the dropdown, close it
            closeDropdown();
        }
    };

    const pressedLetter = (e) => {
        // check if the key press is a letter (only for non-autocomplete dropdowns)
        if (type === "button" && (alphabetRegex.test(e.key))) {
            // it is a letter
            e.preventDefault();
            // jump to the first entry
            const firstLetter = document.querySelector(`.geo-entity-list .letter-${e.key}`);
            if (firstLetter) {
                firstLetter.focus();
            }
        }
    };

    const focusNext = (e) => {
        const active = document.activeElement;
        if (e.key === 'ArrowDown' && active && dropdownRef && dropdownRef.contains(active)) {
            // a dropdown list item is currently selected
            e.preventDefault();
            // nth-child is 1 indexed but listindex is based on the array so it is 0 indexed
            // add 1 to the index to bring them in line
            const currentIndex = parseInt(active.getAttribute('data-listindex'), 10) + 1;
            if (currentIndex + 1 <= options.length) {
                // we're not at the end of the list
                const nextItem = document.querySelector(
                    `.geo-entity-list li:nth-child(${currentIndex + 1}) .list-item`
                );
                if (nextItem) {
                    nextItem.focus();
                }
            }
        }
    };

    const focusPrev = (e) => {
        const active = document.activeElement;
        if (e.key === 'ArrowUp' && active && dropdownRef && dropdownRef.contains(active)) {
            // a dropdown list item is currently selected
            e.preventDefault();
            // nth-child is 1 indexed but listindex is based on the array so it is 0 indexed
            // add 1 to the index to bring them in line
            const currentIndex = parseInt(active.getAttribute('data-listindex'), 10) + 1;
            if (currentIndex - 1 > 0) {
                // we're not at the start of the list
                const prevItem = document.querySelector(
                    `.geo-entity-list li:nth-child(${currentIndex - 1}) .list-item`
                );
                if (prevItem) {
                    prevItem.focus();
                }
            }
        }
    };

    const unbindAccessibility = () => {
        document.removeEventListener('mousedown', handleDeselection);
        document.removeEventListener('keyup', pressedLetter);

        document.removeEventListener('keyup', closeDropdown);
        document.removeEventListener('mouseup', closeDropdown);
        document.removeEventListener('keyup', focusNext);
        document.removeEventListener('keyup', focusPrev);
    };

    const clickedItem = (item) => {
        if (type === "autocomplete") {
            // just update the search string, don't perform search
            setSearchString(item.name, false);
        }
        if (title.includes("Original Congressional")) {
            selectEntity("district_original", item);
        }
        else if (title.includes("Current Congressional")) {
            selectEntity("district_current", item);
        }
        else if (item.code !== "NA-000") {
            selectEntity(field, item);
        }
        closeDropdown();
    };

    if (expanded && !loading) {
        const selectedItem = getSelectedItemIdentifier();
        dropdown.current = (<EntityDropdownList
            matchKey={matchKey}
            scope={field}
            selectedItem={selectedItem}
            options={options}
            clickedItem={clickedItem} />);
    }
    else if (!expanded) {
        dropdown.current = null;
    }

    if (value.code === '') {
        placeholderLocal = 'placeholder';
        label = placeholder;
    }
    if (!enabled) {
        disabled = 'disabled';
    }

    if (showWarning) {
        // even if this is enabled, still showWarning b/c we're also showingDisclaimer now
        hideWarning = '';
    }

    const resetSelectedItem = () => {
        selectEntity(field, defaultLocationValues[field]);
    };

    const handleTextInputChange = (e) => {
        setSearchString(e.target.value);
    };

    const handleOnKeyDown = (e) => {
        if (e.key === 'Backspace') { // backspace
            resetSelectedItem();
        }
    };

    const handleOnKeyUp = (e) => {
        if (e.key === "Enter") {
            setExpanded(true);
            handleTextInputChange(e);
        }
    };

    const openDropdown = () => {
        setExpanded(options.length > 0);
    };

    const toggleDropdown = (e) => {
        e.preventDefault();
        if (expanded) {
            closeDropdown();
            return;
        }

        if (enabled) {
            openDropdown();
        }
    };

    const bindAccessibility = () => {
        document.addEventListener('mousedown', handleDeselection);
        document.addEventListener('keyup', pressedLetter);

        document.addEventListener('keyup', closeDropdown);
        document.addEventListener('mouseup', closeDropdown);
        document.addEventListener('keyup', focusNext);
        document.addEventListener('keyup', focusPrev);

        dropdownRef = wrapperDiv.current.querySelector('.geo-entity-list');

        let activeSelection = wrapperDiv.current.querySelector('.active');
        if (!activeSelection) {
            // no item has been selected yet in the dropdown so focus on the first item
            activeSelection = wrapperDiv.current.querySelector('.geo-entity-list .list-item');
        }
        if (type === "button") {
            // we don't want to move focus to the dropdown if we're using autocomplete
            activeSelection?.focus();
        }
    };

    const mouseEnter = () => {
        const shouldShowWarning = (!enabled || showDisclaimer);
        // If field is disabled, show the warning as to why if it's not already showing
        if (shouldShowWarning && !showWarning) {
            setShowWarning(true);
        }
    };

    const mouseLeave = () => {
        if (showWarning) {
            setShowWarning(false);
        }
    };

    useEffect(() => {
        if (type === 'autocomplete') {
            openDropdown();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options]);

    useEffect(() => {
        if (expanded) {
            bindAccessibility();
        }
        else {
            unbindAccessibility();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [expanded]);

    return (
        <div className="geo-entity-item">
            <div className="location-label__with-tt">
                <label
                    className={`location-label ${disabled}`}
                    htmlFor={`${field}-${type}-${uniqueIdentifier}`}>
                    {title}
                </label>
                {title === 'CONGRESSIONAL DISTRICT (US ONLY)' ?
                    <div>
                        <TooltipWrapper
                            className="advanced-search__cd-tooltip"
                            icon="info"
                            tooltipComponent={<CDTooltip />} />
                    </div>
                    : ''}
            </div>
            <div
                id={`${field}-${type}-${uniqueIdentifier}`}
                className={`geo-entity-dropdown ${disabled} ${autocompleteClass}`}
                onMouseOver={mouseEnter}
                onFocus={mouseEnter}
                onMouseOut={mouseLeave}
                onBlur={mouseLeave}
                tabIndex={-1}
                ref={(div) => {
                    wrapperDiv.current = div;
                }}>
                {!isAutocomplete &&
                        <button
                            id={`${field}-button`}
                            className={`active-selection ${placeholderLocal}`}
                            onClick={toggleDropdown}
                            title={label}
                            aria-label={label}
                            aria-haspopup="true"
                            aria-expanded={expanded}
                            aria-owns={`geo-dropdown-${field}`}
                            aria-describedby={warningId}
                            disabled={!enabled || options.length === 0}>
                            <div className="label">
                                {label}
                            </div>
                            <div className="icon">
                                {expanded &&
                                    <FontAwesomeIcon onClick={toggleDropdown} icon="chevron-up" />
                                }
                                {!expanded &&
                                    <FontAwesomeIcon onClick={toggleDropdown} icon="chevron-down" />
                                }
                            </div>
                        </button>
                }
                {isAutocomplete &&
                        <EntityDropdownAutocomplete
                            searchString={searchString}
                            enabled={enabled}
                            openDropdown={openDropdown}
                            handleOnKeyDown={handleOnKeyDown}
                            handleOnKeyUp={handleOnKeyUp}
                            handleTextInputChange={handleTextInputChange}
                            toggleDropdown={toggleDropdown}
                            placeholder={placeholder}
                            showDisclaimer={showDisclaimer}
                            loading={loading} />
                }
                {dropdown.current}
            </div>
            {generateDisclaimer &&
            <div
                className={`geo-warning ${hideWarning}`}
                id={warningId}
                aria-hidden={hideWarning === 'hide'}>
                <EntityWarning
                    message={generateDisclaimer(warningField)} />
            </div>}
        </div>
    );
};

EntityDropdown.propTypes = propTypes;
export default EntityDropdown;
