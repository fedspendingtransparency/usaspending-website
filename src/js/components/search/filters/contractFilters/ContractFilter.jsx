/**
 * ContractFilter.jsx
 * Created by Emily Gullo on 6/23/2017
 */

import React from 'react';
import PropTypes from 'prop-types';
import { pricingTypeMapping, pricingTypeDefinitions } from "../../../../dataMapping/search/contractFields";

import ListCheckbox from "../../../sharedComponents/checkbox/ListCheckbox";

const propTypes = {
    toggleFilter: PropTypes.func
};

const ContractFilter = ({ toggleFilter, pricingType }) => (
    <ListCheckbox
        filterCategoryMapping={pricingTypeMapping}
        filters={pricingTypeDefinitions}
        selectedFilters={pricingType}
        singleFilterChange={toggleFilter} />
);

ContractFilter.propTypes = propTypes;

export default ContractFilter;
