/**
 * SetAsideContainer.jsx
 * Created by Emily Gullo on 6/22/17
 */

import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setAsideDefinitions, setAsideTypeMapping } from 'dataMapping/search/contractFields';
import ListCheckbox from "components/sharedComponents/checkbox/ListCheckbox";
import { updateSetAside } from "redux/actions/search/searchFilterActions";

const SetAsideContainer = () => {
    const setAside = useSelector((state) => state.filters.setAside);
    const dispatch = useDispatch();

    const singleFilterChange = useCallback((selection) => {
        dispatch(updateSetAside(selection));
    }, [dispatch]);

    return (
        <ListCheckbox
            filterCategoryMapping={setAsideTypeMapping}
            filters={setAsideDefinitions}
            selectedFilters={setAside}
            singleFilterChange={singleFilterChange} />
    );
};

export default SetAsideContainer;
