/**
 * SelectedLocations.jsx
 * Created by Emily Gullo 12/08/2016
 **/

import React from 'react';
import ShownLocation from './ShownLocation';

const propTypes = {
    selectedLocation: React.PropTypes.array,
    removeLocation: React.PropTypes.func
};

export default class SelectedLocations extends React.Component {
    render() {
        const shownLocations = this.props.selectedLocations.map((location, key) => (
            <ShownLocation value={location.place} id={key} key={key.matched_ids.join(',')}
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
