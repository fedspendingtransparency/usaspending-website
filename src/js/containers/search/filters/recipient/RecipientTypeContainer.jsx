/**
 * RecipientTypeContainer.jsx
 * Created by michaelbray on 2/16/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as searchFilterActions from 'redux/actions/search/searchFilterActions';
import RecipientTypeAccordion from 'components/search/filters/recipient/RecipientTypeAccordion';

const propTypes = {
    toggleRecipientType: PropTypes.func,
    recipientType: PropTypes.object,
    searchV2: PropTypes.bool
};

const RecipientTypeContainer = ({
    toggleRecipientType, recipientType, searchV2
}) => {
    const toggleRecipientTypeFunc = (selection) => {
        toggleRecipientType(selection);
    };

    return (
        <RecipientTypeAccordion
            selectedTypes={recipientType}
            toggleCheckboxType={toggleRecipientTypeFunc}
            searchV2={searchV2} />
    );
};

RecipientTypeContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        recipientType: state.filters.recipientType
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(RecipientTypeContainer);
