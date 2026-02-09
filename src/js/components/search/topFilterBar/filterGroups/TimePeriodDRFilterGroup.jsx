/**
 * TimePeriodDRFilterGroup.jsx
 * Created by Kevin Li 1/24/17
 */

import React from 'react';
import { useDispatch, useSelector } from "react-redux";

import { updateGenericFilter } from "redux/actions/search/searchFilterActions";
import { dateRangeChipLabel } from "helpers/searchHelper";
import BaseTopFilterGroup from '../BaseTopFilterGroup';

const TimePeriodDRFilterGroup = () => {
    const timePeriod = useSelector((state) => state.filters.time_period);
    const appliedTimePeriod = useSelector((state) => state.appliedFilters.filters.time_period);
    const dispatch = useDispatch();

    const unstageFilters = ({ startDate, endDate }, staged) => {
        let newValue = timePeriod;

        timePeriod.forEach((date) => {
            if (staged && date.start_date === startDate && date.end_date === endDate) {
                newValue = newValue.delete(date);
            }
            else {
                newValue = newValue.add(date);
            }
        });

        // TODO: fix the 're-staging' currently not working correctly
        if (!staged) newValue = newValue.add({ end_date: endDate, start_date: startDate });

        dispatch(updateGenericFilter({
            type: 'timePeriodType',
            value: 'dr'
        }));
        dispatch(updateGenericFilter({
            type: 'time_period',
            value: newValue
        }));
    };

    const filter = {
        values: appliedTimePeriod.map((value) => ({
            title: dateRangeChipLabel(value),
            startDate: value.start_date,
            endDate: value.end_date,
            unstaged: !timePeriod.has(value)
        }))
    };

    const tags = [];

    filter.values.forEach(({
        title, startDate, endDate, unstaged
    }) => {
        tags.push({
            title,
            unstageFilter: () => unstageFilters({ startDate, endDate }, !unstaged),
            unstaged
        });
    });

    return (<BaseTopFilterGroup tags={tags} filter={filter} />);
};

export default TimePeriodDRFilterGroup;
