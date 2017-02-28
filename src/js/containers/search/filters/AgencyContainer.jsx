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

    static logFilterEvent() {
        ga.event({
            category: 'Search Filters',
            action: 'Applied Filter',
            label: 'Agency'
        });
    }

    static logAgencyFilterEvent(agencyType) {
        ga.event({
            category: 'Search Agency Filter',
            action: 'Applied Filter',
            label: agencyType
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
            
            AgencyContainer.logFilterEvent();
            AgencyContainer.logAgencyFilterEvent(agencyType);

            if (agencyType === 'Funding') {
                this.props.updateSelectedFundingAgencies(updateParams);
            }
            else {
                this.props.updateSelectedAwardingAgencies(updateParams);
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
