/**
 * SelectedAgencies.jsx
 * Created by Emily Gullo 12/28/2016
 **/

import React from 'react';
import _ from 'lodash';
import ShownAgency from './ShownAgency';

const propTypes = {
    selectedAgencies: React.PropTypes.object,
    updateAgency: React.PropTypes.func,
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
        const type = this.props.agencyType;
        selected = this.props.selectedAgencies;
        const shownAgencies = selected.map((agency, key) => (
            <ShownAgency
                agencyType={type}
                agency={this.formatAgency(agency)}
                label={this.formatAgency(agency)}
                key={`_${key}`}
                updateAgency={this.props.updateAgency.bind(null,
                    agency, this.props.agencyType)} />
        ));

        return (
            <div className={`selected-agencies ${_.toLower(type)}`}>
                {shownAgencies}
            </div>
        );
    }
}
SelectedAgencies.propTypes = propTypes;
