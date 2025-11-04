/**
  * AwardTypeContainerV2.jsx
  * Created by Nick Torres 1/8/2025
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FinancialAssistanceAwardType from "../../../components/search/filters/awardType/FinancialAssistanceAwardType";
import * as searchFilterActions from "../../../redux/actions/search/searchFilterActions";


const propTypes = {
    toggleAwardType: PropTypes.func,
    bulkAwardTypeChange: PropTypes.func,
    awardType: PropTypes.object
};

const AwardTypeContainerV2 = ({
    awardType,
    toggleAwardType,
    bulkAwardTypeChange
}) => {
    const toggleFinancialAssistance = (selection) => {
        toggleAwardType(selection);
    };

    const bulkFinancialAssistance = (selection) => {
        bulkAwardTypeChange(selection);
    };

    return (
        <FinancialAssistanceAwardType
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
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(AwardTypeContainerV2);
