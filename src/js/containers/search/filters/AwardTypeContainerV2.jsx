/**
  * AwardTypeContainerV2.jsx
  * Created by Nick Torres 1/8/2025
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as searchFilterActions from 'redux/actions/search/searchFilterActions';
import ContractAwardType from "../../../components/search/filters/awardType/ContractAwardType";
import FinancialAssistanceAwardType from "../../../components/search/filters/awardType/FinancialAssistanceAwardType";


const propTypes = {
    toggleAwardType: PropTypes.func,
    bulkAwardTypeChange: PropTypes.func,
    awardType: PropTypes.object,
    isContractAwardType: PropTypes.bool.isRequired
};

const AwardTypeContainerV2 = ({
    toggleAwardType, bulkAwardTypeChange, awardType, isContractAwardType
}) => {
    const toggleAwardTypeFunc = (selection) => {
        toggleAwardType(selection);
    };

    const bulkAwardTypeChangeFunc = (selection) => {
        bulkAwardTypeChange(selection);
    };

    if (isContractAwardType) {
        return (
            <ContractAwardType
                awardType={awardType}
                toggleCheckboxType={toggleAwardTypeFunc}
                bulkTypeChange={bulkAwardTypeChangeFunc} />
        );
    }

    return (
        <FinancialAssistanceAwardType
            awardType={awardType}
            toggleCheckboxType={toggleAwardTypeFunc}
            bulkTypeChange={bulkAwardTypeChangeFunc} />
    );
};

AwardTypeContainerV2.propTypes = propTypes;
export default connect(
    (state) => ({
        awardType: state.filters.awardType
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(AwardTypeContainerV2);
