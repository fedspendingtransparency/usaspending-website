/**
 * NAICSFilterGroup.jsx
 * Created by Emily Gullo 07/21/2017
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";

import { updateNaics } from "redux/actions/search/searchFilterActions";
import BaseTopFilterGroup from '../BaseTopFilterGroup';

const propTypes = { name: PropTypes.string };

const getUniqueValues = (value, index, array) => array.indexOf(value) === index;

const NAICSFilterGroup = ({ name }) => {
    const { require, counts } = useSelector((state) => state.filters.naicsCodes);
    const { require: appliedRequire, counts: appliedCounts } = useSelector(
        (state) => state.appliedFilters.filters.naicsCodes
    );
    const dispatch = useDispatch();

    const toggleFilter = ({ value, array }, staged) => {
        const newNAICS = staged ?
            {
                require: require.filter((v) => !array.includes(v)),
                counts: counts.filter((v) => v.value !== value.value)
            } :
            {
                require: [...require, ...array],
                counts: [...counts, value]
            };

        dispatch(updateNaics(
            newNAICS.require,
            [],
            newNAICS.counts
        ));
    };

    const keys = counts.map((t) => `${t.value}-${t.count}`);
    const uniqueNAICS = appliedRequire.filter(getUniqueValues);

    const tags = appliedCounts.map((value) => {
        const array = uniqueNAICS.filter((v) => v.indexOf(value.value) === 0);
        return {
            value: { value, array },
            title: `${value.value} - ${value.label} (${value.count})`,
            toggleFilter,
            staged: keys.includes(`${value.value}-${value.count}`)
        };
    });

    return (<BaseTopFilterGroup tags={tags} name={name} />);
};

NAICSFilterGroup.propTypes = propTypes;
export default NAICSFilterGroup;
