/**
 * NewSearchScreen.jsx
 * Created by Josue Aguilar 4/23/2024
 */

import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as fiscalYearHelper from 'helpers/fiscalYearHelper';
import Button from "../../sharedComponents/buttons/Button";
import { updateTimePeriod } from "../../../redux/actions/search/searchFilterActions";
import {
    applyStagedFilters,
    setAppliedFilterCompletion
} from "../../../redux/actions/search/appliedFilterActions";

const NewSearchScreen = () => {
    const dispatch = useDispatch();
    const lastYear = new Set([(fiscalYearHelper.currentFiscalYear() - 1).toString()]);

    const timePeriodFilter = {
        dateType: "fy",
        fy: lastYear,
        start: null,
        end: null
    };

    const filter = useSelector((state) => state.filters);

    const updatedFilter = {
        ...filter,
        timePeriod: timePeriodFilter
    };


    const handleOnClick = () => {
        dispatch(updateTimePeriod(timePeriodFilter));
        dispatch(setAppliedFilterCompletion(false));
        dispatch(applyStagedFilters(updatedFilter));
        dispatch(setAppliedFilterCompletion(true));
    };

    return (
        <div className="new-search-container">
            <img
                className="new-search-icon"
                src="graphics/award-search-default-empty-state.svg"
                alt="Start your search by adding filters" />
            <p className="new-search__start-text">Start your search by adding filters</p>
            <Button
                buttonSize="md"
                copy="See spending from last year"
                buttonTitle="See spending from last year"
                buttonType="primary"
                backgroundColor="light"
                onClick={handleOnClick} />
        </div>
    );
};

export default NewSearchScreen;
