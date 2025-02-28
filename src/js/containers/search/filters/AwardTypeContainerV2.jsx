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
    contractAwardType: PropTypes.object,
    toggleContractAwardType: PropTypes.func,
    bulkContractAwardTypeChange: PropTypes.func,
    financialAssistanceAwardType: PropTypes.object,
    toggleFinancialAssistanceAwardType: PropTypes.func,
    bulkFinancialAssistanceAwardTypeChange: PropTypes.func,
    isContractAwardType: PropTypes.bool.isRequired
};

const AwardTypeContainerV2 = ({
    contractAwardType,
    toggleContractAwardType,
    bulkContractAwardTypeChange,
    financialAssistanceAwardType,
    toggleFinancialAssistanceAwardType,
    bulkFinancialAssistanceAwardTypeChange,
    isContractAwardType
}) => {
    const toggleContract = (selection) => {
        toggleContractAwardType(selection);
    };

    const bulkContract = (selection) => {
        bulkContractAwardTypeChange(selection);
    };

    const toggleFinancialAssistance = (selection) => {
        toggleFinancialAssistanceAwardType(selection);
    };

    const bulkFinancialAssistance = (selection) => {
        bulkFinancialAssistanceAwardTypeChange(selection);
    };

    if (isContractAwardType) {
        return (
            <ContractAwardType
                awardType={contractAwardType}
                toggleCheckboxType={toggleContract}
                bulkTypeChange={bulkContract} />
        );
    }

    return (
        <FinancialAssistanceAwardType
            awardType={financialAssistanceAwardType}
            toggleCheckboxType={toggleFinancialAssistance}
            bulkTypeChange={bulkFinancialAssistance} />
    );
};

AwardTypeContainerV2.propTypes = propTypes;
export default connect(
    (state) => ({
        contractAwardType: state.filters.contractAwardType,
        financialAssistanceAwardType: state.filters.financialAssistanceAwardType
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(AwardTypeContainerV2);
