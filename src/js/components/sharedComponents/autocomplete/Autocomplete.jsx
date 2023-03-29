/**
 * Created by michaelbray on 1/27/17.
 */

import React from 'react';
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

export default class Autocomplete extends React.Component {
    constructor(props) {
        super(props);

        this.dataDictionary = {};

        this.state = {
            value: '',
            shown: false,
            selectedIndex: -1,
            showWarning: false,
            autocompleteId: `autocomplete-${uniqueId()}`,
            statusId: `autocomplete-status-${uniqueId()}`,
            staged: false
        };

        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.setupAutocomplete();
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps.values, this.props.values)) {
            this.open();
        }
        if (this.props.noResults !== prevProps.noResults) {
            this.toggleWarning();
        }
        if (!isEqual(prevProps.dirtyFilters, this.props.dirtyFilters)) {
            this.clearInternalState();
        }
    }

    componentWillUnmount() {
        this.props.clearAutocompleteSuggestions();
    }

    onChange(e) {
        e.persist();
        this.checkValidity(e.target.value);
        let selectedIndex = 0;
        this.props.handleTextInput(e);
        if (!e.target.value) {
            selectedIndex = -1;
            this.close();
        }
        this.setState({
            value: e.target.value,
            selectedIndex,
            staged: false
        });
    }

    setupAutocomplete() {
        const target = this.autocompleteInput;

        target.addEventListener('blur', () => {
            this.close();
            if (!this.props.retainValue) {
                target.value = '';
            }
        });

        // enable tab keyboard shortcut for selection
        target.addEventListener('keydown', (e) => {
            // Enter
            if (e.key === 'Enter') {
                e.preventDefault();
                this.select(this.props.values[this.state.selectedIndex]);
                if (!this.props.retainValue) {
                    target.value = '';
                }
            }
            // Tab or Escape
            else if (e.key === 'Tab' || e.key === 'Escape') {
                target.value = '';
                this.close();
            }
            // Previous
            else if (e.key === 'ArrowUp') {
                this.previous();
            }
            // Next
            else if (e.key === 'ArrowDown') {
                this.next();
            }
        });
    }

    toggleWarning() {
        this.setState({
            showWarning: this.props.noResults
        });
    }

    close() {
    // clear the input value if not a valid selection
        if (this.props.retainValue && !this.state.staged) {
            this.clearInternalState();
        }
        this.setState({
            shown: false,
            showWarning: false
        });
    }

    open() {
        this.setState({
            shown: true
        });
    }

    previous() {
        if (this.state.selectedIndex > 0) {
            this.setState({
                selectedIndex: this.state.selectedIndex - 1
            });
        }
    }

    next() {
        if (this.state.selectedIndex < this.props.maxSuggestions - 1) {
            this.setState({
                selectedIndex: this.state.selectedIndex + 1
            });
        }
    }

    select(element) {
        this.close();
        this.bubbleUpChange(element);
    }

    checkValidity(input) {
    // Hide any old warnings
        this.setState({
            showWarning: false
        });

        if (input.length < this.props.minCharsToSearch) {
            // Ensure user has typed the minimum number of characters before searching
            this.setState({
                value: input,
                showWarning: true
            });
        }
    }

    isValidSelection(selection) {
        return find(this.props.values, selection);
    }

    bubbleUpChange(selection) {
    // Force the change up into the parent components
    // Validate the current value is on the autocomplete list
        let selectedItem = null;
        const isValid = this.isValidSelection(selection);

        if (isValid) {
            selectedItem = selection.data;
            this.setState({
                staged: true
            });
        }

        this.props.onSelect(selectedItem, isValid);

        if (this.props.retainValue && isValid) {
            this.autocompleteInput.value = selectedItem.code;
        }

        else {
            // Clear internal typeahead state value
            this.setState({
                value: ''
            });
        }
    }

    clearInternalState() {
        this.setState({
            value: ''
        });
        this.autocompleteInput.value = '';
    }

    generateWarning() {
        if (this.state.showWarning) {
            let errorProps = {};

            if (this.state.value && this.state.value.length < this.props.minCharsToSearch) {
                errorProps = {
                    header: 'Error',
                    description: `Please enter more than ${this.props.minCharsToSearch - 1} character${this.props.minCharsToSearch > 2 ? 's' : ''}.`
                };
            }
            else {
                errorProps = {
                    header: this.props.errorHeader,
                    description: this.props.errorMessage
                };
            }

            return <Warning {...errorProps} />;
        }

        return null;
    }

    render() {
        let activeDescendant = false;
        let status = '';
        if (this.state.shown && this.state.selectedIndex > -1) {
            activeDescendant = `${this.state.autocompleteId}__option-${this.state.selectedIndex}`;
            if (this.props.values.length > this.state.selectedIndex) {
                const selectedString = this.props.values[this.state.selectedIndex].title;
                const valueCount = Math.min(this.props.maxSuggestions, this.props.values.length);
                status = `${selectedString} (${this.state.selectedIndex + 1} of ${valueCount})`;
            }
        }
        const loadingIndicator = this.props.inFlight ?
            (
                <div className="usa-da-typeahead__loading-icon">
                    <FontAwesomeIcon icon="spinner" spin />
                </div>
            ) : null;

        return (
            <div
                className="usa-da-typeahead-wrapper"
                role="combobox"
                aria-controls={this.state.autocompleteId}
                aria-expanded={this.state.shown}
                aria-haspopup="true">
                <div className="usa-da-typeahead">
                    <p>{this.props.label}</p>
                    <div className="usa-da-typeahead__input">
                        <input
                            className="autocomplete"
                            ref={(t) => {
                                this.autocompleteInput = t;
                            }}
                            type="text"
                            placeholder={this.props.placeholder}
                            onChange={this.onChange.bind(this)}
                            tabIndex={0}
                            aria-controls={this.state.autocompleteId}
                            aria-activedescendant={activeDescendant}
                            aria-autocomplete="list"
                            maxLength={this.props.characterLimit} />
                        {loadingIndicator}
                    </div>
                    <div
                        className="screen-reader-description"
                        role="alert">
                        {status}
                    </div>
                    <SuggestionHolder
                        suggestions={this.props.values}
                        shown={this.state.shown}
                        selectedIndex={this.state.selectedIndex}
                        select={this.select.bind(this)}
                        maxSuggestions={this.props.maxSuggestions}
                        autocompleteId={this.state.autocompleteId} />
                </div>
                {this.generateWarning()}
            </div>
        );
    }
}

Autocomplete.defaultProps = defaultProps;
Autocomplete.propTypes = propTypes;
