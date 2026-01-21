/**
 * RecipientType.jsx
 * Created by michaelbray on 2/16/17.
 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { recipientTypeMapping } from "helpers/search/filterCheckboxHelper";
import { recipientTypes } from 'dataMapping/search/recipientType';
import ListCheckbox from "components/sharedComponents/checkbox/ListCheckbox";
import { toggleRecipientType } from "redux/actions/search/searchFilterActions";

const RecipientType = () => {
    const recipientType = useSelector((state) => state.filters.recipientType);
    const dispatch = useDispatch();

    const toggleRecipientTypeFunc = (selection) => {
        dispatch(toggleRecipientType(selection));
    };
    return (
        <ListCheckbox
            filterCategoryMapping={recipientTypeMapping}
            filters={recipientTypes}
            selectedFilters={recipientType}
            singleFilterChange={toggleRecipientTypeFunc} />
    );
};

export default RecipientType;
