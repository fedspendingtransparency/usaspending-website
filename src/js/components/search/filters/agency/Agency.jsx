/**
 * Agency.jsx
 * Created by Emily Gullo 12/22/2016
 **/

import React from 'react';
import PropTypes from 'prop-types';

import AgencyListContainer from 'containers/search/filters/AgencyListContainer';
import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';
import SelectedAgencies from './SelectedAgencies';

const propTypes = {
    toggleAgency: PropTypes.func,
    selectedAwardingAgencies: PropTypes.object,
    selectedFundingAgencies: PropTypes.object,
    agencyTypes: PropTypes.array,
    dirtyFunding: PropTypes.symbol,
    dirtyAwarding: PropTypes.symbol,
    searchV2: PropTypes.bool
};

const Agency = ({
    toggleAgency,
    selectedAwardingAgencies,
    selectedFundingAgencies,
    agencyTypes = [
        "Awarding",
        "Funding"
    ],
    dirtyFunding,
    dirtyAwarding,
    searchV2
}) => {
    const agencies = agencyTypes.map((type) => {
        let selectedAgencies = {};

        if (type === 'Funding') {
            selectedAgencies = selectedFundingAgencies;
        }
        else {
            selectedAgencies = selectedAwardingAgencies;
        }

        return (
            <div className="filter-item-wrap" key={`holder-${type}`}>
                <AgencyListContainer
                    agencyType={type}
                    toggleAgency={toggleAgency}
                    selectedAgencies={selectedAgencies} />
                <SelectedAgencies
                    agencyType={type}
                    selectedAgencies={selectedAgencies}
                    toggleAgency={toggleAgency} />
                { !searchV2 && type === 'Funding' &&
                    <SubmitHint selectedFilters={[dirtyAwarding, dirtyFunding]} />
                }
            </div>
        );
    });

    return (
        <div className="agency-filter">
            {agencies}
        </div>
    );
};

Agency.propTypes = propTypes;
export default Agency;
