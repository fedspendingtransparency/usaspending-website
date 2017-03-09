/**
* AgenciesListContainer.jsx
* Created by Emily Gullo 12/23/2016
**/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import Autocomplete from 'components/sharedComponents/autocomplete/Autocomplete';

import * as SearchHelper from 'helpers/searchHelper';

import * as agencyActions from 'redux/actions/search/agencyActions';

const propTypes = {
    setAutocompleteAwardingAgencies: React.PropTypes.func,
    setAutocompleteFundingAgencies: React.PropTypes.func,
    fundingAgencies: React.PropTypes.array,
    awardingAgencies: React.PropTypes.array,
    toggleAgency: React.PropTypes.func,
    selectedAgencies: React.PropTypes.object,
    agencyType: React.PropTypes.string
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
        const agencies = [];

        // Format results of search for use in Autocomplete component
        if (results && results.length > 0) {
            results.forEach((item) => {
                // Push two items to the autocomplete entries if subtier = toptier
                // Only push items if they are not in selectedAgencies
                if (item.toptier_agency.name === item.subtier_agency.name) {
                    if (this.props.selectedAgencies.size === 0
                        || !this.props.selectedAgencies.has(`${item.id}_toptier`)) {
                        agencies.push({
                            title: item.subtier_agency.name,
                            data: Object.assign({}, item, {
                                agencyType: 'toptier'
                            })
                        });
                    }
                }

                if (this.props.selectedAgencies.size === 0
                    || !this.props.selectedAgencies.has(`${item.id}_subtier`)) {
                    agencies.push({
                        title: item.subtier_agency.name,
                        subtitle: `Sub-Agency of ${item.toptier_agency.name}`,
                        data: Object.assign({}, item, {
                            agencyType: 'subtier'
                        })
                    });
                }
            });

            if (agencies.length === 0) {
                this.setState({
                    noResults: true
                });
            }
        }

        this.setState({
            autocompleteAgencies: agencies
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
                fields: ['subtier_agency__name'],
                value: this.state.agencySearchString,
                mode: "contains",
                matched_objects: true,
                limit: 10
            };

            this.agencySearchRequest = SearchHelper.fetchAgencies(agencySearchParams);

            this.agencySearchRequest.promise
                .then((res) => {
                    this.setState({
                        noResults: !res.data.matched_objects.subtier_agency__name.length
                    });

                    // Add search results to Redux
                    if (this.props.agencyType === 'Funding') {
                        this.props.setAutocompleteFundingAgencies(
                            res.data.matched_objects.subtier_agency__name
                        );
                    }
                    else {
                        this.props.setAutocompleteAwardingAgencies(
                            res.data.matched_objects.subtier_agency__name
                        );
                    }
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
        if (this.props.agencyType === 'Funding') {
            this.props.setAutocompleteFundingAgencies([]);
        }
        else {
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
                placeHolder={this.props.agencyType}
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
