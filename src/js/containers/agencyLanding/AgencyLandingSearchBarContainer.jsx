/**
 * AgencyLandingSearchBarContainer.jsx
 * Created by Lizzie Salita 7/24/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import { Search } from 'js-search';

import * as agencyLandingActions from 'redux/actions/agencyLanding/agencyLandingActions';
import * as AgencyLandingHelper from 'helpers/agencyLandingHelper';

import AgencyLandingSearchBar from 'components/agencyLanding/AgencyLandingSearchBar';

const propTypes = {
    setAgencySearchString: PropTypes.func,
    setNoResults: PropTypes.func,
    setAutocompleteAgencies: PropTypes.func,
    autocompleteAgencies: PropTypes.array
};

export class AgencyLandingSearchBarContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inFlight: false,
            autocompleteAgencies: [],
            noResults: false,
            agencySearchString: ''
        };

        this.agencySearchRequest = null;
        this.handleTextInput = this.handleTextInput.bind(this);
        this.timeout = null;
    }

    componentWillUnmount() {
        if (this.agencySearchRequest) {
            this.agencySearchRequest.cancel();
        }
    }

    handleTextInput(agencyInput) {
        // Clear existing agencies
        this.props.setAutocompleteAgencies([]);
        if (agencyInput === '') {
            this.props.setNoResults(false);
        }

        // Grab input, clear any exiting timeout
        const input = agencyInput.target.value;
        window.clearTimeout(this.timeout);

        // Perform search if user doesn't type again for 300ms
        this.timeout = window.setTimeout(() => {
            this.queryAutocompleteAgencies(input);
        }, 300);
    }

    queryAutocompleteAgencies(input) {
        this.props.setNoResults(false);

        if (this.agencySearchRequest) {
            // A request is currently in-flight, cancel it
            this.agencySearchRequest.cancel();
        }

        // Only search if input is 2 or more characters
        if (input.length >= 2) {
            this.props.setAgencySearchString(input);
            this.setState({
                agencySearchString: input
            });

            const agencySearchParams = {
                search_text: input
            };

            this.agencySearchRequest = AgencyLandingHelper.fetchSearchResults(agencySearchParams);

            this.agencySearchRequest.promise
                .then((res) => {
                    this.performSecondarySearch(res.data.results);
                })
                .catch((err) => {
                    if (!isCancel(err)) {
                        this.props.setNoResults(true);
                    }
                });
        }
        else {
            this.props.setAgencySearchString('');
            this.setState({
                agencySearchString: ''
            });
        }
    }

    performSecondarySearch(data) {
        // Search within the returned data
        // Create a search index with the API response records
        const search = new Search('agency_id');
        search.addIndex('agency_name');

        // Add the API response as the data source to search within
        search.addDocuments(data);

        // Use the JS search library to search within the records
        const results = search.search(this.state.agencySearchString);

        const matchedAgencyIds = [];
        results.forEach((item) => {
            matchedAgencyIds.push(item.agency_id);
        });

        // Add search results to Redux
        this.props.setAutocompleteAgencies(
            matchedAgencyIds
        );

        this.props.setNoResults(matchedAgencyIds.length === 0);
    }

    render() {
        return (
            <AgencyLandingSearchBar
                handleTextInput={this.handleTextInput} />
        );
    }
}

AgencyLandingSearchBarContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        autocompleteAgencies: state.agencyLanding.autocompleteAgencies
    }),
    (dispatch) => bindActionCreators(agencyLandingActions, dispatch)
)(AgencyLandingSearchBarContainer);
