/**
* CFDAListContainer.jsx
* Created by Emily Gullo 07/10/2017
**/

import React from 'react';
import { isEqual, omit, differenceWith, slice } from 'lodash';
import { isCancel } from 'axios';
import { Search, PrefixIndexStrategy } from 'js-search';
import PropTypes from 'prop-types';

import * as SearchHelper from 'helpers/searchHelper';

import Autocomplete from 'components/sharedComponents/autocomplete/Autocomplete';

const propTypes = {
    selectCFDA: PropTypes.func,
    selectedCFDA: PropTypes.object
};

export default class CFDAListContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cfdaSearchString: '',
            autocompleteCFDA: [],
            noResults: false
        };

        this.handleTextInput = this.handleTextInput.bind(this);
        this.clearAutocompleteSuggestions = this.clearAutocompleteSuggestions.bind(this);
        this.timeout = null;
    }

    parseAutocompleteCFDA(cfda) {
        const values = [];
        if (cfda && cfda.length > 0) {
            cfda.forEach((item) => {
                const title = `${item.program_number} - ${item.program_title}`;
                const subtitle = '';

                values.push({
                    title,
                    subtitle,
                    data: item
                });
            });
        }

        this.setState({
            autocompleteCFDA: values
        });
    }

    queryAutocompleteCFDA(input) {
        this.setState({
            noResults: false
        });

        // Only search if input is 2 or more characters
        if (input.length >= 2) {
            this.setState({
                cfdaSearchString: input
            });

            if (this.cfdaSearchRequest) {
                // A request is currently in-flight, cancel it
                this.cfdaSearchRequest.cancel();
            }

            const cfdaSearchParams = {
                search_text: this.state.cfdaSearchString
            };

            this.cfdaSearchRequest = SearchHelper.fetchCFDA(cfdaSearchParams);

            this.cfdaSearchRequest.promise
                .then((res) => {
                    const data = res.data.results;
                    let autocompleteData = [];
                    const search = new Search('program_number');
                    // ordering by prefix if there are matches returned that begin w/ the exact text
                    search.indexStrategy = new PrefixIndexStrategy();
                    search.addIndex(['program_number']);
                    search.addIndex(['program_title']);
                    search.addDocuments(data);
                    const results = search.search(this.state.cfdaSearchString);
                    const improvedResults = slice(results, 0, 10);

                    // Filter out any selected CFDA that may be in the result set
                    const selectedCFDA =
                    this.props.selectedCFDA.toArray().map((cfda) => omit(cfda, 'identifier'));
                    if (improvedResults && improvedResults.length > 0) {
                        autocompleteData = differenceWith(improvedResults, selectedCFDA, isEqual);
                    }
                    else {
                        autocompleteData = improvedResults;
                    }

                    this.setState({
                        noResults: autocompleteData.length === 0
                    });

                    // Add search results to Redux
                    this.parseAutocompleteCFDA(autocompleteData);
                })
                .catch((err) => {
                    if (!isCancel(err)) {
                        this.setState({
                            noResults: true
                        });
                    }
                });
        }
        else if (this.cfdaSearchRequest) {
            // A request is currently in-flight, cancel it
            this.cfdaSearchRequest.cancel();
        }
    }

    clearAutocompleteSuggestions() {
        this.setState({
            autocompleteCFDA: []
        });
    }

    handleTextInput(cfdaInput) {
        // Clear existing cfdas to ensure user can't select an old or existing one
        this.setState({
            autocompleteCFDA: []
        });

        // Grab input, clear any exiting timeout
        const input = cfdaInput.target.value;
        window.clearTimeout(this.timeout);

        // Perform search if user doesn't type again for 300ms
        this.timeout = window.setTimeout(() => {
            this.queryAutocompleteCFDA(input);
        }, 300);
    }

    render() {
        return (
            <Autocomplete
                {...this.props}
                values={this.state.autocompleteCFDA}
                handleTextInput={this.handleTextInput}
                onSelect={this.props.selectCFDA}
                placeholder="e.g., 93.778 - Medical Assistance Program"
                errorHeader="Unknown CFDA"
                errorMessage="We were unable to find that CFDA."
                ref={(input) => {
                    this.cfdaList = input;
                }}
                clearAutocompleteSuggestions={this.clearAutocompleteSuggestions}
                noResults={this.state.noResults} />
        );
    }
}

CFDAListContainer.propTypes = propTypes;
