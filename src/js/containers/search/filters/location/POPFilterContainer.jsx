/**
 * POPFilterContainer.jsx
 * Created by Kevin Li 10/30/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import SelectedLocations from 'components/search/filters/location/SelectedLocations';
import LocationPickerContainer from './LocationPickerContainer';

const propTypes = {
    addPOPLocationObject: PropTypes.func,
    updateGenericFilter: PropTypes.func,
    selectedLocations: PropTypes.object
};

export class POPFilterContainer extends React.Component {
    constructor(props) {
        super(props);

        this.addLocation = this.addLocation.bind(this);
        this.removeLocation = this.removeLocation.bind(this);
    }

    addLocation(location) {
        this.props.addPOPLocationObject(location);
    }

    removeLocation(locationId) {
        const newValue = this.props.selectedLocations.delete(locationId);
        this.props.updateGenericFilter({
            type: 'selectedLocations',
            value: newValue
        });
    }

    render() {
        return (
            <div>
                <LocationPickerContainer
                    enableCitySearch
                    scope="primary_place_of_performance"
                    selectedLocations={this.props.selectedLocations}
                    addLocation={this.addLocation} />
                <SelectedLocations
                    selectedLocations={this.props.selectedLocations}
                    removeLocation={this.removeLocation} />
            </div>
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
