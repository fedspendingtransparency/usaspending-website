/**
 * Created by michaelbray on 1/27/17.
 */

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { find, uniqueId } from 'lodash';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SuggestionHolder from './SuggestionHolder';

const propTypes = {
    handleTextInput: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    clearAutocompleteSuggestions: PropTypes.func.isRequired,
    values: PropTypes.array,
    placeholder: PropTypes.string,
    errorHeader: PropTypes.string,
    errorMessage: PropTypes.string,
    maxSuggestions: PropTypes.number,
    label: PropTypes.string,
    noResults: PropTypes.bool,
    characterLimit: PropTypes.number,
    retainValue: PropTypes.bool,
    dirtyFilters: PropTypes.symbol,
    minCharsToSearch: PropTypes.number,
    inFlight: PropTypes.bool,
    icon: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium']),
    id: PropTypes.string,
    minChar: PropTypes.bool,
    isLoading: PropTypes.bool
};

const defaultProps = {
    values: [],
    placeholder: '',
    errorHeader: 'No results found',
    errorMessage: '',
    maxSuggestions: 1000,
    label: '',
    noResults: false,
    characterLimit: 524288, // default for HTML input elements
    retainValue: false,
    dirtyFilters: Symbol(''),
    minCharsToSearch: 3,
    icon: false,
    size: 'medium',
    id: '',
    minChar: false,
    isLoading: false
};

