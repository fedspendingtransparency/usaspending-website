/**
* Typeahead.jsx
* Created by Kevin Li 4/20/2016
*/

import React, { PropTypes } from 'react';
import _ from 'lodash';
import Awesomplete from 'awesomplete';

import TypeaheadWarning from './TypeaheadWarning';

const propTypes = {
    values: PropTypes.array.isRequired,
    placeholder: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
    customClass: PropTypes.string,
    keyValue: PropTypes.string,
    internalValue: PropTypes.string,
    formatter: React.PropTypes.func,
    errorHeader: PropTypes.string,
    errorMessage: PropTypes.string,
    tabIndex: PropTypes.number,
    handleTextInput: PropTypes.func,
    isRequired: PropTypes.bool
};

const defaultProps = {
    values: [],
    placeholder: 'State, City, County, Zip or District',
    customClass: '',
    formatter: null,
    keyValue: 'location_code',
    internalValue: 'location_name',
    tabIndex: null,
    isRequired: false,
    errorHeader: null,
    errorDescription: null
};

export default class Typeahead extends React.Component {
    constructor(props) {
        super(props);

        this.typeahead = null;
        this.dataDictionary = {};

        this.state = {
            value: "",
            showWarning: false
        };
    }
    componentDidMount() {
        this.mountAwesomeplete();
    }

    componentDidUpdate(prevProps, prevState) {
        if (!_.isEqual(prevProps.values, this.props.values) && this.typeahead) {
            this.loadValues();
        }
    }

    loadValues() {
        this.typeahead.list = this.props.values;

        this.props.values.forEach((value) => {
            this.dataDictionary[value] = value;
        });
    }

    mountAwesomeplete() {
        const target = this.refs.awesomplete;
        this.typeahead = new Awesomplete(target);
        this.typeahead.autoFirst = true;

        if (this.props.formatter) {
            this.typeahead.data = this.props.formatter;
        }

        this.loadValues();

        // set up event handlers
        this.refs.awesomplete.addEventListener('awesomplete-selectcomplete', (e) => {
            this.setState({
                value: e.text.label
            }, () => {
                this.bubbleUpChange();
            });
            this.typeahead.close();
        });

        this.refs.awesomplete.addEventListener('blur', (e) => {
            this.bubbleUpChange();
        });

        // enable tab keyboard shortcut for selection
        this.refs.awesomplete.addEventListener('keydown', (e) => {
            if (e.keyCode === 9) {
                this.typeahead.select();
            }
        });
    }

    changedText(e) {
        this.setState({
            value: e.target.value
        }, this.detectEmptySuggestions);
    }

    detectEmptySuggestions() {
        if (this.state.value.length > 2 && this.typeahead.suggestions.length === 0) {
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

    bubbleUpChange() {
        // force the change up into the parent components
        // validate the current value is on the autocomplete list
        const validity = {}.hasOwnProperty.call(this.dataDictionary, this.state.value);
        this.props.onSelect(this.state.value, validity);
    }


    // create public functions to perform Awesomplete actions
    expand() {
        if (this.typeahead) {
            this.typeahead.open();
        }
    }

    collapse() {
        if (this.typeahead) {
            this.typeahead.close();
        }
    }

    nextItem() {
        if (this.typeahead) {
            this.typeahead.next();
        }
    }

    prevItem() {
        if (this.typeahead) {
            this.typeahead.previous();
        }
    }

    selectItem() {
        if (this.typeahead) {
            this.typeahead.select();
        }
    }

    jumpTo(i) {
        if (this.typeahead) {
            this.typeahead.goto(i);
        }
    }

    render() {
        let disabled = null;
        let placeholder = this.props.placeholder;
        if (this.props.values.length === 0) {
            disabled = 'disabled';
            placeholder = 'Loading list...';
        }

        let warning = null;
        let shownError = "";
        if (this.state.showWarning) {
            shownError = "shown";
            const errorProps = {};
            if (this.props.errorHeader) {
                errorProps.header = this.props.errorHeader;
            }
            if (this.props.errorMessage) {
                errorProps.description = this.props.errorMessage;
            }

            warning = <TypeaheadWarning {...errorProps} />;
        }

        return (
            <div className={shownError}>
                <div className="usa-da-typeahead">
                    <input
                        className={this.props.customClass}
                        ref="awesomplete"
                        type="text"
                        placeholder={placeholder}
                        value={this.props.value}
                        onChange={this.changedText.bind(this)}
                        onBlur={this.props.handleTextInput}
                        tabIndex={this.props.tabIndex}
                        disabled={disabled}
                        aria-required={this.props.isRequired} />
                </div>
                {warning}
            </div>
        );
    }
}

Typeahead.defaultProps = defaultProps;
Typeahead.propTypes = propTypes;
