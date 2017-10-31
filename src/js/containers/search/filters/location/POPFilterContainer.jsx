/**
 * POPFilterContainer.jsx
 * Created by Kevin Li 10/30/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import LocationPickerContainer from './LocationPickerContainer';

const propTypes = {

};

const defaultSelections = {
    country: {
        code: '',
        name: ''
    },
    state: {
        code: '',
        fips: '',
        name: ''
    },
    county: {
        code: '',
        fips: '',
        state: '',
        name: ''
    },
    district: {
        code: '',
        district: '',
        name: ''
    }
};

class POPFilterContainer extends React.Component {
    constructor(props) {
        super(props);

        this.addLocation = this.addLocation.bind(this);
    }

    addLocation(location) {
        this.props.addPOPLocationObject(location);
    }

    render() {
        return (
            <LocationPickerContainer
                addLocation={this.addLocation} />
        );
    }
}

POPFilterContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        selectedLocations: state.filters.selectedLocations
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(POPFilterContainer);
