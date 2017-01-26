/**
  * AgencyContainer.jsx
  * Created by Emily Gullo 11/30/16
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import Agency from 'components/search/filters/agency/Agency';

class AgencyContainer extends React.Component {
    constructor(props) {
        super(props);

        // Bind functions
        this.selectAgency = this.selectAgency.bind(this);
        this.removeAgency = this.removeAgency.bind(this);
    }

    selectAgency(agency, isValid, agencyType) {
        // If agency name exists and is valid
        if (agency !== null && isValid) {
            const updateParams = {};
            const updateValue = `updateSelected${agencyType}Agencies`;
            const agencyValue = `${_.toLower(agencyType)}Agency`;
            updateParams[agencyValue] = agency;
            this.props[updateValue](updateParams);
        }
    }

    removeAgency(agency, agencyType) {
        const updateParams = {};
        const agencyValue = `${_.toLower(agencyType)}Agency`;
        const updateValue = `updateSelected${agencyType}Agencies`;
        updateParams[agencyValue] = agency;
        this.props[updateValue](updateParams);
    }

    render() {
        return (
            <Agency
                {...this.props}
                selectAgency={this.selectAgency}
                removeAgency={this.removeAgency} />
        );
    }
}

export default connect(
    (state) => ({
        selectedFundingAgencies: state.filters.selectedFundingAgencies,
        selectedAwardingAgencies: state.filters.selectedAwardingAgencies }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(AgencyContainer);
