/**
 * FinancialAssistanceAwardType.jsx
 * Created by Nick Torres 1/8/2025
 **/

import React from 'react';
import PropTypes from 'prop-types';

import { awardTypeGroups, awardTypeCodes } from 'dataMapping/search/awardType';
import AccordionCheckbox from "../../../sharedComponents/checkbox/AccordionCheckbox";

const awardTypesData = [
    {
        id: 'award-grants',
        name: 'Grants',
        filters: awardTypeGroups.grants
    },
    {
        id: 'award-direct-payments',
        name: 'Direct Payments',
        filters: awardTypeGroups.direct_payments
    },
    {
        id: 'award-loans',
        name: 'Loans',
        filters: awardTypeGroups.loans
    },
    {
        id: 'award-other',
        name: 'Other',
        filters: awardTypeGroups.other
    }
];

const propTypes = {
    awardType: PropTypes.object,
    toggleCheckboxType: PropTypes.func,
    bulkTypeChange: PropTypes.func
};

const FinancialAssistanceAwardType = ({ awardType, toggleCheckboxType, bulkTypeChange }) => (
    <div className="award-type-filter search-filter checkbox-type-filter">
        <AccordionCheckbox
            filterCategoryMapping={awardTypesData}
            filters={awardTypeCodes}
            selectedFilters={awardType}
            singleFilterChange={toggleCheckboxType}
            bulkFilterChange={bulkTypeChange} />
    </div>
);

FinancialAssistanceAwardType.propTypes = propTypes;
export default FinancialAssistanceAwardType;
