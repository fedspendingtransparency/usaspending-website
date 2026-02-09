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

    const unstageFilter = (value, staged) => {
        // remove a single filter item
        let newYears;

        // check if we are adding or removing
        if (staged) {
            // the year already exists in the set so we are removing
            newYears = timePeriodFY.delete(value);
        }
        else {
            // the year does not yet exist in the set so we are adding
            newYears = timePeriodFY.add(value);
        }

        dispatch(updateTimePeriod({
            fy: newYears,
            dateType: 'fy'
        }));
    };

    const tags = [];

    // not all fiscal years were selected, list them individually
    filter.values.forEach((value) => {
        const unstaged = !timePeriodFY.has(value);
        tags.push({
            value,
            title: `FY ${value}`,
            unstageFilter: () => unstageFilter(value, !unstaged),
            unstaged
        });
    });

    return (<BaseTopFilterGroup tags={tags} filter={filter} />);
};

TimePeriodFYFilterGroup.propTypes = propTypes;
export default TimePeriodFYFilterGroup;
