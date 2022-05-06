/**
  * AgencyContainer.jsx
  * Created by Emily Gullo 11/30/16
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { is } from 'immutable';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import Agency from 'components/search/filters/agency/Agency';

const propTypes = {
    updateSelectedFundingAgencies: PropTypes.func,
    updateSelectedAwardingAgencies: PropTypes.func,
    selectedFundingAgencies: PropTypes.object,
    selectedAwardingAgencies: PropTypes.object,
    appliedFundingAgencies: PropTypes.object,
    appliedAwardingAgencies: PropTypes.object
};

export class AgencyContainer extends React.Component {
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
        }
    }

    dirtyFilters(type) {
        const stagedKey = `selected${type}Agencies`;
        const appliedKey = `applied${type}Agencies`;

        if (is(this.props[stagedKey], this.props[appliedKey])) {
            return null;
        }
        return Symbol(`dirty ${type} agency`);
    }

    render() {
        return (
            <Agency
                {...this.props}
                dirtyFunding={this.dirtyFilters('Funding')}
                dirtyAwarding={this.dirtyFilters('Awarding')}
                toggleAgency={this.toggleAgency} />
        );
    }
}

AgencyContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        selectedFundingAgencies: state.filters.selectedFundingAgencies,
        selectedAwardingAgencies: state.filters.selectedAwardingAgencies,
        appliedFundingAgencies: state.appliedFilters.filters.selectedFundingAgencies,
        appliedAwardingAgencies: state.appliedFilters.filters.selectedAwardingAgencies
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(AgencyContainer);
