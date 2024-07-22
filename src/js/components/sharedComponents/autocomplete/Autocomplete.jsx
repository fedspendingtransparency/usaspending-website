/**
 * Created by michaelbray on 1/27/17.
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { isEqual, find, uniqueId } from 'lodash';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Warning from './Warning';
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
    inFlight: PropTypes.bool
};

const defaultProps = {
    values: [],
    placeholder: '',
    errorHeader: '',
    errorMessage: '',
    maxSuggestions: 1000,
    label: '',
    noResults: false,
    characterLimit: 524288, // default for HTML input elements
    retainValue: false,
    dirtyFilters: Symbol(''),
    minCharsToSearch: 2
};

const Autocomplete = (props) => {
    const [value, setValue] = useState('');
    const [shown, setShown] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [showWarning, setShowWarning] = useState(false);
    const [autocompleteId, setAutocompleteId] = useState(`autocomplete-${uniqueId()}`);
    const [statusId, setStatusId] = useState(`autocomplete-status-${uniqueId()}`);
    const [staged, setStaged] = useState(false);

    const dataDictionary = {};

    // componentDidMount() {
    //     setupAutocomplete();
    // }
    //
    // componentDidUpdate(prevProps) {
    //     if (!isEqual(prevProps.values, props.values)) {
    //         open();
    //     }
    //     if (props.noResults !== prevProps.noResults) {
    //         toggleWarning();
    //     }
    //     if (!isEqual(prevProps.dirtyFilters, props.dirtyFilters)) {
    //         clearInternalState();
    //     }
    // }
    //
    // componentWillUnmount() {
    //     props.clearAutocompleteSuggestions();
    // }

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
        // TODO: FIGURE OUT WHAT autocompleteInput IS
        // autocompleteInput.value = '';
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
            autocompleteInput.value = selectedItem.code;
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
        if (props.retainValue && !staged) {
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
        // TODO: FIGURE OUT WHAT autocompleteInput IS
        // const target = autocompleteInput;
        const target = {};

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
            let errorProps = {};

            if (value && value.length < props.minCharsToSearch) {
                errorProps = {
                    header: 'Error',
                    description: `Please enter more than ${props.minCharsToSearch - 1} character${props.minCharsToSearch > 2 ? 's' : ''}.`
                };
            }
            else {
                errorProps = {
                    header: props.errorHeader,
                    description: props.errorMessage
                };
            }

            return <Warning {...errorProps} />;
        }

        return null;
    };

    let activeDescendant = false;
    let status = '';

    if (shown && selectedIndex > -1) {
        activeDescendant = `${autocompleteId}__option-${selectedIndex}`;
        if (props.values.length > selectedIndex) {
            const selectedString = props.values[selectedIndex].title;
            const valueCount = Math.min(props.maxSuggestions, props.values.length);
            status = `${selectedString} (${selectedIndex + 1} of ${valueCount})`;
        }
    }

    const loadingIndicator = props.inFlight ?
        (
            <div className="usa-da-typeahead__loading-icon">
                <FontAwesomeIcon icon="spinner" spin />
            </div>
        ) : null;

    return (
        <div
            className="usa-da-typeahead-wrapper"
            role="combobox"
            aria-controls={autocompleteId}
            aria-expanded={shown}
            aria-haspopup="true">
            <div className="usa-da-typeahead">
                <p>{props.label}</p>
                <div className="usa-da-typeahead__input">
                    <input
                        className="autocomplete"
                        ref={(t) => {
                            autocompleteInput = t;
                        }}
                        type="text"
                        placeholder={props.placeholder}
                        onChange={onChange.bind(this)}
                        tabIndex={0}
                        aria-controls={autocompleteId}
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
                    autocompleteId={autocompleteId} />
            </div>
            {generateWarning()}
        </div>
    );
};

Autocomplete.defaultProps = defaultProps;
Autocomplete.propTypes = propTypes;

export default Autocomplete;
