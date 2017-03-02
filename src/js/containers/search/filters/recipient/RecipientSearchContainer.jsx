/**
 * RecipientSearchContainer.jsx
 * Created by michaelbray on 2/16/17.
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import RecipientSearch from 'components/search/filters/recipient/RecipientSearch';

const propTypes = {
    updateSelectedRecipients: React.PropTypes.func,
    updateRecipientDomesticForeignSelection: React.PropTypes.func,
    updateRecipientLocations: React.PropTypes.func
};

const ga = require('react-ga');

export class RecipientSearchContainer extends React.Component {
    static logFilterEvent() {
        ga.event({
            category: 'Search Filters',
            action: 'Applied Filter',
            label: 'Recipient'
        });
    }

    static logRecipientFilterEvent(name) {
        ga.event({
            category: 'Search Filters',
            action: 'Applied Recipient Name/DUNS Filter',
            label: name.toLowerCase()
        });
    }

    static logCountryFilterEvent(selection) {
        ga.event({
            category: 'Search Filters',
            action: 'Applied Recipient Country Filter',
            label: selection
        });
    }

    // TODO: test with place type
    static logLocationFilterEvent(placeType, place) {
        ga.event({
            category: 'Search Filters',
            action: `Applied Recipient ${placeType.toLowerCase()} Filter`,
            label: place.toLowerCase()
        });
    }

    constructor(props) {
        super(props);

        // Bind functions
        this.toggleRecipient = this.toggleRecipient.bind(this);
        this.toggleDomesticForeign = this.toggleDomesticForeign.bind(this);
        this.toggleRecipientLocation = this.toggleRecipientLocation.bind(this);
    }

    toggleRecipient(recipient) {
        this.props.updateSelectedRecipients(recipient);
        // Analytics
        RecipientSearchContainer.logFilterEvent();
        RecipientSearchContainer.logRecipientFilterEvent(recipient.recipient_name);
    }

    toggleDomesticForeign(selection) {
        this.props.updateRecipientDomesticForeignSelection(selection.target.value);
        // Analytics
        RecipientSearchContainer.logFilterEvent();
        RecipientSearchContainer.logCountryFilterEvent(selection.target.value);
    }

    toggleRecipientLocation(recipientLocation) {
        this.props.updateRecipientLocations(recipientLocation);
        // Analytics
        const placeType = recipientLocation.place_type;
        const place = recipientLocation.place;
        RecipientSearchContainer.logFilterEvent();
        RecipientSearchContainer.logLocationFilterEvent(placeType, place);
    }

    render() {
        return (
            <RecipientSearch
                {...this.props}
                toggleRecipient={this.toggleRecipient}
                toggleDomesticForeign={this.toggleDomesticForeign}
                toggleRecipientLocation={this.toggleRecipientLocation} />
        );
    }
}

RecipientSearchContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        selectedRecipients: state.filters.selectedRecipients,
        recipientDomesticForeign: state.filters.recipientDomesticForeign,
        selectedRecipientLocations: state.filters.selectedRecipientLocations }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(RecipientSearchContainer);
