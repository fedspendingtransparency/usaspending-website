/**
 * LocationSearch.jsx
 * Created by Emily Gullo 11/28/2016
 **/

import React from 'react';
import CountryType from './CountryType';
import SelectedLocations from './SelectedLocations';
import LocationListContainer from '../../../../containers/sharedContainers/LocationListContainer';

const propTypes = {
    toggleCountry: React.PropTypes.func,
    selectLocation: React.PropTypes.func,
    removeLocation: React.PropTypes.func,
    selectedLocations: React.PropTypes.object
};

export default class LocationSearch extends React.Component {
    render() {
        return (
            <div className="location-filter search-filter">
                <CountryType toggleCountry={this.props.toggleCountry} />
                <LocationListContainer
                    selectedLocations={this.props.selectedLocations}
                    selectLocation={this.props.selectLocation} />
                <SelectedLocations
                    selectedLocations={this.props.selectedLocations}
                    removeLocation={this.props.removeLocation} />
            </div>
        );
    }
}
LocationSearch.propTypes = propTypes;
