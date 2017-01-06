/**
 * SelectedAgencies.jsx
 * Created by Emily Gullo 12/28/2016
 **/

import React from 'react';
import _ from 'lodash';
import ShownAgency from './ShownAgency';

const propTypes = {
    selectedFundingAgencies: React.PropTypes.object,
    selectedAwardingAgencies: React.PropTypes.object,
    removeAgency: React.PropTypes.func,
    agencyType: React.PropTypes.string
};

export default class SelectedAgencies extends React.Component {
    constructor(props) {
        super(props);
        this.formatAgency = this.formatAgency.bind(this);
    }

    formatAgency(ag) {
        let displayValue = '';

        if (ag !== null) {
            displayValue = `${_.startCase(_.toLower(ag))}`;
        }

        return displayValue;
    }

    render() {
        let selected = null;
        let type = null;
        if (this.props.agencyType === "Awarding") {
            selected = this.props.selectedAwardingAgencies;
            type = "Awarding";
        }
        else if (this.props.agencyType === "Funding") {
            selected = this.props.selectedFundingAgencies;
            type = "Funding";
        }
        const shownAgencies = selected.map((agency, key) => (
            <ShownAgency
                agencyType={type}
                agency={this.formatAgency(agency)}
                label={this.formatAgency(agency)}
                key={`_${key}`}
                removeAgency={this.props.removeAgency.bind(null,
                    this.formatAgency(agency), this.props.agencyType)} />
        ));

        return (
            <div className="selected-agencies">
                {shownAgencies}
            </div>
        );
    }
}
SelectedAgencies.propTypes = propTypes;
