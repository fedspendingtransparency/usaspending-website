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
    updateSelectedAgencies: React.PropTypes.func
};

class AgencyContainer extends React.Component {
    constructor(props) {
        super(props);

        // Bind functions
        this.selectAgency = this.selectAgency.bind(this);
        this.removeAgency = this.removeAgency.bind(this);
    }

    selectAgency(agency, isValid) {
        // If agency name exists and is valid
        if (agency !== null && isValid) {
            const updateParams = {};
            updateParams.agency = agency;

            this.props.updateSelectedAgencies(updateParams);
        }
    }

    removeAgency(agency) {
        const updateParams = {};
        updateParams.agency = agency;
        this.props.updateSelectedAgencies(updateParams);
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

AgencyContainer.propTypes = propTypes;

export default connect(
    (state) => ({ selectedAgencies: state.filters.selectedAgencies }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(AgencyContainer);
