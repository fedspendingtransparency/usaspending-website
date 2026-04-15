/**
 * TimePeriodFYGroup.jsx
 * Created by Kevin Li 1/24/17
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";

import { updateTimePeriod } from "redux/actions/search/searchFilterActions";
import BaseTopFilterGroup from '../BaseTopFilterGroup';
import useNewAwardsOnly from "./useNewAwardsOnly";

const propTypes = {
    name: PropTypes.string,
    resultsView: PropTypes.bool
};

const TimePeriodFYFilterGroup = ({ name, resultsView }) => {
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

    const newAwards = useNewAwardsOnly();

    if (newAwards) tags.push(newAwards);

    const fyCount = timePeriodFY.size;

    useEffect(() => {
        // if there are no fy filters, then remove new awards filter
        if (fyCount === 0) newAwards.toggleFilter(true);
    }, [fyCount, newAwards]);

    return (<BaseTopFilterGroup resultsView={resultsView} tags={tags} name={name} />);
};

TimePeriodFYFilterGroup.propTypes = propTypes;
export default TimePeriodFYFilterGroup;
