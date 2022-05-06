/**
 * SelectedLocations.jsx
 * Created by Emily Gullo 12/08/2016
 **/

import React from 'react';
import PropTypes from 'prop-types';

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
                label={`${location.display.entity.toUpperCase()} | ${location.display.standalone}`}
                key={key}
                removeLocation={this.props.removeLocation.bind(null, key)} />);
            shownLocations.push(value);
        });

        return (
            <div
                id="award-search-selected-locations"
                className="selected-filters"
                role="status">
                {shownLocations}
            </div>
        );
    }
}
SelectedLocations.propTypes = propTypes;
