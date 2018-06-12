/**
* PSCListContainer.jsx
* Created by Emily Gullo 07/14/2017
**/

import React from 'react';
import { isEqual, differenceWith, omit } from 'lodash';
import { isCancel } from 'axios';
import PropTypes from 'prop-types';

import * as SearchHelper from 'helpers/searchHelper';

import Autocomplete from 'components/sharedComponents/autocomplete/Autocomplete';

const propTypes = {
    selectPSC: PropTypes.func,
    selectedPSC: PropTypes.object
};

export default class PSCListContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pscSearchString: '',
            autocompletePSC: [],
            noResults: false
        };

        this.handleTextInput = this.handleTextInput.bind(this);
        this.clearAutocompleteSuggestions = this.clearAutocompleteSuggestions.bind(this);
        this.timeout = null;
    }

    parseAutocompletePSC(psc) {
        const values = [];
        if (psc && psc.length > 0) {
            psc.forEach((item) => {
                values.push({
                    title: `${item.product_or_service_code} - ${item.psc_description}`,
                    subtitle: '',
                    data: item
                });
            });
        }

        this.setState({
            autocompletePSC: values
        });
    }

    queryAutocompletePSC(input) {
        this.setState({
            noResults: false
        });

        // Only search if input is 2 or more characters
        if (input.length >= 2) {
            this.setState({
                pscSearchString: input
            });

            if (this.pscSearchRequest) {
                // A request is currently in-flight, cancel it
                this.pscSearchRequest.cancel();
            }

            const pscSearchParams = {
                search_text: this.state.pscSearchString
            };

            this.pscSearchRequest = SearchHelper.fetchPSC(pscSearchParams);

            this.pscSearchRequest.promise
                .then((res) => {
                    let autocompleteData = [];
                    const data = res.data.results;

                    const selectedPSC =
                        this.props.selectedPSC.toArray().map((psc) => omit(psc, 'identifier'));
                    // Filter out any selectedPSC that may be in the result set
                    if (selectedPSC && selectedPSC.length > 0) {
                        autocompleteData = differenceWith(data, selectedPSC, isEqual);
                    }
                    else {
                        autocompleteData = data;
                    }

                    this.setState({
                        noResults: data.length === 0
                    });

                    // Add search results to Redux
                    this.parseAutocompletePSC(autocompleteData);
                })
                .catch((err) => {
                    if (!isCancel(err)) {
                        this.setState({
                            noResults: true
                        });
                    }
                });
        }
        else if (this.pscSearchRequest) {
            // A request is currently in-flight, cancel it
            this.pscSearchRequest.cancel();
        }
    }

    clearAutocompleteSuggestions() {
        this.setState({
            autocompletePSC: []
        });
    }

    handleTextInput(pscInput) {
        // Clear existing PSC to ensure user can't select an old or existing one
        this.setState({
            autocompletePSC: []
        });

        // Grab input, clear any exiting timeout
        const input = pscInput.target.value;
        window.clearTimeout(this.timeout);

        // Perform search if user doesn't type again for 300ms
        this.timeout = window.setTimeout(() => {
            this.queryAutocompletePSC(input);
        }, 300);
    }

    render() {
        return (
            <Autocomplete
                {...this.props}
                values={this.state.autocompletePSC}
                handleTextInput={this.handleTextInput}
                onSelect={this.props.selectPSC}
                placeholder="e.g., 1510 - Aircraft, Fixed Wing"
                errorHeader="Unknown PSC"
                errorMessage="We were unable to find that PSC."
                ref={(input) => {
                    this.pscList = input;
                }}
                clearAutocompleteSuggestions={this.clearAutocompleteSuggestions}
                noResults={this.state.noResults} />
        );
    }
}

PSCListContainer.propTypes = propTypes;
