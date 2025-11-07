/**
  * AwardTypeContainerV2.jsx
  * Created by Nick Torres 1/8/2025
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AwardTypeV2 from "../../../components/search/filters/awardType/AwardTypeV2";
import {

    toggleAwardType,
    bulkAwardTypeChange
} from "../../../redux/actions/search/searchFilterActions";


const propTypes = {
    toggleSingleAwardType: PropTypes.func,
    toggleBulkAwardType: PropTypes.func,
    awardType: PropTypes.object
};

const AwardTypeContainerV2 = ({
    awardType,
    toggleSingleAwardType,
    toggleBulkAwardType
}) => {
    const toggleFinancialAssistance = (selection) => {
        toggleSingleAwardType(selection);
    };

    const bulkFinancialAssistance = (selection) => {
        toggleBulkAwardType(selection);
    };

    return (
        <AwardTypeV2
            awardType={awardType}
            toggleCheckboxType={toggleFinancialAssistance}
            bulkTypeChange={bulkFinancialAssistance} />
    );
};

AwardTypeContainerV2.propTypes = propTypes;
export default connect(
    (state) => ({
        awardType: state.filters.awardType
    }),
    (dispatch) => bindActionCreators({
        toggleSingleAwardType: toggleAwardType,
        toggleBulkAwardType: bulkAwardTypeChange
    }, dispatch)
)(AwardTypeContainerV2);