const Autocomplete = (props) => {
    const [value, setValue] = useState('');
    const [shown, setShown] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [showWarning, setShowWarning] = useState(false);
    const [staged, setStaged] = useState(false);

    const autocompleteIdRef = useRef(`autocomplete-${uniqueId()}`);
    const autocompleteInputRef = useRef();

    const checkValidity = (input) => {
        // Hide any old warnings
        setShowWarning(false);

        if (input.length < props.minCharsToSearch) {
            // Ensure user has typed the minimum number of characters before searching
            setValue(input);
            setShowWarning(true);
        }
    };

    const clearInternalState = () => {
        setValue('');
        if (autocompleteInputRef.current) {
            autocompleteInputRef.current.value = '';
        }
    };

    const isValidSelection = (selection) => find(props.values, selection);

    const bubbleUpChange = (selection) => {
        // Force the change up into the parent components
        // Validate the current value is on the autocomplete list
        let selectedItem = null;
        let selectedItemTitle = null;
        const isValid = isValidSelection(selection);

        if (isValid) {
            selectedItem = selection.data;
            selectedItemTitle = selection.title;
            setStaged(true);
        }

        props.onSelect(selectedItem, isValid, selection);

        if (props.retainValue && isValid) {
            autocompleteInputRef.current.value = selectedItemTitle;
            autocompleteInputRef.current.style.fontWeight = "400";
        }

        else {
            // Clear internal typeahead state value
            setValue('');
        }
    };

    const scrollToSelectedId = (id) => {
        document.getElementById(`${autocompleteIdRef.current}__option_${id}`).scrollIntoView({
            behavior: 'auto',
            block: 'nearest',
            inline: 'nearest'
        });
    };

    const open = () => {
        setShown(true);
    };

    const close = () => {
        // clear the input value if not a valid selection
        if (!props.retainValue && !staged) {
            clearInternalState();
        }

        setShown(false);
        setShowWarning(false);
    };

    const previous = () => {
        if (selectedIndex > 0) {
            setSelectedIndex(selectedIndex - 1);
            scrollToSelectedId(selectedIndex - 1);
        }
        else {
            setSelectedIndex(props.values.length - 1);
            scrollToSelectedId(props.values.length - 1);
        }
    };

    const next = () => {
        if (selectedIndex < props.values.length - 1) {
            setSelectedIndex(selectedIndex + 1);
            scrollToSelectedId(selectedIndex + 1);
        }
        else {
            setSelectedIndex(0);
            scrollToSelectedId(0);
        }
    };

    const select = (element) => {
        close();
        bubbleUpChange(element);
    };

    const onChange = (e) => {
        e.persist();
        checkValidity(e.target.value);
        let selectIndex = 0;
        props.handleTextInput(e);

        if (!e.target.value) {
            selectIndex = -1;
            close();
        }

        setValue(e.target.value);
        setSelectedIndex(selectIndex);
        setStaged(false);
    };

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.stopPropagation();
            e.preventDefault();
            select(props.values[selectedIndex]);
            if (!props.retainValue) {
                setValue('');
            }
        }
        // Tab or Escape
        else if (e.key === 'Tab' || e.key === 'Escape') {
            setValue('');
            close();
        }
        // Previous
        else if (e.key === 'ArrowUp') {
            previous();
        }
        // Next
        else if (e.key === 'ArrowDown') {
            next();
        }
    };

    const onBlur = () => {
        close();
        if (!props.retainValue) {
            setValue('');
        }
    };

    const toggleWarning = () => {
        setShowWarning(props.noResults);
    };

    const generateWarning = () => {
        if (showWarning) {
            let error;

            const warning = (header, description) => (
                <ul className="autocomplete" role="listbox">
                    <li className="unselectable">
                        <span>{header}</span><br />
                        {description}
                    </li>
                </ul>
            );

            if ((value && value.length < props.minCharsToSearch) && props.minChar) {
                error = warning(
                    'Error',
                    `Please enter more than ${props.minCharsToSearch - 1} character${props.minCharsToSearch > 2 ? 's' : ''}.`
                );
            }
            else if ((value && value.length < props.minCharsToSearch) && !props.minChar) {
                error = null;
            }
            else {
                error = warning(props.errorHeader, props.errorMessage);
            }

            return error;
        }

        return null;
    };

    let activeDescendant = '';
    let status = '';

    if (shown && selectedIndex > -1) {
        activeDescendant = `${autocompleteIdRef.current}__option-${selectedIndex}`;
        if (props.values.length > selectedIndex) {
            const selectedString = props.values[selectedIndex].title;
            const valueCount = Math.min(props.maxSuggestions, props.values.length);
            status = `${selectedString} (${selectedIndex + 1} of ${valueCount})`;
        }
    }

    const loadingIndicator = (
        <div className="autocomplete-filter-message-container">
            <FontAwesomeIcon icon="spinner" spin />
            <div className="autocomplete-filter-message-container__text">Loading your data...</div>
        </div>
    );

    let variation = '';
    if (props.size === 'small') {
        variation = '-sm';
    }
    else if (props.size === 'medium') {
        variation = '-md';
    }

    useEffect(() => () => {
        props.clearAutocompleteSuggestions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        open();
    }, [props.values]);

    useEffect(() => {
        toggleWarning();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.noResults]);

    // retainValue if selectedItemsDisplayNames is passed in
    // this is necessary because the map refreshes after the data is updated
    useEffect(() => {
        if (props.type && props.selectedItemsDisplayNames && Object.keys(props.selectedItemsDisplayNames).length > 0) {
            if (props.selectedItemsDisplayNames[props.type] && autocompleteInputRef?.current) {
                autocompleteInputRef.current.value = props.selectedItemsDisplayNames[props.type];
                autocompleteInputRef.current.style.fontWeight = "600";
            }
        }
    }, [props.selectedItemsDisplayNames, props.type]);

    return (
        <div
            className="usa-da-typeahead-wrapper"
            role="combobox"
            aria-controls={autocompleteIdRef.current}
            aria-expanded={shown}
            aria-haspopup="true">
            <div className="usa-da-typeahead">
                <p>{props.label}</p>
                <div className="usa-da-typeahead__input">
                    {props.icon && <FontAwesomeIcon icon="search" />}
                    <input
                        id={props.id !== '' ? props.id : null}
                        className={`autocomplete${variation}${props.icon ? ' icon' : ''}`}
                        ref={autocompleteInputRef}
                        type="text"
                        placeholder={props.placeholder}
                        onChange={onChange.bind(this)}
                        tabIndex={0}
                        aria-controls={autocompleteIdRef.current}
                        aria-activedescendant={activeDescendant}
                        aria-autocomplete="list"
                        onBlur={onBlur}
                        onKeyDown={onKeyDown}
                        maxLength={props.characterLimit} />
                </div>
                <div
                    className="screen-reader-description"
                    role="alert">
                    {status}
                </div>
                {props.isLoading ? loadingIndicator : <SuggestionHolder
                    suggestions={props.values}
                    shown={shown}
                    selectedIndex={selectedIndex}
                    select={select.bind(this)}
                    maxSuggestions={props.maxSuggestions}
                    autocompleteId={autocompleteIdRef.current}
                    matchingString={value} />}
                {generateWarning()}
            </div>
        </div>
    );
};

Autocomplete.defaultProps = defaultProps;
Autocomplete.propTypes = propTypes;

export default Autocomplete;
