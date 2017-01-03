/**
 * LocationList.jsx
 * Created by Mike Bray 12/9/2016
 **/

import React, { PropTypes } from 'react';
import _ from 'lodash';

import Typeahead from 'components/sharedComponents/Typeahead';
import TypeaheadWarning from 'components/sharedComponents/TypeaheadWarning';

const propTypes = {
    autocompleteLocations: PropTypes.array,
    placeholder: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
    customClass: PropTypes.string,
    keyValue: PropTypes.string,
    internalValue: PropTypes.string,
    formatter: React.PropTypes.func,
    tabIndex: PropTypes.number,
    handleTextInput: PropTypes.func,
    isRequired: PropTypes.bool
};

const defaultProps = {
    placeholder: 'State, City, County, Zip or District',
    customClass: '',
    formatter: null,
    keyValue: 'place',
    internalValue: 'location_name',
    tabIndex: null,
    isRequired: false,
    errorHeader: '',
    errorMessage: ''
};

export default class LocationList extends Typeahead {
    constructor(props) {
        super(props);

        this.state = {
            showWarning: false,
            errorMessage: null,
            errorHeader: null
        };

        this.timeout = null;
    }

    loadValues() {
        this.typeahead.list = this.props.autocompleteLocations;

        this.props.autocompleteLocations.forEach((value) => {
            let key = `<strong>${value.place}</strong><br>${_.upperCase(value.place_type)}`;
            if (value.parent !== null) {
                key += ` in ${value.parent}`;
            }

            this.dataDictionary[key] = value.matched_ids.join(",");
        });

        this.typeahead.replace = () => {
            this.typeahead.input.value = "";
        };
    }

    componentDidUpdate(prevProps) {
        // Load values if the result set is different from last time, or the component is focused.
        // The focus will happen when the user clicks the All, USA, or Foreign radio button.
        if ((!_.isEqual(prevProps.autocompleteLocations, this.props.autocompleteLocations)
                || this.props.focus === true)
            && this.typeahead) {
            this.loadValues();
        }
    }

    bubbleUpChange() {
        // Force the change up into the parent components
        // Validate the current value is on the autocomplete list
        let selectedLocation = null;
        const isValid = this.isValidSelection(this.state.value);

        if (isValid) {
            const key = this.dataDictionary[this.state.value];
            // Find matching location object from redux store based on Matched IDs key
            for (let i = 0; i < this.props.autocompleteLocations.length; i++) {
                if (_.isEqual(this.props.autocompleteLocations[i].matched_ids.join(","), key)) {
                    selectedLocation = this.props.autocompleteLocations[i];
                    break;
                }
            }
        }

        // Important - clear internal typeahead state value before passing selection
        this.state.value = '';
        this.props.onSelect(selectedLocation, isValid);
    }

    isValidSelection(input) {
        return {}.hasOwnProperty.call(this.dataDictionary, input);
    }

    checkValidity(input) {
        // Ensure user has typed 2 or more characters
        if (input.length === 1) {
            this.createTimeout(true,
                'You must enter at least 2 characters in the search box.',
                'Location Error',
                500
            );
        }
        // Clear error when input is cleared or longer than 2 characters
        else {
            this.cancelTimeout();
        }
    }

    createTimeout(showWarning, errorMessage, errorHeader, delay) {
        this.cancelTimeout();

        this.timeout = window.setTimeout(() => {
            this.setState({ showWarning, errorMessage, errorHeader });
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

    onChange(e) {
        const inputValue = e.target.value;

        this.checkValidity(inputValue);
        this.props.handleTextInput(e);
    }

    render() {
        let warning = null;
        if (this.state.showWarning) {
            const errorProps = {};
            if (this.state.errorHeader) {
                errorProps.header = this.state.errorHeader;
            }
            if (this.state.errorMessage) {
                errorProps.description = this.state.errorMessage;
            }

            warning = <TypeaheadWarning {...errorProps} />;
        }

        return (
            <div className="pop-typeahead">
                <div className="usa-da-typeahead">
                    <p>Primary Place of Performance</p>
                    <input
                        ref={(t) => {
                            this.awesompleteInput = t;
                        }}
                        id="location-input"
                        type="text"
                        className="location-input awesomplete"
                        placeholder={this.props.placeholder}
                        onChange={this.onChange.bind(this)} />
                </div>
                {warning}
            </div>
        );
    }
}

LocationList.defaultProps = defaultProps;
LocationList.propTypes = propTypes;
