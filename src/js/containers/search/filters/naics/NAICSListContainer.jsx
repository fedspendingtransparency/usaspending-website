/**
* NAICSListContainer.jsx
* Created by Emily Gullo 07/14/2017
**/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isEqual, omit, differenceWith, slice } from 'lodash';
import { isCancel } from 'axios';
import { Search } from 'js-search';
import PropTypes from 'prop-types';

import * as SearchHelper from 'helpers/searchHelper';
import * as autocompleteActions from 'redux/actions/search/autocompleteActions';

import Autocomplete from 'components/sharedComponents/autocomplete/Autocomplete';

const propTypes = {
    selectNAICS: PropTypes.func,
    setAutocompleteNAICS: PropTypes.func,
    selectedNAICS: PropTypes.object,
    autocompleteNAICS: PropTypes.array
};

export class NAICSListContainer extends React.Component {
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

    componentDidMount() {
        this.parseAutocompleteNAICS(this.props.autocompleteNAICS);
    }

    componentWillReceiveProps(nextProps) {
        if (!isEqual(nextProps.autocompleteNAICS, this.props.autocompleteNAICS)) {
            this.parseAutocompleteNAICS(nextProps.autocompleteNAICS);
        }
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
                    search.addIndex(['naics']);
                    search.addIndex(['naics_description']);
                    search.addDocuments(data);
                    const results = search.search(this.state.cfdaSearchString);
                    let improvedResults = slice(results, 0, 10);

                    // Remove 'identifier' from selected NAICS to enable comparison
                    improvedResults = this.props.selectedNAICS.toArray()
                        .map((naics) => omit(naics, 'identifier'));

                    // Filter out any selected NAICS that may be in the result set
                    if (improvedResults && improvedResults.length > 0) {
                        autocompleteData = differenceWith(data, improvedResults, isEqual);
                    }
                    else {
                        autocompleteData = data;
                    }

                    this.setState({
                        noResults: autocompleteData.length === 0
                    });

                    // Add search results to Redux
                    this.props.setAutocompleteNAICS(autocompleteData);
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
        this.props.setAutocompleteNAICS([]);
    }

    handleTextInput(naicsInput) {
        // Clear existing NAICS to ensure user can't select an old or existing one
        this.props.setAutocompleteNAICS([]);

        // Grab input, clear any exiting timeout
        const input = naicsInput.target.value;
        window.clearTimeout(this.timeout);

        // Perform search if user doesn't type again for 300ms
        this.timeout = window.setTimeout(() => {
            this.queryAutocompleteNAICS(input);
        }, 300);
    }

    render() {
        return (
            <Autocomplete
                {...this.props}
                values={this.state.autocompleteNAICS}
                handleTextInput={this.handleTextInput}
                onSelect={this.props.selectNAICS}
                placeholder="eg: 33641 - Aircraft Manufacturing"
                errorHeader="Unknown NAICS"
                errorMessage="We were unable to find that NAICS."
                ref={(input) => {
                    this.naicsList = input;
                }}
                clearAutocompleteSuggestions={this.clearAutocompleteSuggestions}
                noResults={this.state.noResults} />
        );
    }

}

export default connect(
    (state) => ({ autocompleteNAICS: state.autocompleteNAICS }),
    (dispatch) => bindActionCreators(autocompleteActions, dispatch)
)(NAICSListContainer);

NAICSListContainer.propTypes = propTypes;
