/**
 * Created by michaelbray on 1/27/17.
 */

import React from 'react';
import _ from 'lodash';

import Warning from './Warning';
import SuggestionHolder from './SuggestionHolder';

const propTypes = {
    handleTextInput: React.PropTypes.func.isRequired,
    onSelect: React.PropTypes.func.isRequired,
    clearAutocompleteSuggestions: React.PropTypes.func.isRequired,
    values: React.PropTypes.array,
    placeholder: React.PropTypes.string,
    errorHeader: React.PropTypes.string,
    errorMessage: React.PropTypes.string,
    tabIndex: React.PropTypes.number,
    isRequired: React.PropTypes.bool,
    maxSuggestions: React.PropTypes.number,
    label: React.PropTypes.string,
    noResults: React.PropTypes.bool
};

const defaultProps = {
    values: [],
    placeholder: '',
    isRequired: false,
    errorHeader: '',
    errorMessage: '',
    tabIndex: null,
    maxSuggestions: 10,
    label: '',
    noResults: false
};

export default class Autocomplete extends React.Component {
    constructor(props) {
        super(props);

        this.dataDictionary = {};

        this.state = {
            value: '',
            shown: '',
            selectedIndex: 0,
            showWarning: false
        };
    }

    componentDidMount() {
        this.setupAutocomplete();
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps.values, this.props.values)) {
            this.open();
        }
        else if (this.props.noResults !== prevProps.noResults) {
            this.toggleWarning();
        }
    }

    componentWillUnmount() {
        this.props.clearAutocompleteSuggestions();
    }

    onChange(e) {
        this.checkValidity(e.target.value);
        this.props.handleTextInput(e);
        this.setState({
            value: e.target.value,
            selectedIndex: 0
        });
    }

    setupAutocomplete() {
        const target = this.autocompleteInput;

        target.addEventListener('blur', () => {
            this.close();
            target.value = "";
        });

        // enable tab keyboard shortcut for selection
        target.addEventListener('keydown', (e) => {
            // Enter
            if (e.keyCode === 13) {
                e.preventDefault();
                this.select(this.props.values[this.state.selectedIndex]);
                target.value = "";
            }
            // Tab or Escape
            else if (e.keyCode === 9 || e.keyCode === 27) {
                target.value = "";
                this.close();
            }
            // Previous
            else if (e.keyCode === 38) {
                this.previous();
            }
            // Next
            else if (e.keyCode === 40) {
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
        this.setState({
            shown: 'hidden',
            showWarning: false
        });
    }

    open() {
        this.setState({
            shown: ''
        });
    }

    previous() {
        if (this.state.selectedIndex > 0) {
            this.setState({
                selectedIndex: this.state.selectedIndex -= 1
            });
        }
    }

    next() {
        if (this.state.selectedIndex < this.props.maxSuggestions - 1) {
            this.setState({
                selectedIndex: this.state.selectedIndex += 1
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

        if (input.length === 1) {
            // Ensure user has typed 2 or more characters before searching
            this.createTimeout(true, input, 1000);
        }
        else {
            // Clear timeout when input is cleared or longer than 2 characters
            this.cancelTimeout();
        }
    }

    createTimeout(warning, input, delay) {
        this.cancelTimeout();

        this.timeout = window.setTimeout(() => {
            this.setState({
                value: input,
                showWarning: warning
            });
        }, delay);
    }

    cancelTimeout() {
        window.clearTimeout(this.timeout);
        this.timeout = null;
    }

    changedText(e) {
        this.setState({
            value: e.target.value
        });
    }

    isValidSelection(input) {
        return _.find(this.props.values, input);
    }

    bubbleUpChange(selection) {
        // Force the change up into the parent components
        // Validate the current value is on the autocomplete list
        let selectedItem = null;
        const isValid = this.isValidSelection(selection);

        if (isValid) {
            selectedItem = selection.data;
        }

        this.props.onSelect(selectedItem, isValid);

        // Important - clear internal typeahead state value
        this.setState({
            value: ''
        });
    }

    generateWarning() {
        if (this.state.showWarning) {
            let errorProps = {};

            if (this.state.value && this.state.value.length === 1) {
                errorProps = {
                    header: 'Error',
                    description: 'Please enter more than 1 character.'
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
        return (
            <div className="pop-typeahead">
                <div className="usa-da-typeahead">
                    <p>{this.props.label}</p>
                    <input
                        className="location-input autocomplete"
                        ref={(t) => {
                            this.autocompleteInput = t;
                        }}
                        type="text"
                        placeholder={this.props.placeholder}
                        onChange={this.onChange.bind(this)}
                        tabIndex={this.props.tabIndex}
                        aria-required={this.props.isRequired} />
                    <SuggestionHolder
                        suggestions={this.props.values}
                        shown={this.state.shown}
                        selectedIndex={this.state.selectedIndex}
                        select={this.select.bind(this)}
                        maxSuggestions={this.props.maxSuggestions} />
                </div>
                {this.generateWarning()}
            </div>
        );
    }
}

Autocomplete.defaultProps = defaultProps;
Autocomplete.propTypes = propTypes;
