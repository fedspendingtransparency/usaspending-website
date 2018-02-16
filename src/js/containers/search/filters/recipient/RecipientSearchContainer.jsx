/**
 * RecipientSearchContainer.jsx
 * Created by michaelbray on 2/16/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { is } from 'immutable';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import RecipientSearch from 'components/search/filters/recipient/RecipientSearch';

const propTypes = {
    updateSelectedRecipients: PropTypes.func,
    selectedRecipients: PropTypes.object,
    appliedRecipients: PropTypes.object
};

export class RecipientSearchContainer extends React.Component {
    constructor(props) {
        super(props);

        // Bind functions
        this.toggleRecipient = this.toggleRecipient.bind(this);
    }

    toggleRecipient(recipient) {
        this.props.updateSelectedRecipients(recipient);
    }

    dirtyFilters() {
        if (is(this.props.selectedRecipients, this.props.appliedRecipients)) {
            return null;
        }
        return Symbol('dirty recipients');
    }

    render() {
        return (
            <RecipientSearch
                {...this.props}
                dirtyFilters={this.dirtyFilters()}
                toggleRecipient={this.toggleRecipient} />
        );
    }
}

RecipientSearchContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        selectedRecipients: state.filters.selectedRecipients,
        appliedRecipients: state.appliedFilters.filters.selectedRecipients
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(RecipientSearchContainer);
