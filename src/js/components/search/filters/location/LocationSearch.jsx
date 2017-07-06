/**
 * LocationSearch.jsx
 * Created by Emily Gullo 11/28/2016
 **/

import React from 'react';
import PropTypes from 'prop-types';

import LocationListContainer from 'containers/search/filters/location/LocationListContainer';
import CountryType from './CountryType';
import SelectedLocations from './SelectedLocations';

const propTypes = {
    selectLocation: PropTypes.func,
    removeLocation: PropTypes.func,
    selectedLocations: PropTypes.object
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
            <div className="location-filter">
                <div className="filter-item-wrap">
                    <CountryType {...this.props} />
                </div>
                <div className="filter-item-wrap">
                    <LocationListContainer {...this.props} selectLocation={this.props.selectLocation} />
                    {selectedLocations}
                </div>
            </div>
        );
    }
}

LocationSearch.propTypes = propTypes;
