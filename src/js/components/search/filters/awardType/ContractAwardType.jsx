/**
 * ContractAwardType.jsx
 * Created by Nick Torres 1/8/2025
 **/

import React from 'react';
import PropTypes from 'prop-types';

import { awardTypeGroups, awardTypeCodes } from 'dataMapping/search/awardType';
import AccordionCheckbox from "../../../sharedComponents/checkbox/AccordionCheckbox";

const awardTypesData = [
    {
        id: 'award-contracts',
        name: 'Contracts',
        filters: awardTypeGroups.contracts
    },
    {
        id: 'indefinite-delivery-vehicle',
        name: 'Contract IDVs',
        filters: awardTypeGroups.idvs
    }
];

const propTypes = {
    awardType: PropTypes.object,
    toggleCheckboxType: PropTypes.func,
    bulkTypeChange: PropTypes.func
};

const ContractAwardType = ({ awardType, toggleCheckboxType, bulkTypeChange }) => (
    <div className="award-type-filter search-filter checkbox-type-filter">
        <AccordionCheckbox
            filterCategoryMapping={awardTypesData}
            filters={awardTypeCodes}
            selectedFilters={awardType}
            singleFilterChange={toggleCheckboxType}
            bulkFilterChange={bulkTypeChange} />
    </div>
);

ContractAwardType.propTypes = propTypes;
export default ContractAwardType;
