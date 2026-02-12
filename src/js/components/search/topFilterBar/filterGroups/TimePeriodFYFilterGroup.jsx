/**
 * TimePeriodFYGroup.jsx
 * Created by Kevin Li 1/24/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";

import { updateTimePeriod } from "redux/actions/search/searchFilterActions";
import BaseTopFilterGroup from '../BaseTopFilterGroup';

const propTypes = {
    filter: PropTypes.object
};

const TimePeriodFYFilterGroup = ({ filter }) => {
    const timePeriodFY = useSelector((state) => state.filters.timePeriodFY);
    const dispatch = useDispatch();

    const toggleFilter = (value, staged) => {
        const newYears = staged ?
            timePeriodFY.delete(value) :
            timePeriodFY.add(value);

        dispatch(updateTimePeriod({
            fy: newYears,
            dateType: 'fy'
        }));
    };

    const tags = [];

    filter.values.forEach((value) => {
        tags.push({
            value,
            title: `FY ${value}`,
            toggleFilter,
            staged: timePeriodFY.has(value)
        });
    });

    return (<BaseTopFilterGroup tags={tags} filter={filter} />);
};

TimePeriodFYFilterGroup.propTypes = propTypes;
export default TimePeriodFYFilterGroup;
