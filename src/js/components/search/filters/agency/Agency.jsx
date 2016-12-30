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
    selectAgency: React.PropTypes.func,
    removeAgency: React.PropTypes.func,
    selectedAgencies: React.PropTypes.object,
    agencyTypes: React.PropTypes.array
};

export default class Agency extends React.Component {

    render() {
        let selectedAgencies = null;
        if (this.props.selectedAgencies.size > 0) {
            selectedAgencies = (<SelectedAgencies
                selectedAgencies={this.props.selectedAgencies}
                removeAgency={this.props.removeAgency} />);
        }

        const agencies = this.props.agencyTypes.map((type, key) => (
            <AgencyListContainer
                key={key}
                agencyType={type}
                selectedAgencies={this.props.selectedAgencies}
                selectAgency={this.props.selectAgency}
                removeAgency={this.props.removeAgency} />));
        return (
            <div className="agency-filter search-filter">
                {agencies}
                {selectedAgencies}
            </div>
        );
    }
}

Agency.propTypes = propTypes;
Agency.defaultProps = defaultProps;
