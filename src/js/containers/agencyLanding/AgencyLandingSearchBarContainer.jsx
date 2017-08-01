/**
 * AgencyLandingSearchBarContainer.jsx
 * Created by Lizzie Salita 7/24/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Search } from 'js-search';
import Immutable from 'immutable';
import reactStringReplace from 'react-string-replace';

import * as agencyLandingActions from 'redux/actions/agencyLanding/agencyLandingActions';

import AgencyLandingSearchBar from 'components/agencyLanding/AgencyLandingSearchBar';

const propTypes = {
    setAgencySearchString: PropTypes.func,
    setNoResults: PropTypes.func,
    setAutocompleteAgencies: PropTypes.func,
    autocompleteAgencies: PropTypes.array,
    agencies: PropTypes.instanceOf(Immutable.OrderedSet)
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
            this.performSecondarySearch(input);
        }, 300);
    }

    performSecondarySearch(input) {
        // Only search if input is 2 or more characters
        if (input.length >= 2) {
            this.props.setAgencySearchString(input);
            this.setState({
                agencySearchString: input
            });

            // Convert agency Records to objects
            const data = [];
            this.props.agencies.forEach((agency) => {
                const agencyObject = agency.toJS();
                data.push(agencyObject);
            });

            // Create a search index with the API response records
            const search = new Search('agency_id');
            search.addIndex('agency_name');

            // Add the API response as the data source to search within
            search.addDocuments(data);

            // Use the JS search library to search within the records
            const results = search.search(this.state.agencySearchString);

            const matchedAgencies = [];
            results.forEach((item) => {
                // highlight the matched substring
                const updatedName = reactStringReplace(item.agency_name, this.state.agencySearchString, (match, i) => (
                    <span key={match + i}>{match}</span>
                ));
                const updatedItem = Object.assign({}, item, {
                    agency_name: updatedName
                });

                matchedAgencies.push(updatedItem);
            });

            // Add search results to Redux
            this.props.setAutocompleteAgencies(
                matchedAgencies
            );

            this.props.setNoResults(matchedAgencies.length === 0);
        }
        else {
            this.props.setNoResults(false);
            this.props.setAgencySearchString('');
            this.setState({
                agencySearchString: ''
            });
        }
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
        agencies: state.agencyLanding.agencies,
        autocompleteAgencies: state.agencyLanding.autocompleteAgencies
    }),
    (dispatch) => bindActionCreators(agencyLandingActions, dispatch)
)(AgencyLandingSearchBarContainer);
