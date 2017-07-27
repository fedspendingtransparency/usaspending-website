/**
 * SelectedLocations.jsx
 * Created by Emily Gullo 12/08/2016
 **/

import React from 'react';
import PropTypes from 'prop-types';

import * as LocationFormatter from 'helpers/locationFormatter';
import ShownLocation from './ShownLocation';

const propTypes = {
    selectedLocations: PropTypes.object,
    removeLocation: PropTypes.func
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
            <div className="selected-filters">
                {shownLocations}
            </div>
        );
    }
}
SelectedLocations.propTypes = propTypes;
