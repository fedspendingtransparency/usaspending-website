/**
 * TimePeriodDRFilterGroup.jsx
 * Created by Kevin Li 1/24/17
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Set } from 'immutable';

import { updateGenericFilter } from "redux/actions/search/searchFilterActions";
import { dateRangeChipLabel } from "helpers/searchHelper";
import BaseTopFilterGroup from '../BaseTopFilterGroup';
import useNewAwardsOnly from "./useNewAwardsOnly";

const propTypes = { name: PropTypes.string, resultsView: PropTypes.bool };

const TimePeriodDRFilterGroup = ({ name, resultsView }) => {
    const timePeriod = useSelector((state) => state.filters.time_period);
    const appliedTimePeriod = useSelector((state) => state.appliedFilters.filters.time_period);
    const dispatch = useDispatch();

    const toggleFilter = ({ startDate, endDate }, staged) => {
        let newValue = timePeriod;

        timePeriod.forEach((date) => {
            if (staged && date.start_date === startDate && date.end_date === endDate) {
                newValue = newValue.delete(date);
            }
            else {
                newValue = newValue.add(date);
            }
        });

        if (!staged) newValue = newValue.add({ end_date: endDate, start_date: startDate });

        const newDRValue = newValue?.size >= 1 ? newValue : new Set();
        dispatch(updateGenericFilter({
            type: 'time_period',
            value: newDRValue
        }));
        dispatch(updateGenericFilter({
            type: 'timePeriodType',
            value: 'dr'
        })); 
    };

    const filters = {
        values: appliedTimePeriod.map((value) => ({
            startDate: value.start_date,
            endDate: value.end_date,
            title: dateRangeChipLabel(value),
            key: `${value.start_date}-${value.end_date}`
        }))
    };

    // eslint-disable-next-line camelcase
    const keys = timePeriod.map(({ start_date, end_date }) => `${start_date}-${end_date}`);

    const tags = [];

    filters.values.forEach(({
        startDate, endDate, title, key
    }) => {
        tags.push({
            value: { startDate, endDate },
            title,
            toggleFilter,
            staged: keys.has(key)
        });
    });

    const newAwards = useNewAwardsOnly();

    if (newAwards) tags.push(newAwards);

    const drCount = timePeriod.size;

    useEffect(() => {
        // if there are no fy filters, then remove new awards filter
        if (drCount === 0 && newAwards) newAwards.toggleFilter(true);
    }, [drCount, newAwards]);

    return (<BaseTopFilterGroup resultsView={resultsView} tags={tags} name={name} />);
};

TimePeriodDRFilterGroup.propTypes = propTypes;
export default TimePeriodDRFilterGroup;
