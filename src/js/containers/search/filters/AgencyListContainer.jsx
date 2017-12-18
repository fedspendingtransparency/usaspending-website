/**
* AgencyListContainer.jsx
* Created by Emily Gullo 12/23/2016
**/

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import { filter, sortBy, slice, concat } from 'lodash';

import { Search } from 'js-search';

import Autocomplete from 'components/sharedComponents/autocomplete/Autocomplete';

import * as SearchHelper from 'helpers/searchHelper';

import * as agencyActions from 'redux/actions/search/agencyActions';

const propTypes = {
    setAutocompleteAwardingAgencies: PropTypes.func,
    setAutocompleteFundingAgencies: PropTypes.func,
    fundingAgencies: PropTypes.array,
    awardingAgencies: PropTypes.array,
    toggleAgency: PropTypes.func,
    selectedAgencies: PropTypes.object,
    agencyType: PropTypes.string
};

export class AgencyListContainer extends React.Component {
    constructor(props) {
        super(props);

        this.handleTextInput = this.handleTextInput.bind(this);

        this.state = {
            agencySearchString: '',
            autocompleteAgencies: [],
            noResults: false
        };

        this.handleTextInput = this.handleTextInput.bind(this);
        this.clearAutocompleteSuggestions = this.clearAutocompleteSuggestions.bind(this);
        this.timeout = null;
    }

    componentDidMount() {
        if (this.props.agencyType === 'Funding') {
            this.parseAutocompleteAgencies(this.props.fundingAgencies);
        }
        else {
            this.parseAutocompleteAgencies(this.props.awardingAgencies);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.agencyType === 'Funding') {
            this.parseAutocompleteAgencies(nextProps.fundingAgencies);
        }
        else {
            this.parseAutocompleteAgencies(nextProps.awardingAgencies);
        }
    }

    parseAutocompleteAgencies(results) {
        let agencies = [];
        let noResults = false;

        // Format results of search for use in Autocomplete component
        if (results && results.length > 0) {
            results.forEach((item) => {
                let subAbbreviation = '';
                let topAbbreviation = '';
                if (item.subtier_agency.abbreviation !== '') {
                    subAbbreviation = `(${item.subtier_agency.abbreviation})`;
                }
                if (item.toptier_agency.abbreviation !== '') {
                    topAbbreviation = `(${item.toptier_agency.abbreviation})`;
                }

                // Only push items if they are not in selectedAgencies
                if (item.toptier_flag) {
                    if (this.props.selectedAgencies.size === 0
                        || !this.props.selectedAgencies.has(`${item.id}_toptier`)) {
                        agencies.push({
                            title: `${item.subtier_agency.name} ${topAbbreviation}`,
                            data: Object.assign({}, item, {
                                agencyType: 'toptier'
                            })
                        });
                    }
                }
                else if (this.props.selectedAgencies.size === 0
                    || !this.props.selectedAgencies.has(`${item.id}_subtier`)) {
                    agencies.push({
                        title: `${item.subtier_agency.name} ${subAbbreviation}`,
                        subtitle: `Sub-Agency of ${item.toptier_agency.name} ${topAbbreviation}`,
                        data: Object.assign({}, item, {
                            agencyType: 'subtier'
                        })
                    });
                }
            });

            if (agencies.length === 0) {
                noResults = true;
            }
        }

        // Separate top and subtier agencies
        let toptierAgencies = filter(agencies, ['data.agencyType', 'toptier']);
        let subtierAgencies = filter(agencies, ['data.agencyType', 'subtier']);

        // Sort individual groups alphabetically
        toptierAgencies = sortBy(toptierAgencies, 'title');
        subtierAgencies = sortBy(subtierAgencies, 'title');

        agencies = slice(concat(toptierAgencies, subtierAgencies), 0, 10);

        this.setState({
            autocompleteAgencies: agencies,
            noResults
        });
    }

