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
    minChar: PropTypes.bool
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
    minChar: false
};

const Autocomplete = React.memo((props) => {
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
        const isValid = isValidSelection(selection);

        if (isValid) {
            selectedItem = selection.data;
            setStaged(true);
        }

        props.onSelect(selectedItem, isValid);

        if (props.retainValue && isValid) {
            autocompleteInputRef.current.value = selectedItem.code;
        }

        else {
            // Clear internal typeahead state value
            setValue('');
        }
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
        }
    };

    const next = () => {
        if (selectedIndex < props.maxSuggestions - 1) {
            setSelectedIndex(selectedIndex + 1);
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

    const setupAutocomplete = () => {
        const target = autocompleteInputRef.current;

        target.addEventListener('blur', () => {
            close();
            if (!props.retainValue) {
                target.value = '';
            }
        });

        // enable tab keyboard shortcut for selection
        target.addEventListener('keydown', (e) => {
            // Enter
            if (e.key === 'Enter') {
                e.preventDefault();
                select(props.values[selectedIndex]);
                if (!props.retainValue) {
                    target.value = '';
                }
            }
            // Tab or Escape
            else if (e.key === 'Tab' || e.key === 'Escape') {
                target.value = '';
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
        });
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

    let activeDescendant = false;
    let status = '';

    if (shown && selectedIndex > -1) {
        activeDescendant = `${autocompleteIdRef.current}__option-${selectedIndex}`;
        if (props.values.length > selectedIndex) {
            const selectedString = props.values[selectedIndex].title;
            const valueCount = Math.min(props.maxSuggestions, props.values.length);
            status = `${selectedString} (${selectedIndex + 1} of ${valueCount})`;
        }
    }

    const loadingIndicator = props.inFlight ? (
        <div className="usa-da-typeahead__loading-icon">
            <FontAwesomeIcon icon="spinner" spin />
        </div>
    ) : null;

    let variation = '';
    if (props.size === 'small') {
        variation = '-sm';
    }
    else if (props.size === 'medium') {
        variation = '-md';
    }

    useEffect(() => {
        setupAutocomplete();

        return () => {
            props.clearAutocompleteSuggestions();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        open();
    }, [props.values]);

    useEffect(() => {
        toggleWarning();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.noResults]);

    useEffect(() => {
        if (props.type) {
            if (props.selectedItemsDisplayNames[props.type] && autocompleteInputRef?.current) {
                autocompleteInputRef.current.value = props.selectedItemsDisplayNames[props.type];
                autocompleteInputRef.current.style.fontWeight = "bold";
            }
        }
    }, [props.selectedAgencyName]);

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
                        maxLength={props.characterLimit} />
                    {loadingIndicator}
                </div>
                <div
                    className="screen-reader-description"
                    role="alert">
                    {status}
                </div>
                <SuggestionHolder
                    suggestions={props.values}
                    shown={shown}
                    selectedIndex={selectedIndex}
                    select={select.bind(this)}
                    maxSuggestions={props.maxSuggestions}
                    autocompleteId={autocompleteIdRef.current} />
                {generateWarning()}
            </div>
        </div>
    );
});

Autocomplete.defaultProps = defaultProps;
Autocomplete.propTypes = propTypes;

export default Autocomplete;
