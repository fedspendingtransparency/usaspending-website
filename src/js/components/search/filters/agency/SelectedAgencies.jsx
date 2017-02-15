/**
 * SelectedAgencies.jsx
 * Created by Emily Gullo 12/28/2016
 **/

import React from 'react';
import _ from 'lodash';
import ShownAgency from './ShownAgency';

const propTypes = {
    selectedAgencies: React.PropTypes.object,
    toggleAgency: React.PropTypes.func,
    agencyType: React.PropTypes.string
};

export default class SelectedAgencies extends React.Component {
    render() {
        const shownAgencies = [];
        this.props.selectedAgencies.entrySeq().forEach((entry) => {
            const key = entry[0];
            const agency = entry[1];
            let label = agency.subtier_agency.name;

            if (agency.agencyType === 'subtier' &&
                agency.toptier_agency.name === agency.subtier_agency.name) {
                label += ' | Sub-Agency';
            }

            const value = (<ShownAgency
                agency={agency}
                label={label}
                key={key}
                agencyType={this.props.agencyType}
                toggleAgency={this.props.toggleAgency.bind(this)} />);
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
