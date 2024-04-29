/**
 * NewSearchScreen.jsx
 * Created by Josue Aguilar 4/23/2024
 */

import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import Button from "../../sharedComponents/buttons/Button";
import { updateTimePeriod } from "../../../redux/actions/search/searchFilterActions";
import { applyStagedFilters, setAppliedFilterCompletion } from "../../../redux/actions/search/appliedFilterActions";

const NewSearchScreen = () => {
    const dispatch = useDispatch();
    const filters = useSelector((state) => state.filters);

    const lastYear = new Date().getFullYear() - 1;
    const timePeriodFilter = {
        dateType: "fy",
        fy: new Set([lastYear]),
        start: null,
        end: null
    };
    const handleOnClick = () => {
        dispatch(setAppliedFilterCompletion(false));
        dispatch(updateTimePeriod(timePeriodFilter));
        dispatch(applyStagedFilters(filters));
        dispatch(setAppliedFilterCompletion(true));
    };

    return (
        <div className="new-search-container">
            <img
                className="new-search-icon"
                src="graphics/award-search-default-empty-state.svg"
                alt="alt-text" />
            <p>Start your search by adding filters</p>
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
