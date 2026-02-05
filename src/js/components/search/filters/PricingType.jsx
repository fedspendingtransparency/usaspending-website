/**
 * PricingType.jsx
 * Created by Emily Gullo on 6/22/17
 */

import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { pricingTypeDefinitions, pricingTypeMapping } from "dataMapping/search/contractFields";
import ListCheckbox from "components/sharedComponents/checkbox/ListCheckbox";
import { updatePricingType } from "redux/actions/search/searchFilterActions";

const PricingType = () => {
    const pricingType = useSelector((state) => state.filters.pricingType);
    const dispatch = useDispatch();

    const singleFilterChange = useCallback((selection) => {
        dispatch(updatePricingType(selection));
    }, [dispatch]);

    return (
        <ListCheckbox
            filterCategoryMapping={pricingTypeMapping}
            filters={pricingTypeDefinitions}
            selectedFilters={pricingType}
            singleFilterChange={singleFilterChange} />
    );
};

export default PricingType;
