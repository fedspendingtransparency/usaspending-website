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
    updateLocation: React.PropTypes.func
};

class LocationSearchContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: {
                selectedLocation: []
            },
            locationError: false,
            errorMessage: ''
        };
        // bind function
        this.toggleCountry = this.toggleCountry.bind(this);
        this.handleTextInput = this.handleTextInput.bind(this);
    }

    toggleCountry(e) {
        this.updateFilter({
            locationOption: e.target.value
        });
    }

    handleTextInput(locationName, isValid) {
        if (locationName !== '' && isValid) {
            this.setState({
                filter: {
                    selectedLocation: locationName
                },
                locationError: false
            }, this.checkComplete);
        }
        else {
            this.setState({
                filter: {
                    selectedLocation: ''
                },
                locationError: true
            }, this.checkComplete);
        }

        // perform search when API is connected
        // this.updateFilter({
        //     locationText: e.target.value
        // });
    }

    checkComplete() {
        if (this.state.filter.selectedLocation === '') {
            this.setState({
                errorMessage: 'You need to provide a valid location in order to continue.'
            });
        }
    }

    updateFilter(params) {
        // set the state to a clone of the filter subobject merged with the param object
        const newFilter = Object.assign({}, this.state.filter, params);
        this.setState({
            filter: newFilter
        }, () => {
            this.performSearch();
        });
    }

    performSearch() {
        const searchParams = {};
        searchParams.locationArray = this.state.filter.locationArray;

        this.props.updateLocation(searchParams);
    }

    render() {
        return (
            <LocationSearch
                {...this.props}
                toggleCountry={this.toggleCountry}
                handleTextInput={this.handleTextInput} />
        );
    }
}

LocationSearchContainer.propTypes = propTypes;

export default connect(
    (state) => ({ reduxFilters: state.filters.locations }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(LocationSearchContainer);
