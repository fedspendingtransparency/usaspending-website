/**
 * ExtentCompeted.jsx
 * Created by Emily Gullo on 6/22/17
 */

import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ListCheckbox from 'components/sharedComponents/checkbox/ListCheckbox';
import {
    extentCompetedDefinitions, extentCompetedTypeMapping
} from 'dataMapping/search/contractFields';
import { updateExtentCompeted } from "redux/actions/search/searchFilterActions";

const ExtentCompeted = () => {
    const extentCompeted = useSelector((state) => state.filters.extentCompeted);
    const dispatch = useDispatch();

    const singleFilterChange = useCallback((selection) => {
        dispatch(updateExtentCompeted(selection));
    }, [dispatch]);

    return (
        <ListCheckbox
            filterCategoryMapping={extentCompetedTypeMapping}
            filters={extentCompetedDefinitions}
            selectedFilters={extentCompeted}
            singleFilterChange={singleFilterChange} />
    );
};

export default ExtentCompeted;
