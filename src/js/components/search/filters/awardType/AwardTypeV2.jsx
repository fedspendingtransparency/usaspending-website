/**
 * FinancialAssistanceAwardType.jsx
 * Created by Nick Torres 1/8/2025
 **/

import React from 'react';
import { useDispatch, useSelector } from "react-redux";

import { awardTypesData, awardTypeCodes } from 'dataMapping/search/awardType';
import AccordionCheckbox from "components/sharedComponents/checkbox/AccordionCheckbox";
import { bulkAwardTypeChange, toggleAwardType } from "redux/actions/search/searchFilterActions";

const AwardTypeV2 = () => {
    const awardType = useSelector((state) => state.filters.awardType);
    const dispatch = useDispatch();

    const singleFilterChange = (selection) => {
        dispatch(toggleAwardType(selection));
    };

    const bulkFilterChange = (selection) => {
        dispatch(bulkAwardTypeChange(selection));
    };

    return (
        <div className="award-type-filter search-filter checkbox-type-filter">
            <AccordionCheckbox
                filterCategoryMapping={awardTypesData}
                filters={awardTypeCodes}
                selectedFilters={awardType}
                singleFilterChange={singleFilterChange}
                bulkFilterChange={bulkFilterChange} />
        </div>
    );
};

export default AwardTypeV2;
