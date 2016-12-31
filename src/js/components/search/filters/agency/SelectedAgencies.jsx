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

        if (ag !== null) {
            displayValue = `${_.startCase(_.toLower(ag))}`;
        }

        return displayValue;
    }

    render() {
        const shownAgencies = this.props.selectedAgencies.map((agency, key) => (
            <ShownAgency
                agency={this.formatAgency(agency)}
                label={this.formatAgency(agency)}
                key={(`_${key}`)}
                removeAgency={this.props.removeAgency.bind(null, this.formatAgency(agency))} />
        ));

        return (
            <div className="selected-agencies">
                {shownAgencies}
            </div>
        );
    }
}
SelectedAgencies.propTypes = propTypes;
