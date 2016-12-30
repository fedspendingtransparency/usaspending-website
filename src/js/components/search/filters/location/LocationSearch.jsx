/**
 * LocationSearch.jsx
 * Created by Emily Gullo 11/28/2016
 **/

import React from 'react';
import LocationListContainer from 'containers/sharedContainers/LocationListContainer';
import CountryType from './CountryType';
import SelectedLocations from './SelectedLocations';

const propTypes = {
    toggleCountry: React.PropTypes.func,
    selectLocation: React.PropTypes.func,
    removeLocation: React.PropTypes.func,
    selectedLocations: React.PropTypes.object,
    locationOption: React.PropTypes.string
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
                <CountryType
                    {...this.props}
                    toggleCountry={this.props.toggleCountry}
                    locationOption={this.props.locationOption} />
                <LocationListContainer
                    selectedLocations={this.props.selectedLocations}
                    selectLocation={this.props.selectLocation}
                    locationOption={this.props.locationOption} />
                {selectedLocations}
            </div>
        );
    }
}
LocationSearch.propTypes = propTypes;
