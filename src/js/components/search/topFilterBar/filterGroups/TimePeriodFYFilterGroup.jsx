/**
 * TimePeriodFYGroup.jsx
 * Created by Kevin Li 1/24/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";

import { updateTimePeriod } from "redux/actions/search/searchFilterActions";
import BaseTopFilterGroup from '../BaseTopFilterGroup';

const propTypes = { name: PropTypes.string };

const TimePeriodFYFilterGroup = ({ name }) => {
    const timePeriodFY = useSelector((state) => state.filters.timePeriodFY);
    const appliedTimePeriodFY = useSelector((state) => state.appliedFilters.filters.timePeriodFY);
    const dispatch = useDispatch();

    const toggleFilter = (value, staged) => {
        const newValue = staged ?
            timePeriodFY.delete(value) :
            timePeriodFY.add(value);

        dispatch(updateTimePeriod({
            fy: newValue,
            dateType: 'fy'
        }));
    };

    const tags = [];

    appliedTimePeriodFY.forEach((value) => {
        tags.push({
            value,
            title: `FY ${value}`,
            toggleFilter,
            staged: timePeriodFY.has(value)
        });
    });

    return (<BaseTopFilterGroup tags={tags} name={name} />);
};

TimePeriodFYFilterGroup.propTypes = propTypes;
export default TimePeriodFYFilterGroup;
