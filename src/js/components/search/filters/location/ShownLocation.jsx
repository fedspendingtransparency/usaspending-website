/**
 * ShownLocation.jsx
 * Created by Emily Gullo 12/08/2016
 **/

import React from 'react';
import _ from 'lodash';

const propTypes = {
    location: React.PropTypes.object,
    removeLocation: React.PropTypes.func
};

export default class ShownLocation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            locationDisplayValue: this.formatLocation()
        };
    }

    formatLocation() {
        const location = this.props.location;
        let displayValue = '';

        if (location.place_type !== null) {
            displayValue = `${_.startCase(_.toLower(location.place_type))} | `;
        }

        displayValue += `${location.place}`;

        if (location.parent !== null) {
            displayValue += `, ${location.parent}`;
        }

        return displayValue;
    }

    render() {
        return (
            <button
                className="shown-location-button"
                value={this.state.locationDisplayValue}
                onClick={this.props.removeLocation}>
                {this.state.locationDisplayValue} <span className="close">x</span>
            </button>
        );
    }
}
ShownLocation.propTypes = propTypes;
