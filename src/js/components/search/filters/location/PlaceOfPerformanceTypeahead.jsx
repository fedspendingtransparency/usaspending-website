/**
 * PlaceOfPerformanceTypeahead.jsx
 * Created by Mike Bray 12/9/2016
 **/

import React, { PropTypes } from 'react';
import _ from 'lodash';

import Typeahead from '../../../../components/sharedComponents/Typeahead';
import TypeaheadWarning from '../../../../components/sharedComponents/TypeaheadWarning';

const propTypes = {
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

export default class PlaceOfPerformanceTypeahead extends Typeahead {
    constructor(props) {
        super(props);
        this.state = {
            validity: true
        };
        this.checkValidity = this.checkValidity.bind(this);
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
        if (!_.isEqual(prevProps.autocompleteLocations, this.props.autocompleteLocations)
            && this.typeahead) {
            this.loadValues();
        }
    }

    bubbleUpChange() {
        // Force the change up into the parent components
        // Validate the current value is on the autocomplete list
        let selectedLocation = '';
        if (this.state.valid) {
            const key = this.dataDictionary[this.state.value.place];
            // Find matching location object from redux store based on Matched IDs key
            for (let i = 0; i < this.props.autocompleteLocations.length; i++) {
                if (_.isEqual(this.props.autocompleteLocations[i].matched_ids.join(","), key)) {
                    selectedLocation = this.props.autocompleteLocations[i];
                    break;
                }
            }
        }
        this.props.onSelect(selectedLocation, this.state.valid);
    }

    checkValidity(input) {
        const validity = {}.hasOwnProperty.call(this.dataDictionary, input);
        this.setState({
            valid: validity
        });
    }

    onChange(e) {
        const inputValue = e.target.value;
        this.checkValidity(inputValue);

        if (inputValue.length === 1) {
            if (!this.state.showWarning) {
                setTimeout(() => {
                    this.setState({
                        showWarning: true,
                        errorMessage: 'You must enter at least 2 characters in the search box.',
                        errorHeader: 'Location Error'
                    });
                }, 500);
            }
            return;
        }

        if (!this.state.validity) {
            setTimeout(() => {
                this.setState({
                    showWarning: true,
                    errorMessage: 'This location is not available, please try another.',
                    errorHeader: 'Location Error'
                });
            }, 500);
        }

        // otherwise hide the warning
        if (this.state.showWarning) {
            this.setState({
                showWarning: false
            });
        }

        this.props.handleTextInput(e);
    }

    render() {
        let warning = null;
        let shownError = "";
        if (this.state.showWarning) {
            shownError = "shown";
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
            <div className={shownError}>
                <div className="usa-da-typeahead">
                    <p>Primary Place of Performance</p>
                    <input
                        data-multiple
                        ref="awesomplete"
                        id="location-input"
                        type="text"
                        className="location-input awesomplete"
                        placeholder={this.props.placeholder}
                        onChange={this.onChange} />
                </div>
                {warning}
            </div>
        );
    }
}

PlaceOfPerformanceTypeahead.defaultProps = defaultProps;
PlaceOfPerformanceTypeahead.propTypes = propTypes;
