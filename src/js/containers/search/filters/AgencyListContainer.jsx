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
    setAutocompleteAgencies: React.PropTypes.func,
    selectAgency: React.PropTypes.func,
    selectedAgencies: React.PropTypes.object,
    agencyType: React.PropTypes.string
};

class AgencyListContainer extends React.Component {
    constructor(props) {
        super(props);

        this.handleTextInput = this.handleTextInput.bind(this);
        this.timeout = null;
    }

    dataFormatter(item) {
        const itemLabel = `<strong>${item}</strong>`;

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
                    const data = res.data;
                    let autocompleteData = [];

                    // Filter out any selectedAgencies that may be in the result set
                    if (this.props.selectedAgencies.size > 0) {
                        autocompleteData = _.differenceWith(data,
                            this.props.selectedAgencies.toArray(), _.isEqual);
                    }
                    else {
                        autocompleteData = data;
                    }
                    // Add search results to Redux
                    this.props.setAutocompleteAgencies(autocompleteData);
                });
        }
    }

    handleTextInput(agencyInput) {
        // Clear existing agencies to ensure user can't select an old or existing one
        this.props.setAutocompleteAgencies([]);

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
                selectedAgencies={this.props.selectedAgencies}
                agencyType={this.props.agencyType} />
        );
    }

}

export default connect(
    (state) => ({ autocompleteAgencies: state.autocompleteAgencies }),
    (dispatch) => bindActionCreators(agencyActions, dispatch)
)(AgencyListContainer);

AgencyListContainer.propTypes = propTypes;
