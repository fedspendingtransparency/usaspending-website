/**
 * RecipientTypeContainer.jsx
 * Created by michaelbray on 2/16/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as searchFilterActions from 'redux/actions/search/searchFilterActions';
import { recipientTypeMapping } from "helpers/search/filterCheckboxHelper";
import { recipientTypes } from 'dataMapping/search/recipientType';
import ListCheckbox from "components/sharedComponents/checkbox/ListCheckbox";

const propTypes = {
    toggleRecipientType: PropTypes.func,
    recipientType: PropTypes.object,
    searchV2: PropTypes.bool
};

const RecipientTypeContainer = ({
    recipientType, toggleRecipientType, searchV2
}) => {
    const toggleRecipientTypeFunc = (selection) => {
        toggleRecipientType(selection);
    };
    return (
        <ListCheckbox
            filterCategoryMapping={recipientTypeMapping}
            filters={recipientTypes}
            selectedFilters={recipientType}
            singleFilterChange={toggleRecipientTypeFunc}
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
