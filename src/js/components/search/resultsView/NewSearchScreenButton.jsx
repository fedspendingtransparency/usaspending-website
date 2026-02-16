import { Button } from "data-transparency-ui";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as fiscalYearHelper from "helpers/fiscalYearHelper";
import { updateTimePeriod } from "redux/actions/search/searchFilterActions";
import {
    applyStagedFilters, setAppliedFilterCompletion
} from "redux/actions/search/appliedFilterActions";

const NewSearchScreenButton = () => {
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
        <Button
            buttonSize="md"
            copy="See spending from last year"
            buttonTitle="See spending from last year"
            buttonType="primary"
            backgroundColor="light"
            onClick={handleOnClick} />
    );
};

export default NewSearchScreenButton;
