/**
 * AgencyList.jsx
 * Created by Emily Gullo 12/23/2016
 **/

import React from 'react';
import _ from 'lodash';

import Typeahead from 'components/sharedComponents/Typeahead';
import TypeaheadWarning from 'components/sharedComponents/TypeaheadWarning';
import SelectedAgencies from './SelectedAgencies';

const propTypes = {
    autocompleteAgencies: React.PropTypes.array,
    onSelect: React.PropTypes.func,
    customClass: React.PropTypes.string,
    keyValue: React.PropTypes.string,
    internalValue: React.PropTypes.string,
    formatter: React.PropTypes.func,
    tabIndex: React.PropTypes.number,
    handleTextInput: React.PropTypes.func,
    isRequired: React.PropTypes.bool,
    agencyType: React.PropTypes.string,
    checkValidity: React.PropTypes.func,
    selectedAgencies: React.PropTypes.object
};

const defaultProps = {
    autocompleteAgencies: [],
    customClass: '',
    keyValue: 'agency',
    internalValue: 'agency_name',
    formatter: null,
    tabIndex: null,
    isRequired: false,
    agencyType: '',
    selectedAgencies: {}
};

export default class AgencyList extends Typeahead {
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
        this.typeahead.list = this.props.autocompleteAgencies;

        if (this.props.autocompleteAgencies.length > 0) {
            this.props.autocompleteAgencies.forEach((item) => {
                let key = `<b>${item.subtier_agency.name}</b>`;
                if (item.toptier_agency.name !== item.subtier_agency.name) {
                    key += `<br>Sub-Agency of ${item.toptier_agency.name}`;
                }

                this.dataDictionary[key] = item.id;
            });
        }

        this.typeahead.replace = () => {
            this.typeahead.input.value = "";
        };
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps.autocompleteAgencies, this.props.autocompleteAgencies)) {
            this.loadValues();
        }
    }

    bubbleUpChange() {
        // Force the change up into the parent components
        // Validate the current value is on the autocomplete list
        let selectedAgency = null;
        const isValid = this.isValidSelection(this.state.value);

        if (isValid) {
            const key = this.dataDictionary[this.state.value];
            // Find matching agency object from redux store
            for (let i = 0; i < this.props.autocompleteAgencies.length; i++) {
                if (_.isEqual(this.props.autocompleteAgencies[i].id, key)) {
                    selectedAgency = this.props.autocompleteAgencies[i];
                    break;
                }
            }
        }

        // Important - clear internal typeahead state value before passing selection
        this.state.value = '';
        this.props.onSelect(selectedAgency, isValid, this.props.agencyType);
    }

    isValidSelection(input) {
        return {}.hasOwnProperty.call(this.dataDictionary, input);
    }

    checkValidity(input) {
        // Ensure user has typed 2 or more characters
        if (input.length === 1) {
            this.createTimeout(true,
                'You must enter at least 2 characters in the search box.',
                'Agency Error',
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

        let chosenAgencies = null;
        const agencyTypeSet = this.props.selectedAgencies;

        if (agencyTypeSet.size > 0) {
            chosenAgencies = (<SelectedAgencies
                selectedAgencies={agencyTypeSet}
                removeAgency={this.props.removeAgency}
                agencyType={this.props.agencyType} />);
        }

        return (
            <div>
                <div className={`pop-typeahead ${_.lowerCase(this.props.agencyType)}`}>
                    <div className="usa-da-typeahead">
                        <p>{this.props.agencyType} Agency</p>
                        <input
                            ref={(t) => {
                                this.awesompleteInput = t;
                            }}
                            id={`${this.props.agencyType}-agency-input`}
                            type="text"
                            className={`${this.props.agencyType}-agency-input awesomplete`}
                            placeholder={`${this.props.agencyType} Agency`}
                            onChange={this.onChange.bind(this)}
                            data-autofirst="false" />
                    </div>
                    {warning}
                </div>
                {chosenAgencies}
            </div>
        );
    }
}

AgencyList.defaultProps = defaultProps;
AgencyList.propTypes = propTypes;
