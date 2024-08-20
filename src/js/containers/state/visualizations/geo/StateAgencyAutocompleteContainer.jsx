/**
  * StateAgencyAutocompleteContainer.jsx
  * Created by Nick Torres 8/9/2024
  **/

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect, useSelector } from 'react-redux';
import { is } from 'immutable';
import * as appliedFilterActions from 'redux/actions/search/appliedFilterActions';
import * as searchFilterActions from 'redux/actions/search/searchFilterActions';
import StateProfileAgency from '../../../../components/state/visualizations/geo/StateProfileAgency';

const combinedActions = Object.assign({}, appliedFilterActions, searchFilterActions);
const propTypes = {
    updateSelectedAwardingAgencies: PropTypes.func,
    selectedAwardingAgencies: PropTypes.object,
    appliedAwardingAgencies: PropTypes.object
};

const StateAgencyAutocompleteContainer = (props) => {
    const filters = useSelector((state) => state.filters);
    const toggleAgency = (agency, isValid, agencyType) => {
    // If agency name exists and is valid
        if (agency !== null && isValid) {
            const updateParams = {};
            updateParams.agency = agency;

            if (agencyType === 'Awarding') {
                props.updateSelectedAwardingAgencies(updateParams);
            }
        }
    };

    const dirtyFilters = (type) => {
        const stagedKey = `selected${type}Agencies`;
        const appliedKey = `applied${type}Agencies`;

        if (is(props[stagedKey], props[appliedKey])) {
            return null;
        }
        return Symbol(`dirty ${type} agency`);
    };

    useEffect(() => {
        appliedFilterActions.applyStagedFilters(filters);
    }, [filters]);

    return (
        <StateProfileAgency
            {...props}
            dirtyAwarding={dirtyFilters('Awarding')}
            toggleAgency={toggleAgency} />
    );
};

StateAgencyAutocompleteContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        selectedAwardingAgencies: state.filters.selectedAwardingAgencies,
        appliedAwardingAgencies: state.appliedFilters.filters?.selectedAwardingAgencies
    }),
    (dispatch) => bindActionCreators(combinedActions, dispatch)
)(StateAgencyAutocompleteContainer);
