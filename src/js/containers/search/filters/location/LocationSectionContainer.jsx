/**
 * LocationSection.jsx
 * Created by Kevin Li 10/30/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { is } from 'immutable';

import LocationSection from 'components/search/filters/location/LocationSection';

const propTypes = {
    selectedLocations: PropTypes.object,
    selectedRecipientLocations: PropTypes.object,
    appliedLocations: PropTypes.object,
    appliedRecipientLocations: PropTypes.object
};

export class LocationSectionContainer extends React.Component {
    dirtyFilters() {
        if (is(this.props.selectedLocations, this.props.appliedLocations) &&
            is(this.props.selectedRecipientLocations, this.props.appliedRecipientLocations)) {
            return null;
        }
        return Symbol('dirty locations');
    }

    render() {
        return (
            <LocationSection
                selectedLocations={this.props.selectedLocations}
                selectedRecipientLocations={this.props.selectedRecipientLocations}
                dirtyFilters={this.dirtyFilters()} />
        );
    }
}

LocationSectionContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        selectedLocations: state.filters.selectedLocations,
        selectedRecipientLocations: state.filters.selectedRecipientLocations,
        appliedLocations: state.appliedFilters.filters.selectedLocations,
        appliedRecipientLocations: state.appliedFilters.filters.selectedRecipientLocations
    })
)(LocationSectionContainer);
