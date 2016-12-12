/**
 * SelectedLocations.jsx
 * Created by Emily Gullo 12/08/2016
 **/

import React from 'react';
import ShownLocation from './ShownLocation';

const propTypes = {
    selectedLocation: React.PropTypes.array
};

export default class SelectedLocations extends React.Component {

    render() {
        const shownLocations = this.props.selectedLocation.map((location, key) => (
            <ShownLocation value={location} key={key} />
        ));

        return (
            <div className="selected-locations">
                {shownLocations}
            </div>
        );
    }
}
SelectedLocations.propTypes = propTypes;
