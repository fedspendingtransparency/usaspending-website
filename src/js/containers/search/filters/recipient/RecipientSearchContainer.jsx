/**
 * RecipientSearchContainer.jsx
 * Created by michaelbray on 2/16/17.
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as searchFilterActions from 'redux/actions/search/searchFilterActions';
import RecipientResultsContainer from "../../../../components/search/filters/recipient/RecipientResultsContainer";
import SubmitHint from "../../../../components/sharedComponents/filterSidebar/SubmitHint";

const propTypes = {
    updateSelectedRecipients: PropTypes.func,
    selectedRecipients: PropTypes.object
};

const RecipientSearchContainer = ({ updateSelectedRecipients, selectedRecipients }) => (
    <div className="recipient-filter">
        <div className="filter-item-wrap">
            <RecipientResultsContainer
                selectedRecipients={selectedRecipients}
                updateSelectedRecipients={updateSelectedRecipients} />
            <SubmitHint selectedFilters={selectedRecipients} />
        </div>
    </div>
);

RecipientSearchContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        selectedRecipients: state.filters.selectedRecipients
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(RecipientSearchContainer);
