/**
 * SourceSelectFilter.jsx
 * Created by Lizzie Salita 6/7/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { isEqual, differenceWith } from 'lodash';

import Autocomplete from 'components/sharedComponents/autocomplete/Autocomplete';

const propTypes = {
    label: PropTypes.string,
    code: PropTypes.string,
    characterLimit: PropTypes.number,
    required: PropTypes.bool,
    options: PropTypes.array,
    selectedSources: PropTypes.array,
    updateComponent: PropTypes.func,
    createFilters: PropTypes.func
};

const defaultProps = {
    // TODO - Lizzie: remove mock data
    options: [
        {
            code: '020',
            name: 'Department of the Treasury (TREAS)'
        },
        {
            code: '014',
            name: 'Department of the Interior (DOI)'
        },
        {
            code: '068',
            name: 'Environmental Protection Agency (EPA)'
        }
    ],
    selectedSources: [],
    required: false
};

export class SourceSelectFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchString: '',
            autocompleteOptions: [],
            noResults: false
        };

        this.handleTextInput = this.handleTextInput.bind(this);
        this.clearAutocompleteSuggestions = this.clearAutocompleteSuggestions.bind(this);
        this.selectSourceComponent = this.selectSourceComponent.bind(this);
        this.timeout = null;
    }

    parseAutocompleteOptions(options) {
        const values = [];
        if (options && options.length > 0) {
            options.forEach((item) => {
                values.push({
                    title: `${item.code} - ${item.name}`,
                    subtitle: '',
                    data: item
                });
            });
        }

        this.setState({
            autocompleteOptions: values
        });
    }

    queryAutocomplete(input) {
        this.setState({
            noResults: false
        });

        // Only search if input is 2 or more characters
        if (input.length >= 2) {
            this.setState({
                searchString: input
            });

            let autocompleteOptions = [];

            const matches = this.props.options.filter((source) => (source.code.includes(this.state.searchString)));
            // Filter out any selectedSources that may be in the result set
            if (this.props.selectedSources && this.props.selectedSources.length > 0) {
                autocompleteOptions = differenceWith(matches, this.props.selectedSources, isEqual);
            }
            else {
                autocompleteOptions = matches;
            }

            this.parseAutocompleteOptions(autocompleteOptions);

            this.setState({
                noResults: autocompleteOptions.length === 0
            });
        }
    }

    selectSourceComponent(selectedSource) {
        this.props.updateComponent(this.props.code, selectedSource.code);
        this.props.createFilters();
    }

    clearAutocompleteSuggestions() {
        this.setState({
            autocompleteOptions: []
        });
    }

    handleTextInput(programSourceInput) {
        // Clear existing sources to ensure user can't select an old or existing one
        this.setState({
            autocompleteOptions: []
        });

        // Grab input, clear any exiting timeout
        const input = programSourceInput.target.value;
        window.clearTimeout(this.timeout);

        // Perform search if user doesn't type again for 300ms
        this.timeout = window.setTimeout(() => {
            this.queryAutocomplete(input);
        }, 300);
    }

    render() {
        const requiredIndicator = this.props.required ? (<span className="program-source-select-filter__label-required">Required</span>) : '';
        return (
            <div className="program-source-select-filter">
                <label className="program-source-select-filter__label">
                    {`${this.props.label} (${this.props.code.toUpperCase()})`}
                    {requiredIndicator}
                </label>
                <Autocomplete
                    values={this.state.autocompleteOptions}
                    handleTextInput={this.handleTextInput}
                    onSelect={this.selectSourceComponent}
                    placeholder={`Enter ${this.props.code.toUpperCase()} value (${this.props.characterLimit} characters)`}
                    errorHeader={`Unknown ${this.props.code.toUpperCase()}`}
                    errorMessage={`We were unable to find that ${this.props.label}`}
                    ref={(input) => {
                        this.programSourceList = input;
                    }}
                    clearAutocompleteSuggestions={this.clearAutocompleteSuggestions}
                    noResults={this.state.noResults}
                    characterLimit={this.props.characterLimit} />
            </div>
        );
    }
}

export default SourceSelectFilter;
SourceSelectFilter.propTypes = propTypes;
SourceSelectFilter.defaultProps = defaultProps;
