/**
* AgenciesListContainer.jsx
* Created by Emily Gullo 12/23/2016
**/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import AgencyList from 'components/search/filters/agency/AgencyList';

import * as SearchHelper from 'helpers/searchHelper';
import * as agencyActions from 'redux/actions/search/agencyActions';

const propTypes = {
    setAutocompleteAwardingAgencies: React.PropTypes.func,
    setAutocompleteFundingAgencies: React.PropTypes.func,
    fundingAgencies: React.PropTypes.array,
    awardingAgencies: React.PropTypes.array,
    selectAgency: React.PropTypes.func,
    selectedAgencies: React.PropTypes.object,
    agencyType: React.PropTypes.string
};

export class AgencyListContainer extends React.Component {
    constructor(props) {
        super(props);

        this.handleTextInput = this.handleTextInput.bind(this);

        this.autocompleteAgencies = [];
    }

    dataFormatter(item) {
        let itemLabel = `<b>${item.subtier_agency.name}</b>`;
        if (item.toptier_agency.name !== item.subtier_agency.name) {
            itemLabel += `<br>Sub-Agency of ${item.toptier_agency.name}`;
        }

        return {
            label: itemLabel,
            value: item.subtier_agency.name
        };
    }

    parseAutocompleteAgencies(results) {
        const values = [];

        if (results.length > 0) {
            results.forEach((item) => {
                // Push two items to the autocomplete entries if subtier = toptier
                if (item.toptier_agency.name === item.subtier_agency.name) {
                    values.push({
                        title: item.subtier_agency.name,
                        data: item,
                        type: 'toptier'
                    });
                }

                values.push({
                    title: item.subtier_agency.name,
                    subtitle: `Sub-Agency of ${item.toptier_agency.name}`,
                    data: item,
                    type: 'subtier'
                });
            });
        }

        return values;
    }

    queryAutocompleteAgencies(input) {
        // Only search if search is 2 or more characters
        if (input.length >= 2 || input.length === 0) {
            if (this.agencySearchRequest) {
                // A request is currently in-flight, cancel it
                this.agencySearchRequest.cancel();
            }

            const agencySearchParams = {
                fields: ['subtier_agency__name'],
                value: input,
                mode: "contains",
                matched_objects: true,
                limit: 10
            };

            this.agencySearchRequest = SearchHelper.fetchAgencies(agencySearchParams);

            this.agencySearchRequest.promise
                .then((res) => {
                    const results = this.parseAutocompleteAgencies(
                        res.data.matched_objects.subtier_agency__name
                    );

                    let autocompleteData = null;

                    // Filter out any selectedAgencies that may be in the result set
                    if (this.props.selectedAgencies.size > 0) {
                        autocompleteData = _.differenceWith(results,
                            this.props.selectedAgencies.toArray(), _.isEqual);
                    }
                    else {
                        autocompleteData = results;
                    }

                    if (this.props.agencyType === 'Funding') {
                        this.props.setAutocompleteFundingAgencies(autocompleteData);
                    }
                    else {
                        this.props.setAutocompleteAwardingAgencies(autocompleteData);
                    }
                });
        }
    }

    handleTextInput(agencyInput) {
        // Clear existing agencies to ensure user can't select an old or existing one

        // Grab input, clear any exiting timeout
        const input = agencyInput.target.value;
        window.clearTimeout(this.timeout);

        // Perform search if user doesn't type again for 300ms
        this.timeout = window.setTimeout(() => {
            this.queryAutocompleteAgencies(input);
        }, 300);
    }

    render() {
        if (this.props.agencyType === 'Funding') {
            this.autocompleteAgencies = this.props.fundingAgencies;
        }
        else {
            this.autocompleteAgencies = this.props.awardingAgencies;
        }

        return (
            <AgencyList
                {...this.props}
                formatter={this.dataFormatter}
                handleTextInput={this.handleTextInput}
                onSelect={this.props.selectAgency}
                placeHolder={this.props.agencyType}
                autocompleteAgencies={this.autocompleteAgencies}
                selectedAgencies={this.props.selectedAgencies}
                agencyType={this.props.agencyType} />
        );
    }
}

AgencyListContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        fundingAgencies: state.agency.fundingAgencies,
        awardingAgencies: state.agency.awardingAgencies }),
    (dispatch) => bindActionCreators(agencyActions, dispatch)
)(AgencyListContainer);
