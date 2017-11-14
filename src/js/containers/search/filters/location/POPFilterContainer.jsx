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

const ga = require('react-ga');

const propTypes = {
    addPOPLocationObject: PropTypes.func,
    updateGenericFilter: PropTypes.func,
    selectedLocations: PropTypes.object
};

export class POPFilterContainer extends React.Component {
    static logLocationFilterEvent(label, event) {
        ga.event({
            label,
            category: 'Search Page Filter Applied',
            action: `${event} Place of Performance Location Filter`
        });
    }

    constructor(props) {
        super(props);

        this.addLocation = this.addLocation.bind(this);
        this.removeLocation = this.removeLocation.bind(this);
    }

    addLocation(location) {
        this.props.addPOPLocationObject(location);
        POPFilterContainer.logLocationFilterEvent(location.identifier, 'Applied');
    }

    removeLocation(locationId) {
        const newValue = this.props.selectedLocations.delete(locationId);
        this.props.updateGenericFilter({
            type: 'selectedLocations',
            value: newValue
        });

        POPFilterContainer.logLocationFilterEvent(locationId, 'Removed');
    }

    render() {
        return (
            <div>
                <LocationPickerContainer
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
