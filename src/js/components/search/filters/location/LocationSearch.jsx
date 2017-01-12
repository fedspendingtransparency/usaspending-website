/**
 * LocationSearch.jsx
 * Created by Emily Gullo 11/28/2016
 **/

import React from 'react';

import LocationListContainer from 'containers/sharedContainers/LocationListContainer';
import CountryType from './CountryType';
import SelectedLocations from './SelectedLocations';

const propTypes = {
    selectLocation: React.PropTypes.func,
    removeLocation: React.PropTypes.func,
    selectedLocations: React.PropTypes.object
};

export default class LocationSearch extends React.Component {
    render() {
        let selectedLocations = null;
        if (this.props.selectedLocations.size > 0) {
            selectedLocations = (<SelectedLocations
                selectedLocations={this.props.selectedLocations}
                removeLocation={this.props.removeLocation} />);
        }

        return (
            <div className="location-filter search-filter">
                <CountryType {...this.props} />
                <LocationListContainer {...this.props} selectLocation={this.props.selectLocation} />
                {selectedLocations}
            </div>
        );
    }
}

LocationSearch.propTypes = propTypes;