    queryAutocompleteAgencies(input) {
        this.setState({
            noResults: false
        });

        // Only search if search is 2 or more characters
        if (input.length >= 2) {
            this.setState({
                agencySearchString: input
            });

            if (this.agencySearchRequest) {
                // A request is currently in-flight, cancel it
                this.agencySearchRequest.cancel();
            }

            const agencySearchParams = {
                search_text: this.state.agencySearchString,
                limit: 20
            };

            if (this.props.agencyType === 'Funding') {
                this.agencySearchRequest = SearchHelper.fetchFundingAgencies(agencySearchParams);
            }
            else {
                this.agencySearchRequest = SearchHelper.fetchAwardingAgencies(agencySearchParams);
            }

            this.agencySearchRequest.promise
                .then((res) => {
                    this.performSecondarySearch(res.data.results);
                })
                .catch((err) => {
                    if (!isCancel(err)) {
                        this.setState({
                            noResults: true
                        });
                    }
                });
        }
        else if (this.agencySearchRequest) {
            // A request is currently in-flight, cancel it
            this.agencySearchRequest.cancel();
        }
    }

    performSecondarySearch(data) {
        // search within the returned data
        // create a search index with the API response records
        const search = new Search('id');
        search.addIndex(['toptier_agency', 'name']);
        search.addIndex(['subtier_agency', 'name']);
        search.addIndex(['toptier_agency', 'abbreviation']);
        search.addIndex(['subtier_agency', 'abbreviation']);

        // add the API response as the data source to search within
        search.addDocuments(data);

        // use the JS search library to search within the records
        const results = search.search(this.state.agencySearchString);
        const toptier = [];
        const subtier = [];

        // re-group the responses by top tier and subtier
        results.forEach((item) => {
            if (item.toptier_flag) {
                toptier.push(item);
            }
            else {
                subtier.push(item);
            }
        });

        // combine the two arrays and limit it to 10
        const improvedResults = slice(concat(toptier, subtier), 0, 10);

        // Add search results to Redux
        if (this.props.agencyType === 'Funding') {
            this.props.setAutocompleteFundingAgencies(improvedResults);
        }
        else {
            this.props.setAutocompleteAwardingAgencies(improvedResults);
        }

        this.setState({
            noResults: improvedResults.length === 0
        });
    }

    clearAutocompleteSuggestions() {
        if (this.props.agencyType === 'Funding') {
            this.props.setAutocompleteFundingAgencies([]);
        }
        else {
            this.props.setAutocompleteAwardingAgencies([]);
        }
    }

    handleTextInput(agencyInput) {
        // Clear existing agencies to ensure user can't select an old or existing one
        if (this.props.agencyType === 'Funding' && this.props.fundingAgencies.length > 0) {
            this.props.setAutocompleteFundingAgencies([]);
        }
        else if (this.props.agencyType === 'Awarding' && this.props.awardingAgencies.length > 0) {
            this.props.setAutocompleteAwardingAgencies([]);
        }

        // Grab input, clear any exiting timeout
        const input = agencyInput.target.value;
        window.clearTimeout(this.timeout);

        // Perform search if user doesn't type again for 300ms
        this.timeout = window.setTimeout(() => {
            this.queryAutocompleteAgencies(input);
        }, 300);
    }

    toggleAgency(agency, valid) {
        // Pass selected agency to parent toggleAgency method, adding agencyType to method call
        this.props.toggleAgency(agency, valid, this.props.agencyType);

        // Clear Autocomplete results
        if (this.props.agencyType === 'Funding') {
            this.props.setAutocompleteFundingAgencies([]);
        }
        else {
            this.props.setAutocompleteAwardingAgencies([]);
        }
    }

    render() {
        return (
            <Autocomplete
                {...this.props}
                values={this.state.autocompleteAgencies}
                handleTextInput={this.handleTextInput}
                onSelect={this.toggleAgency.bind(this)}
                placeholder={`${this.props.agencyType} Agency`}
                errorHeader="Unknown Agency"
                errorMessage="We were unable to find that agency."
                ref={(input) => {
                    this.agencyList = input;
                }}
                label={`${this.props.agencyType} Agency`}
                clearAutocompleteSuggestions={this.clearAutocompleteSuggestions}
                noResults={this.state.noResults} />
        );
    }
}

AgencyListContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        fundingAgencies: state.autocompleteAgencies.fundingAgencies,
        awardingAgencies: state.autocompleteAgencies.awardingAgencies }),
    (dispatch) => bindActionCreators(agencyActions, dispatch)
)(AgencyListContainer);
