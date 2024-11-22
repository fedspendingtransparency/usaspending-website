/**
 * RecipientTypeContainer.jsx
 * Created by michaelbray on 2/16/17.
 */

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { is } from 'immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as searchFilterActions from 'redux/actions/search/searchFilterActions';
import RecipientTypeAccordion from 'components/search/filters/recipient/RecipientTypeAccordion';

const propTypes = {
    toggleRecipientType: PropTypes.func,
    recipientType: PropTypes.object,
    appliedType: PropTypes.object
};

const RecipientTypeContainer = ({
    toggleRecipientType, recipientType, appliedType
}) => {
    let justMounted = true;
    const firstUpdate = useRef(true);

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        justMounted = false;
    }, []);

    const toggleRecipientTypeFunc = (selection) => {
        toggleRecipientType(selection);
    };

    const dirtyFilters = () => {
        if (justMounted || is(recipientType, appliedType)) {
            return null;
        }
        return Symbol('dirty recipient type');
    };

    return (
        <RecipientTypeAccordion
            dirtyFilters={dirtyFilters()}
            selectedTypes={recipientType}
            toggleCheckboxType={toggleRecipientTypeFunc} />
    );
};

RecipientTypeContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        recipientType: state.filters.recipientType,
        appliedType: state.appliedFilters.filters.recipientType
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(RecipientTypeContainer);
