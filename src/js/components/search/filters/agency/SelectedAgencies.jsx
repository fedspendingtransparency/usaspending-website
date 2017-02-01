/**
 * SelectedAgencies.jsx
 * Created by Emily Gullo 12/28/2016
 **/

import React from 'react';
import _ from 'lodash';
import ShownAgency from './ShownAgency';

const propTypes = {
    selectedAgencies: React.PropTypes.object,
    removeAgency: React.PropTypes.func,
    agencyType: React.PropTypes.string
};

export default class SelectedAgencies extends React.Component {
    constructor(props) {
        super(props);
        this.formatAgency = this.formatAgency.bind(this);
    }

    formatAgency(ag) {
        const agency = ag;
        let displayValue = `${agency.subtier_agency.name}`;

        if (agency.toptier_agency.name !== agency.subtier_agency.name) {
            displayValue += ` | ${_.startCase(_.toLower(agency.toptier_agency.name))}`;
        }

        return displayValue;
    }

    render() {
        const shownAgencies = [];
        this.props.selectedAgencies.entrySeq().forEach((entry) => {
            const key = entry[0];
            const agency = entry[1];
            const value = (<ShownAgency
                agency={agency}
                label={this.formatAgency(agency)}
                key={key}
                removeAgency={this.props.removeAgency.bind(
                    null, agency, this.props.agencyType)} />);
            shownAgencies.push(value);
        });

        return (
            <div className={`selected-agencies ${_.toLower(this.props.agencyType)}`}>
                {shownAgencies}
            </div>
        );
    }
}
SelectedAgencies.propTypes = propTypes;
