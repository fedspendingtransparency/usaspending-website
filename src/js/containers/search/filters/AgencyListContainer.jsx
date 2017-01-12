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
import * as autocompleteActions from 'redux/actions/search/autocompleteActions';

const propTypes = {
    setAutocompleteAwardingAgencies: React.PropTypes.func,
    setAutocompleteFundingAgencies: React.PropTypes.func,
    selectAgency: React.PropTypes.func,
    selectedAwardingAgencies: React.PropTypes.object,
    selectedFundingAgencies: React.PropTypes.object,
    agencyType: React.PropTypes.string
};

class AgencyListContainer extends React.Component {
    constructor(props) {
        super(props);

        this.handleTextInput = this.handleTextInput.bind(this);
    }

    dataFormatter(item) {
        const itemLabel = `<b>${item}</b>`;

        return {
            label: itemLabel,
            value: item
        };
    }

    queryAutocompleteAgencies(input) {
        // Only search if search is 2 or more characters
        if (input.length >= 2 || input.length === 0) {
            if (this.agencySearchRequest) {
                // A request is currently in-flight, cancel it
                this.agencySearchRequest.cancel();
            }

            let fieldType = [];

            if (this.props.agencyType === "Awarding") {
                fieldType = ["awarding_agency__name"];
            }
            else {
                fieldType = ["funding_agency__name"];
            }

            const agencySearchParams = {
                fields: fieldType,
                value: input,
                mode: "contains"
            };

            this.agencySearchRequest = SearchHelper.fetchAgencies(agencySearchParams);

            this.agencySearchRequest.promise
                .then((res) => {
                    const data = res.data.results;
                    let autocompleteData = [];
                    // Filter out any selectedAgencies that may be in the result set
                    if (this.props.agencyType === "Awarding") {
                        if (this.props.selectedAwardingAgencies.size > 0) {
                            autocompleteData = _.differenceWith(data.awarding_agency__name,
                                this.props.selectedAwardingAgencies.toArray(), _.isEqual);
                            this.props.setAutocompleteAwardingAgencies(autocompleteData);
                        }
                        else {
                            this.props.setAutocompleteAwardingAgencies(data.awarding_agency__name);
                        }
                    }
                    else if (this.props.agencyType === "Funding") {
                        if (this.props.selectedFundingAgencies.size > 0) {
                            autocompleteData = _.differenceWith(data.funding_agency__name,
                                this.props.selectedFundingAgencies.toArray(), _.isEqual);
                            this.props.setAutocompleteFundingAgencies(autocompleteData);
                        }
                        else {
                            this.props.setAutocompleteFundingAgencies(data.funding_agency__name);
                        }
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
        return (
            <AgencyList
                {...this.props}
                formatter={this.dataFormatter}
                handleTextInput={this.handleTextInput}
                onSelect={this.props.selectAgency}
                placeHolder={this.props.agencyType}
                selectedFundingAgencies={this.props.selectedFundingAgencies}
                selectedAwardingAgencies={this.props.selectedAwardingAgencies}
                agencyType={this.props.agencyType} />
        );
    }

}

export default connect(
    (state) => ({ autocompleteAwardingAgencies: state.autocompleteAwardingAgencies,
        autocompleteFundingAgencies: state.autocompleteFundingAgencies }),
    (dispatch) => bindActionCreators(autocompleteActions, dispatch)
)(AgencyListContainer);

AgencyListContainer.propTypes = propTypes;
