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
        let displayValue = '';
        console.log("format");

        const agency = ag.funding_agency__name__subtier_agency__name__funding_agency__name;
        if (agency !== null) {
            displayValue = `${_.startCase(_.toLower(agency))}`;
        }

        return displayValue;
    }

    render() {
        let selected = null;
        const type = this.props.agencyType;
        selected = this.props.selectedAgencies;
        const typeArray = `${selected}.${_.toLower(type)}_agency__subtier_agency__name`;
        const shownAgencies = typeArray.map((agency, key) => (
            <ShownAgency
                agency={agency}
                label={this.formatAgency(agency)}
                key={`_${key}`}
                removeAgency={this.props.removeAgency.bind(null,
                    agency, type)} />
        ));

        return (
            <div className={`selected-agencies ${_.toLower(type)}`}>
                {shownAgencies}
            </div>
        );
    }
}
SelectedAgencies.propTypes = propTypes;
