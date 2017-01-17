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

const propTypes = {
    updateSelectedAgencies: React.PropTypes.func
};

class AgencyContainer extends React.Component {
    constructor(props) {
        super(props);

        // Bind functions
        this.updateAgency = this.updateAgency.bind(this);
    }

    updateAgency(agency, isValid, agencyType) {
        // If agency name exists and is valid
        if (agency !== null && isValid) {
            const updateParams = {};
            const agencyValue = `${_.toLower(agencyType)}Agency`;
            updateParams[agencyValue] = agency;
            this.props.updateSelectedAgencies(updateParams);
        }
    }

    removeAgency(agency, agencyType) {
        const updateParams = {};
        if (agencyType === "Awarding") {
            updateParams.awardingAgency = agency;
            this.props.updateSelectedAgencies(updateParams);
        }
        else if (agencyType === "Funding") {
            updateParams.fundingAgency = agency;
            this.props.updateSelectedAgencies(updateParams);
        }
    }

    render() {
        return (
            <Agency
                {...this.props}
                updateAgency={this.updateAgency} />
        );
    }
}

AgencyContainer.propTypes = propTypes;

export default connect(
    (state) => ({ selectedFundingAgencies: state.filters.selectedFundingAgencies,
        selectedAwardingAgencies: state.filters.selectedAwardingAgencies }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(AgencyContainer);
