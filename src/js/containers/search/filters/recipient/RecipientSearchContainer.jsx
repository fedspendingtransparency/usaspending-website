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

const RecipientSearchContainer = (props) => {
    const toggleRecipient = (recipient) => {
        props.updateSelectedRecipients(recipient);
    };

    const dirtyFilters = () => {
        if (is(props.selectedRecipients, props.appliedRecipients)) {
            return null;
        }
        return Symbol('dirty recipients');
    };

    return (
        <RecipientSearch
            {...props}
            dirtyFilters={dirtyFilters}
            toggleRecipient={toggleRecipient} />
    );
};

RecipientSearchContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        selectedRecipients: state.filters.selectedRecipients,
        appliedRecipients: state.appliedFilters.filters.selectedRecipients
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(RecipientSearchContainer);
