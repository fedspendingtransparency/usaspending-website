/**
* NAICSListContainer.jsx
* Created by Emily Gullo 07/14/2017
**/

import React from 'react';
import { isEqual, omit, differenceWith, slice } from 'lodash';
import { isCancel } from 'axios';
import { Search, PrefixIndexStrategy } from 'js-search';
import PropTypes from 'prop-types';
import kGlobalConstants from 'GlobalConstants';

import * as SearchHelper from 'helpers/searchHelper';

import Autocomplete from 'components/sharedComponents/autocomplete/Autocomplete';

const propTypes = {
    selectNAICS: PropTypes.func,
    selectedNAICS: PropTypes.object
};

export default class NAICSListContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            naicsSearchString: '',
            autocompleteNAICS: [],
            noResults: false
        };

        this.handleTextInput = this.handleTextInput.bind(this);
        this.clearAutocompleteSuggestions = this.clearAutocompleteSuggestions.bind(this);
        this.timeout = null;
    }

    parseAutocompleteNAICS(naics) {
        const values = [];
        if (naics.length > 0) {
            naics.forEach((item) => {
                values.push({
                    title: `${item.naics} - ${item.naics_description}`,
                    subtitle: '',
                    data: item
                });
            });
        }

        this.setState({
            autocompleteNAICS: values
        });
    }

    queryAutocompleteNAICS(input) {
        this.setState({
            noResults: false
        });

        // Only search if input is 2 or more characters
        if (input.length >= 2) {
            this.setState({
                naicsSearchString: input
            });

            if (this.naicsSearchRequest) {
                // A request is currently in-flight, cancel it
                this.naicsSearchRequest.cancel();
            }

            const naicsSearchParams = {
                search_text: this.state.naicsSearchString
            };

            this.naicsSearchRequest = SearchHelper.fetchNAICS(naicsSearchParams);

            this.naicsSearchRequest.promise
                .then((res) => {
                    const data = res.data.results;
                    let autocompleteData = [];
                    const search = new Search('naics');
                    // ordering by prefix if there are matches returned that begin w/ the exact text
                    search.indexStrategy = new PrefixIndexStrategy();
                    search.addIndex(['naics']);
                    search.addIndex(['naics_description']);
                    search.addDocuments(data);
                    const results = search.search(this.state.naicsSearchString);
                    const improvedResults = slice(results, 0, 10);

                    // Filter out any selected NAICS that may be in the result set
                    const selectedNAICS =
                    this.props.selectedNAICS.toArray().map((naics) => omit(naics, 'identifier'));
                    if (improvedResults && improvedResults.length > 0) {
                        autocompleteData = differenceWith(improvedResults, selectedNAICS, isEqual);
                    }
                    else {
                        autocompleteData = improvedResults;
                    }

                    this.setState({
                        noResults: autocompleteData.length === 0
                    });

                    // Add search results to Redux
                    this.parseAutocompleteNAICS(autocompleteData);
                })
                .catch((err) => {
                    if (!isCancel(err)) {
                        this.setState({
                            noResults: true
                        });
                    }
                });
        }
        else if (this.naicsSearchRequest) {
            // A request is currently in-flight, cancel it
            this.naicsSearchRequest.cancel();
        }
    }

    clearAutocompleteSuggestions() {
        this.setState({
            autocompleteNAICS: []
        });
    }

    handleTextInput(naicsInput) {
        // Clear existing NAICS to ensure user can't select an old or existing one
        this.setState({
            autocompleteNAICS: []
        });

        // Grab input, clear any exiting timeout
        const input = naicsInput.target.value;
        window.clearTimeout(this.timeout);

        // Perform search if user doesn't type again for 300ms
        this.timeout = window.setTimeout(() => {
            this.queryAutocompleteNAICS(input);
        }, 300);
    }

    render() {
        const placeholder = kGlobalConstants.DEV ?
            'Type to find codes' :
            'e.g., 336411 - Aircraft Manufacturing';
        return (
            <Autocomplete
                {...this.props}
                values={this.state.autocompleteNAICS}
                handleTextInput={this.handleTextInput}
                onSelect={this.props.selectNAICS}
                placeholder={placeholder}
                errorHeader="Unknown NAICS"
                errorMessage="We were unable to find that NAICS."
                ref={(input) => {
                    this.naicsList = input;
                }}
                clearAutocompleteSuggestions={this.clearAutocompleteSuggestions}
                noResults={this.state.noResults}
                minCharsToSearch={3} />
        );
    }
}

NAICSListContainer.propTypes = propTypes;
