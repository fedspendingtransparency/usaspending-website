/**
  * AgencyContainer.jsx
  * Created by Emily Gullo 11/30/16
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import Agency from 'components/search/filters/agency/Agency';

const propTypes = {
    updateSelectedFundingAgencies: React.PropTypes.func,
    updateSelectedAwardingAgencies: React.PropTypes.func
};

const ga = require('react-ga');

export class AgencyContainer extends React.Component {

    static logAgencyFilterEvent(agencyType, agency) {
        ga.event({
            category: 'Search Page Filters',
            action: `Applied ${agencyType} Agency Filter`,
            label: agency.toLowerCase()
        });
    }

    constructor(props) {
        super(props);

        // Bind functions
        this.toggleAgency = this.toggleAgency.bind(this);
    }

    toggleAgency(agency, isValid, agencyType) {
        // If agency name exists and is valid
        if (agency !== null && isValid) {
            const updateParams = {};
            updateParams.agency = agency;

            if (agencyType === 'Funding') {
                this.props.updateSelectedFundingAgencies(updateParams);
            }
            else {
                this.props.updateSelectedAwardingAgencies(updateParams);
            }

            // Analytics

            if (agency.agencyType === 'subtier') {
                AgencyContainer.logAgencyFilterEvent(agencyType, agency.subtier_agency.name);
            }
            else {
                AgencyContainer.logAgencyFilterEvent(agencyType, agency.toptier_agency.name);
            }
        }
    }

    render() {
        return (
            <Agency
                {...this.props}
                toggleAgency={this.toggleAgency} />
        );
    }
}

AgencyContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        selectedFundingAgencies: state.filters.selectedFundingAgencies,
        selectedAwardingAgencies: state.filters.selectedAwardingAgencies }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(AgencyContainer);
