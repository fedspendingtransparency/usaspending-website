/**
 * ProgramSourceAutocompleteContainer.jsx
 * Created by Lizzie Salita 7/22/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { isCancel } from 'axios';
import { pickBy, debounce } from 'lodash';
import { programSourceInfo } from 'dataMapping/search/programSourceInfoTooltipContent';

import * as ProgramSourceHelper from 'helpers/programSourceHelper';
import Autocomplete from 'components/sharedComponents/autocomplete/Autocomplete';
import { CSSOnlyTooltip } from 'components/search/filters/tooltips/AdvancedSearchTooltip';

const propTypes = {
    component: PropTypes.object,
    selectedSources: PropTypes.object,
    updateComponent: PropTypes.func,
    dirtyFilters: PropTypes.symbol,
    clearSelection: PropTypes.func
};

export default class ProgramSourceAutocompleteContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            noResults: false,
            inFlight: false,
            searchString: '',
            autocompleteOptions: []
        };

        this.autocompleteRequest = null;
        this.fetchAutocompleteResults = this.fetchAutocompleteResults.bind(this);
        this.queryAutocompleteDebounced = debounce(this.fetchAutocompleteResults, 300);
        this.handleTextInput = this.handleTextInput.bind(this);
        this.clearAutocompleteSuggestions = this.clearAutocompleteSuggestions.bind(this);
        this.selectSourceComponent = this.selectSourceComponent.bind(this);
    }

    componentWillUnmount() {
        if (this.autocompleteRequest) {
            this.autocompleteRequest.cancel();
        }
        this.queryAutocompleteDebounced.cancel();
    }

    fetchAutocompleteResults(input) {
        if (this.autocompleteRequest) {
            // a request is in-flight, cancel it
            this.autocompleteRequest.cancel();
        }

        this.setState({
            noResults: false,
            inFlight: true
        });

        // Make a copy of the current selections
        let filters = Object.assign({}, this.props.selectedSources);
        // All the components are numbers except Availability Type Code, which we want to be case insensitive
        filters[this.props.component.code] = input.toUpperCase();
        // Exclude filters with empty values
        filters = pickBy(filters);

        // create the params
        const params = {
            filters,
            limit: 10
        };

        const helperFunction = `fetch${this.props.component.code.toUpperCase()}s`;
        this.autocompleteRequest = ProgramSourceHelper[helperFunction](params);

        this.autocompleteRequest.promise
            .then((res) => {
                this.parseResults(res.data.results);
            })
            .catch((err) => {
                this.autocompleteRequest = null;
                if (!isCancel(err)) {
                    this.setState({
                        noResults: true,
                        inFlight: false
                    });
                    console.log(err);
                }
            });
    }

    parseResults(results) {
        let parsedResults = [];
        if (this.props.component.code === 'aid' || this.props.component.code === 'ata') {
            parsedResults = results.map((agency) => {
                const abbreviation = agency.agency_abbreviation ? ` (${agency.agency_abbreviation})` : '';
                return ({
                    title: agency[this.props.component.code],
                    subtitle: `${agency.agency_name}${abbreviation}`,
                    data: { code: agency[this.props.component.code] }
                });
            });
        }
        else {
            parsedResults = results.map((option) => ({
                title: option,
                subtitle: '',
                data: { code: option }
            }));
        }
        this.setState({
            autocompleteOptions: parsedResults,
            noResults: parsedResults.length === 0,
            inFlight: false
        });
    }

    selectSourceComponent(selectedSource, isValid) {
        if (selectedSource && isValid) {
            this.props.updateComponent(this.props.component.code, selectedSource.code);
        }
    }

    clearAutocompleteSuggestions() {
        this.setState({
            autocompleteOptions: []
        });
    }

    handleTextInput(event) {
        event.persist();
        this.props.clearSelection(this.props.component.code);
        if (event.target.value) {
            this.queryAutocompleteDebounced(event.target.value);
        }
        else {
            this.clearAutocompleteSuggestions();
        }
    }

    render() {
        const requiredIndicator = this.props.component.required ? (<span className="program-source-select-filter__label-required">Required</span>) : '';
        return (
            <div className="program-source-select-filter">
                <label className="program-source-select-filter__label">
                    {`${this.props.component.label} (${this.props.component.code.toUpperCase()})`}
                    <CSSOnlyTooltip
                        heading={programSourceInfo[this.props.component.code].heading}
                        definition={programSourceInfo[this.props.component.code].definition}
                        example={programSourceInfo[this.props.component.code].example} />
                    {requiredIndicator}
                </label>
                <Autocomplete
                    values={this.state.autocompleteOptions}
                    handleTextInput={this.handleTextInput}
                    onSelect={this.selectSourceComponent}
                    retainValue
                    dirtyFilters={this.props.dirtyFilters}
                    minCharsToSearch={1}
                    placeholder={`Enter ${this.props.component.code.toUpperCase()} value (${this.props.component.characterLimit} characters)`}
                    errorHeader={`Unknown ${this.props.component.code.toUpperCase()}`}
                    errorMessage={`We were unable to find that ${this.props.component.label}`}
                    ref={(input) => {
                        this.programSourceList = input;
                    }}
                    clearAutocompleteSuggestions={this.clearAutocompleteSuggestions}
                    noResults={this.state.noResults}
                    inFlight={this.state.inFlight}
                    characterLimit={this.props.component.characterLimit} />
            </div>
        );
    }
}

ProgramSourceAutocompleteContainer.propTypes = propTypes;
