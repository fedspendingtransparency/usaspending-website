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

export class RecipientSearchContainer extends React.Component {
    constructor(props) {
        super(props);

        // Bind functions
        this.toggleRecipient = this.toggleRecipient.bind(this);
        this.toggleDomesticForeign = this.toggleDomesticForeign.bind(this);
        this.toggleRecipientLocation = this.toggleRecipientLocation.bind(this);
    }

    toggleRecipient(recipient) {
        this.props.updateSelectedRecipients(recipient);
    }

    toggleDomesticForeign(selection) {
        this.props.updateRecipientDomesticForeignSelection(selection.target.value);
    }

    toggleRecipientLocation(recipientLocation) {
        this.props.updateRecipientLocations(recipientLocation);
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
