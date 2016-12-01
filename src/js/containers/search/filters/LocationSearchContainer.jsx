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
            locationOption: null,
            locationText: null
        };
        // bind function
        this.toggleCountry = this.toggleCountry.bind(this);
        this.handleTextInput = this.handleTextInput.bind(this);
    }

    toggleCountry(e) {
        this.setState({
            locationOption: e.target.value
        });
    }

    handleTextInput(e) {
        this.setState({
            locationText: e.target.value
        });
    }

    performSearch() {
        const searchParams = {};
        if (this.state.locationOption === 'usa') {
            // use only usa values
            searchParams.usa = this.state.filter.usa;
        }
        else if (this.state.locationOption === 'foreign') {
            // use only Foreign values
            searchParams.foreign = this.state.filter.foreign;
        }
        else {
            // use all values
            searchParams.all = this.state.filter.all;
        }

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
    (state) => ({ reduxFilters: state.filters.locationSearch }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(LocationSearchContainer);
