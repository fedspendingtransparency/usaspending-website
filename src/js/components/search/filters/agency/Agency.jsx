/**
 * Agency.jsx
 * Created by Emily Gullo 12/22/2016
 **/

import React from 'react';
import AgencyListContainer from 'containers/search/filters/AgencyListContainer';

const defaultProps = {
    agencyTypes: [
        "Funding",
        "Awarding"
    ]
};

const propTypes = {
    selectAgency: React.PropTypes.func,
    removeAgency: React.PropTypes.func,
    selectedAwardingAgencies: React.PropTypes.object,
    selectedFundingAgencies: React.PropTypes.object,
    agencyTypes: React.PropTypes.array
};

export default class Agency extends React.Component {

    render() {
        const agencies = this.props.agencyTypes.map((type, key) => (
            <AgencyListContainer
                key={key}
                agencyType={type}
                selectedFundingAgencies={this.props.selectedFundingAgencies}
                selectedAwardingAgencies={this.props.selectedAwardingAgencies}
                selectAgency={this.props.selectAgency}
                removeAgency={this.props.removeAgency} />));

        return (
            <div className="agency-filter search-filter">
                {agencies}
            </div>
        );
    }
}

Agency.propTypes = propTypes;
Agency.defaultProps = defaultProps;
