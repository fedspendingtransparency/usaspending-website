/**
 * SelectedLocations.jsx
 * Created by Emily Gullo 12/08/2016
 **/

import React from 'react';
import _ from 'lodash';
import ShownLocation from './ShownLocation';

const propTypes = {
    selectedLocations: React.PropTypes.object,
    removeLocation: React.PropTypes.func
};

export default class SelectedLocations extends React.Component {
    constructor(props) {
        super(props);
        this.formatLocation = this.formatLocation.bind(this);
    }

    formatLocation(loc) {
        const location = loc;
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
        const shownLocations = this.props.selectedLocations.map((location, key) => (
            <ShownLocation
                location={location}
                label={this.formatLocation(location)}
                key={key.matched_ids.join(',').concat(`_${key.place}`).concat(`_${key.place_type}`)}
                removeLocation={this.props.removeLocation.bind(null, location)} />
        ));

        return (
            <div className="selected-locations">
                {shownLocations}
            </div>
        );
    }
}
SelectedLocations.propTypes = propTypes;
