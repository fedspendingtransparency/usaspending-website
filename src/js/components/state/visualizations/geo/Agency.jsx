/**
 * StateProfileAgency.jsx
 * Created by Nick Torres 8/9/2024
 **/

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AgencyListContainer from 'containers/search/filters/AgencyListContainer';
import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';

import SelectedAgencies from './SelectedAgencies';

const defaultProps = {
    agencyTypes: [
        "Awarding"
    ]
};

const propTypes = {
    toggleAgency: PropTypes.func,
    selectedAwardingAgencies: PropTypes.object,
    selectedFundingAgencies: PropTypes.object,
    agencyTypes: PropTypes.array,
    dirtyFunding: PropTypes.symbol,
    dirtyAwarding: PropTypes.symbol
};

const StateProfileAgency = (props) => {
    const [hint, setHint] = useState(null);
    let showHint = false;
    useEffect(() => {
        if (props.dirtyAwarding) {
            showHint = true;
        }

        if (showHint && hint) {
            hint.showHint();
        }
    }, [props.dirtyAwarding]);

    const agencies = props.agencyTypes.map((type) => {
        let selectedAgencies = {};

        selectedAgencies = props.selectedAwardingAgencies;

        return (
            <div className="filter-item-wrap" key={`holder-${type}`}>
                <AgencyListContainer
                    agencyType={type}
                    toggleAgency={props.toggleAgency}
                    selectedAgencies={selectedAgencies} />
                <SelectedAgencies
                    agencyType={type}
                    selectedAgencies={selectedAgencies}
                    toggleAgency={props.toggleAgency} />
                <SubmitHint
                    ref={(component) => {
                        setHint(component);
                    }} />
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
