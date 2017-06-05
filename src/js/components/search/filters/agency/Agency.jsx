/**
 * Agency.jsx
 * Created by Emily Gullo 12/22/2016
 **/

import React from 'react';
import AgencyListContainer from 'containers/search/filters/AgencyListContainer';
import SelectedAgencies from './SelectedAgencies';

const defaultProps = {
    agencyTypes: [
        "Funding",
        "Awarding"
    ]
};

const propTypes = {
    toggleAgency: React.PropTypes.func,
    selectedAwardingAgencies: React.PropTypes.object,
    selectedFundingAgencies: React.PropTypes.object,
    agencyTypes: React.PropTypes.array
};

export default class Agency extends React.Component {
    render() {
        const agencies = this.props.agencyTypes.map((type) => {
            let selectedAgencies = {};

            if (type === 'Funding') {
                selectedAgencies = this.props.selectedFundingAgencies;
            }
            else {
                selectedAgencies = this.props.selectedAwardingAgencies;
            }

            return (
                <div className="filter-item-wrap" key={`holder-${type}`}>
                    <AgencyListContainer
                        agencyType={type}
                        toggleAgency={this.props.toggleAgency}
                        selectedAgencies={selectedAgencies} />
                    <SelectedAgencies
                        agencyType={type}
                        selectedAgencies={selectedAgencies}
                        toggleAgency={this.props.toggleAgency} />
                </div>
            );
        });

        return (
            <div className="agency-filter">
                {agencies}
            </div>
        );
    }
}

Agency.propTypes = propTypes;
Agency.defaultProps = defaultProps;
