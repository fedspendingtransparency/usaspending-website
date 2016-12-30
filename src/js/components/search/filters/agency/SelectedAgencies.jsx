/**
 * SelectedAgencies.jsx
 * Created by Emily Gullo 12/28/2016
 **/

import React from 'react';
import _ from 'lodash';
import ShownAgency from './ShownAgency';

const propTypes = {
    selectedAgencies: React.PropTypes.object,
    removeAgency: React.PropTypes.func
};

export default class SelectedAgencies extends React.Component {
    constructor(props) {
        super(props);
        this.formatAgency = this.formatAgency.bind(this);
    }

    formatAgency(ag) {
        const agency = ag;
        let displayValue = '';

        if (agency !== null) {
            displayValue = `${_.startCase(_.toLower(agency))} | `;
        }

        displayValue += `${agency}`;

        return displayValue;
    }

    render() {
        const shownAgencies = this.props.selectedAgencies.map((agency, key) => (
            <ShownAgency
                agency={agency}
                label={this.formatAgency(agency)}
                key={(`_${key}`)}
                removeAgency={this.props.removeAgency.bind(null, agency)} />
        ));

        return (
            <div className="selected-agencies">
                {shownAgencies}
            </div>
        );
    }
}
SelectedAgencies.propTypes = propTypes;
