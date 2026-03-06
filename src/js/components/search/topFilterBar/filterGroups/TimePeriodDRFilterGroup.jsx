/**
 * TimePeriodDRFilterGroup.jsx
 * Created by Kevin Li 1/24/17
 */

import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { updateGenericFilter } from "redux/actions/search/searchFilterActions";
import { dateRangeChipLabel } from "helpers/searchHelper";
import BaseTopFilterGroup from '../BaseTopFilterGroup';

const propTypes = { name: PropTypes.string };

const TimePeriodDRFilterGroup = ({ name }) => {
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

        dispatch(updateGenericFilter({
            type: 'timePeriodType',
            value: 'dr'
        }));
        dispatch(updateGenericFilter({
            type: 'time_period',
            value: newValue
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

    return (<BaseTopFilterGroup tags={tags} name={name} />);
};

TimePeriodDRFilterGroup.propTypes = propTypes;
export default TimePeriodDRFilterGroup;
