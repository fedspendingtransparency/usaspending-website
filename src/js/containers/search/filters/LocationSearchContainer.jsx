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

        this.state = {
            errorMessage: '',
            errorHeader: '',
            showWarning: false
        };

        // Bind functions
        this.toggleCountry = this.toggleCountry.bind(this);
        this.selectLocation = this.selectLocation.bind(this);
        this.removeLocation = this.removeLocation.bind(this);
    }

    toggleCountry(e) {
        this.state = {
            locationOption: e.target.value
        };
    }

    selectLocation(location, isValid) {
        // If location name exists and is valid
        if (location !== null && isValid) {
            const updateParams = {};
            updateParams.location = location;
            updateParams.direction = 'add';

            this.props.updateSelectedLocations(updateParams);
            this.setState({
                showWarning: false
            });
        }
        else {
            setTimeout(() => {
                this.setState({
                    showWarning: true,
                    errorMessage: 'There is no match for your location, please try another.',
                    errorHeader: 'Location Error'
                });
            }, 500);
        }
    }

    removeLocation(location) {
        const updateParams = {};
        updateParams.location = location;
        updateParams.direction = 'remove';
        this.props.updateSelectedLocations(updateParams);
    }


    checkComplete() {
        if (this.state.selectedLocation === '') {
            this.setState({
                errorMessage: 'You need to provide a valid location in order to continue.'
            });
        }
    }

    render() {
        return (
            <LocationSearch
                {...this.props}
                toggleCountry={this.toggleCountry}
                selectLocation={this.selectLocation}
                removeLocation={this.removeLocation}
                errorMessage={this.state.errorMessage}
                errorHeader={this.state.errorHeader}
                showWarning={this.state.showWarning} />
        );
    }
}

LocationSearchContainer.propTypes = propTypes;

export default connect(
    (state) => ({ selectedLocations: state.filters.selectedLocations }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(LocationSearchContainer);
