/**
 * PlaceOfPerformanceTypeahead.jsx
 * Created by Mike Bray 12/9/2016
 **/

import React, { PropTypes } from 'react';
import _ from 'lodash';
import Awesomplete from 'awesomplete';

import Typeahead from '../../../../components/sharedComponents/Typeahead';
import TypeaheadWarning from '../../../../components/sharedComponents/TypeaheadWarning';

const propTypes = {
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
    showWarning: PropTypes.bool,
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
    loadValues() {
        this.typeahead.list = this.props.autocompleteLocations;

        this.props.autocompleteLocations.forEach((value) => {
            let key = `<strong>${value.place}</strong><br>${_.upperCase(value.place_type)}`;
            if (value.parent !== null) {
                key += ` in ${value.parent}`;
            }

            this.dataDictionary[key] = value.matched_ids.join(",");
        });

        this.typeahead.replace = (text) => {
            this.typeahead.input.value = "";
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (!_.isEqual(prevProps.autocompleteLocations, this.props.autocompleteLocations)
            && this.typeahead) {
            this.loadValues();
        }
    }

    bubbleUpChange() {
        // Force the change up into the parent components
        // Validate the current value is on the autocomplete list
        const validity = {}.hasOwnProperty.call(this.dataDictionary, this.state.value);

        if (validity){
            const key = this.dataDictionary[this.state.value];
            let selectedLocation = null;

            // Find matching location object from redux store based on Matched IDs key
            for (let i = 0; i < this.props.autocompleteLocations.length; i++){
                if (_.isEqual(this.props.autocompleteLocations[i]['matched_ids'].join(","),key)){
                    selectedLocation = this.props.autocompleteLocations[i];
                    break;
                }
            }
            this.props.onSelect(selectedLocation, validity);
        }
    }

    render() {
        let warning = null;
        let shownError = "";
        if (this.props.showWarning) {
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
                    <p>Primary Place of Performance</p>
                    <input
                        data-multiple
                        ref="awesomplete"
                        id="location-input"
                        type="text"
                        className="location-input awesomplete"
                        placeholder={this.props.placeholder}
                        onChange={this.props.handleTextInput} />
                </div>
                {warning}
            </div>
        );
    }
}

PlaceOfPerformanceTypeahead.defaultProps = defaultProps;
PlaceOfPerformanceTypeahead.propTypes = propTypes;
