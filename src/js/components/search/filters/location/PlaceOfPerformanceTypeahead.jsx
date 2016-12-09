/**
 * PlaceOfPerformanceTypeahead.jsx
 * Created by Mike Bray 12/9/2016
 **/

import React, { PropTypes } from 'react';
import _ from 'lodash';

import Typeahead from '../../../../components/sharedComponents/Typeahead';
import TypeaheadWarning from '../../../../components/sharedComponents/TypeaheadWarning';

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
    keyValue: 'place',
    internalValue: 'location_name',
    tabIndex: null,
    isRequired: false,
    errorHeader: null,
    errorDescription: null
};

export default class PlaceOfPerformanceTypeahead extends Typeahead {
    loadValues() {
        this.typeahead.list = this.props.values;

        this.props.values.forEach((value) => {
            let key = `<strong>${value.place}</strong><br>${_.upperCase(value.place_type)}`;
            if (value.parent !== null) {
                key += ` in ${value.parent}`;
            }

            const val = value.matched_ids.join(",");

            this.dataDictionary[key] = val;
        });
    }

    bubbleUpChange() {
        // force the change up into the parent components
        // validate the current value is on the autocomplete list
        const validity = {}.hasOwnProperty.call(this.dataDictionary, this.state.value);
        this.props.onSelect(this.dataDictionary[this.state.value], validity);
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
                    <p>Primary Place of Performance</p>
                    <input
                        data-multiple
                        ref="awesomplete"
                        id="location-input"
                        type="text"
                        className="location-input awesomplete"
                        placeholder={placeholder}
                        disabled={disabled}
                        onChange={this.props.handleTextInput} />
                </div>
                {warning}
            </div>
        );
    }
}

PlaceOfPerformanceTypeahead.defaultProps = defaultProps;
PlaceOfPerformanceTypeahead.propTypes = propTypes;
