/**
  * LocationSearchContainer.jsx
  * Created by Emily Gullo 11/30/16
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import LocationSearch from 'components/search/filters/location/LocationSearch';

const propTypes = {
    updateSelectedLocations: React.PropTypes.func
};

class LocationSearchContainer extends React.Component {
    constructor(props) {
        super(props);

        // Bind functions
        this.selectLocation = this.selectLocation.bind(this);
        this.removeLocation = this.removeLocation.bind(this);
    }

    selectLocation(location, isValid) {
        // If location name exists and is valid
        if (location !== null && isValid) {
            const updateParams = {};
            updateParams.location = location;

            this.props.updateSelectedLocations(updateParams);
        }
    }

    removeLocation(location) {
        const updateParams = {};
        updateParams.location = location;
        this.props.updateSelectedLocations(updateParams);
    }

    render() {
        return (
            <LocationSearch
                {...this.props}
                selectLocation={this.selectLocation}
                removeLocation={this.removeLocation} />
        );
    }
}

LocationSearchContainer.propTypes = propTypes;

export default connect(
    (state) => ({ selectedLocations: state.filters.selectedLocations }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(LocationSearchContainer);
