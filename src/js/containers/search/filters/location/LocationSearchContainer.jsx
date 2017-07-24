/**
  * LocationSearchContainer.jsx
  * Created by Emily Gullo 11/30/16
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import LocationSearch from 'components/search/filters/location/LocationSearch';

const propTypes = {
    updateSelectedLocations: PropTypes.func,
    updateDomesticForeignSelection: PropTypes.func
};

const ga = require('react-ga');

class LocationSearchContainer extends React.Component {

    static logCountryFilterEvent(selection) {
        ga.event({
            category: 'Search Page Filter Applied',
            action: 'Applied Place of Performance Domestic/Foreign Filter',
            label: selection
        });
    }

    static logPlaceFilterEvent(placeType, place) {
        ga.event({
            category: 'Search Page Filter Applied',
            action: `Applied Place of Performance ${placeType.toLowerCase()} Filter`,
            label: place.toLowerCase()
        });
    }

    constructor(props) {
        super(props);

        // Bind functions
        this.selectLocation = this.selectLocation.bind(this);
        this.removeLocation = this.removeLocation.bind(this);
        this.toggleCountry = this.toggleCountry.bind(this);
    }

    selectLocation(location, isValid) {
        // If location name exists and is valid
        if (location !== null && isValid) {
            const updateParams = {};
            updateParams.location = location;
            this.props.updateSelectedLocations(updateParams);

            // Analytics
            LocationSearchContainer.logPlaceFilterEvent(location.place_type, location.place);
        }
    }

    removeLocation(location) {
        const updateParams = {};
        updateParams.location = location;
        this.props.updateSelectedLocations(updateParams);
    }

    toggleCountry(selection) {
        this.props.updateDomesticForeignSelection(selection.target.value);

        // Analytics
        LocationSearchContainer.logCountryFilterEvent(selection.target.value);
    }

    render() {
        return (
            <LocationSearch
                {...this.props}
                selectLocation={this.selectLocation}
                removeLocation={this.removeLocation}
                toggleCountry={this.toggleCountry} />
        );
    }
}

LocationSearchContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        selectedLocations: state.filters.selectedLocations,
        locationDomesticForeign: state.filters.locationDomesticForeign }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(LocationSearchContainer);
