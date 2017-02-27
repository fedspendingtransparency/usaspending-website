/**
 * SelectedLocations.jsx
 * Created by Emily Gullo 12/08/2016
 **/

import React from 'react';

import * as LocationFormatter from 'helpers/locationFormatter';
import ShownLocation from './ShownLocation';

const propTypes = {
    selectedLocations: React.PropTypes.object,
    removeLocation: React.PropTypes.func
};

export default class SelectedLocations extends React.Component {
    render() {
        const shownLocations = [];
        this.props.selectedLocations.entrySeq().forEach((entry) => {
            const key = entry[0];
            const location = entry[1];
            const value = (<ShownLocation
                location={location}
                label={LocationFormatter.formatLocation(location)}
                key={key}
                removeLocation={this.props.removeLocation.bind(null, location)} />);
            shownLocations.push(value);
        });

        return (
            <div className="selected-locations">
                {shownLocations}
            </div>
        );
    }
}
SelectedLocations.propTypes = propTypes;
