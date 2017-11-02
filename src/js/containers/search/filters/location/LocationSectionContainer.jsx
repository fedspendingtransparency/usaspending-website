/**
 * LocationSection.jsx
 * Created by Kevin Li 10/30/17
 */

import React from 'react';
import { connect } from 'react-redux';

import LocationSection from 'components/search/filters/location/LocationSection';

export class LocationSectionContainer extends React.Component {
    render() {
        return (
            <LocationSection
                {...this.props} />
        );
    }
}

export default connect(
    (state) => ({
        selectedLocations: state.filters.selectedLocations,
        selectedRecipientLocations: state.filters.selectedRecipientLocations
    })
)(LocationSectionContainer);
