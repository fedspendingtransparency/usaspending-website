/**
 * StateProfileAgency.jsx
 * Created by Nick Torres 8/9/2024
 **/

import React from 'react';
import PropTypes from 'prop-types';
import StateAgencyListContainer from './StateAgencyListContainer';

const defaultProps = {
    agencyTypes: [
        "Awarding"
    ]
};

const propTypes = {
    toggleAgency: PropTypes.func,
    selectedAwardingAgencies: PropTypes.object,
    agencyTypes: PropTypes.array,
    dirtyAwarding: PropTypes.symbol
};

const StateProfileAgency = (props) => {
    const agencies = props.agencyTypes.map((type) => {
        let selectedAgencies = {};
        selectedAgencies = props.selectedAwardingAgencies;

        return (
            <div className="filter-item-wrap" key={`holder-${type}`}>
                <StateAgencyListContainer
                    {...props}
                    agencyType={type}
                    placeHolder="Search for an awarding agency..."
                    toggleAgency={props.toggleAgency}
                    selectedAgencies={selectedAgencies} />
            </div>
        );
    });

    return (
        <div className="agency-filter">
            {agencies}
        </div>
    );
};

StateProfileAgency.propTypes = propTypes;
StateProfileAgency.defaultProps = defaultProps;
export default StateProfileAgency;
