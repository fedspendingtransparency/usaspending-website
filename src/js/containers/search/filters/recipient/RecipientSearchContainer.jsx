/**
 * RecipientSearchContainer.jsx
 * Created by michaelbray on 2/16/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import RecipientSearch from 'components/search/filters/recipient/RecipientSearch';

const propTypes = {
    updateSelectedRecipients: PropTypes.func,
    updateRecipientDomesticForeignSelection: PropTypes.func,
    toggleRecipientType: PropTypes.func,
    bulkRecipientTypeChange: PropTypes.func,
    updateRecipientLocations: PropTypes.func
};

const ga = require('react-ga');

export class RecipientSearchContainer extends React.Component {

    static logRecipientFilterEvent(name) {
        ga.event({
            category: 'Search Page Filter Applied',
            action: 'Applied Recipient Name/DUNS Filter',
            label: name.toLowerCase()
        });
    }

    static logCountryFilterEvent(selection) {
        ga.event({
            category: 'Search Page Filter Applied',
            action: 'Applied Recipient Domestic/Foreign Filter',
            label: selection
        });
    }

    static logLocationFilterEvent(placeType, place, event) {
        ga.event({
            category: 'Search Page Filter Applied',
            action: `${event} Recipient ${placeType.toLowerCase()} Filter`,
            label: place.toLowerCase()
        });
    }

    constructor(props) {
        super(props);

        // Bind functions
        this.toggleRecipient = this.toggleRecipient.bind(this);
        this.toggleDomesticForeign = this.toggleDomesticForeign.bind(this);
        this.toggleRecipientType = this.toggleRecipientType.bind(this);
        this.bulkRecipientTypeChange = this.bulkRecipientTypeChange.bind(this);
        this.toggleRecipientLocation = this.toggleRecipientLocation.bind(this);
    }

    toggleRecipient(recipient) {
        this.props.updateSelectedRecipients(recipient);

        // Analytics
        RecipientSearchContainer.logRecipientFilterEvent(recipient);
    }

    toggleDomesticForeign(selection) {
        this.props.updateRecipientDomesticForeignSelection(selection.target.value);

        // Analytics
        RecipientSearchContainer.logCountryFilterEvent(selection.target.value);
    }

    toggleRecipientType(selection) {
        this.props.toggleRecipientType(selection);
        // Analytics handled by checkbox component
    }

    bulkRecipientTypeChange(selection) {
        this.props.bulkRecipientTypeChange(selection);
        // Analytics handled by checkbox component
    }

    toggleRecipientLocation(recipientLocation) {
        this.props.updateRecipientLocations(recipientLocation);

        // Analytics
        const placeType = recipientLocation.place_type;
        const place = recipientLocation.place;
        if (!recipientLocation.identifier) {
            // Adding a new location filter
            RecipientSearchContainer.logLocationFilterEvent(placeType, place, 'Applied');
        }
        else {
            // Removing an existing location filter
            RecipientSearchContainer.logLocationFilterEvent(placeType, place, 'Removed');
        }
    }

    render() {
        return (
            <RecipientSearch
                {...this.props}
                toggleRecipient={this.toggleRecipient}
                toggleDomesticForeign={this.toggleDomesticForeign}
                toggleRecipientType={this.toggleRecipientType}
                bulkTypeChange={this.bulkRecipientTypeChange}
                toggleRecipientLocation={this.toggleRecipientLocation} />
        );
    }
}

RecipientSearchContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        selectedRecipients: state.filters.selectedRecipients,
        recipientDomesticForeign: state.filters.recipientDomesticForeign,
        recipientType: state.filters.recipientType,
        selectedRecipientLocations: state.filters.selectedRecipientLocations }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(RecipientSearchContainer);
