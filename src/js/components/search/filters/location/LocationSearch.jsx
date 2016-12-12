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
    handleTextInput: React.PropTypes.func,
    selectedLocation: React.PropTypes.array
};

const defaultProps = {
    selectedLocation: [
        'Utah',
        '20902',
        'Orlando',
        'Fairfax County'
    ]
};

export default class LocationSearch extends React.Component {

    removeLocation(e) {
        // Remove location from selected list
        console.log(e.target.value);
    }

    render() {
        return (
            <div className="location-filter search-filter">
                <CountryType toggleCountry={this.props.toggleCountry} />
                <LocationListContainer handleTextInput={this.props.handleTextInput} />
                <SelectedLocations selectedLocation={this.props.selectedLocation} removeLocation={this.removeLocation.bind(this)} />
            </div>
        );
    }
}
LocationSearch.propTypes = propTypes;
LocationSearch.defaultProps = defaultProps;
