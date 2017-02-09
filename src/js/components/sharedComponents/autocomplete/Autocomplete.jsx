/**
 * Created by michaelbray on 1/27/17.
 */

import React from 'react';
import _ from 'lodash';

import Warning from './Warning';
import SuggestionHolder from './SuggestionHolder';

const propTypes = {
    values: React.PropTypes.array,
    placeholder: React.PropTypes.string,
    handleTextInput: React.PropTypes.func,
    onSelect: React.PropTypes.func,
    errorHeader: React.PropTypes.string,
    errorMessage: React.PropTypes.string,
    tabIndex: React.PropTypes.number,
    isRequired: React.PropTypes.bool,
    maxSuggestions: React.PropTypes.number
};

const defaultProps = {
    values: [],
    placeholder: '',
    tabIndex: null,
    isRequired: false,
    errorHeader: null,
    errorDescription: null,
    maxSuggestions: 10
};

export default class Autocomplete extends React.Component {
    constructor(props) {
        super(props);

        this.dataDictionary = {};

        this.state = {
            value: '',
            shown: '',
            selectedIndex: 0,
            showWarning: ''
        };
    }

    componentDidMount() {
        this.setupAutocomplete();
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps.values, this.props.values)) {
            this.open();
        }
    }

    onChange(e) {
        this.checkValidity(e.target.value);
        this.props.handleTextInput(e);
        this.setState({
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

    close() {
        this.setState({
            shown: 'hidden'
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
        // Ensure user has typed 2 or more characters
        if (input.length === 1) {
            this.createTimeout(true,
                500
            );
        }
        // Clear error when input is cleared or longer than 2 characters
        else {
            this.cancelTimeout();
        }
    }

    createTimeout(showWarning, delay) {
        this.cancelTimeout();

        this.timeout = window.setTimeout(() => {
            this.setState({ showWarning });
        }, delay);
    }

    cancelTimeout() {
        window.clearTimeout(this.timeout);
        this.timeout = null;

        this.setState({
            showWarning: false,
            errorMessage: null,
            errorHeader: null
        });
    }

    changedText(e) {
        this.setState({
            value: e.target.value
        }, this.detectEmptySuggestions);
    }

    detectEmptySuggestions() {
        if (this.state.value.length > 2 && this.props.values.length === 0) {
            if (!this.state.showWarning) {
                // we need to show a warning that no matching loctions were found
                this.setState({
                    showWarning: true
                });
            }
            return;
        }

        // otherwise hide the warning
        if (this.state.showWarning) {
            this.setState({
                showWarning: false
            });
        }
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

        // Important - clear internal typeahead state value before passing selection
        this.state.value = '';
        this.props.onSelect(selectedItem, isValid);
    }

    render() {
        let warning = null;
        if (this.state.showWarning) {
            const errorProps = {};
            if (this.props.errorHeader) {
                errorProps.header = this.props.errorHeader;
            }
            if (this.props.errorMessage) {
                errorProps.description = this.props.errorMessage;
            }

            warning = <Warning {...errorProps} />;
        }

        return (
            <div className="pop-typeahead">
                <div className="usa-da-typeahead">
                    <p>Primary Place of Performance</p>
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
                {warning}
            </div>
        );
    }
}

Autocomplete.defaultProps = defaultProps;
Autocomplete.propTypes = propTypes;
