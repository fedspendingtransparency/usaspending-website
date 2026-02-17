/**
 * ProgramSourceFilterGroup.jsx
 * Created by Lizzie Salita 6/14/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";

import { updateTAS } from "redux/actions/search/searchFilterActions";
import BaseTopFilterGroup from '../BaseTopFilterGroup';

const propTypes = { name: PropTypes.string };

const ProgramSourceFilterGroup = ({ name }) => {
    const { require, counts } = useSelector((state) => state.filters.tasCodes);
    const { counts: appliedCounts } = useSelector((state) => state.appliedFilters.filters.tasCodes);
    const dispatch = useDispatch();

    const toggleFilter = (value, staged) => {
        const newTAS = staged ?
            {
                require: require.filter((v) => v[0] !== value.value),
                counts: counts.filter((v) => v.value !== value.value)
            } :
            {
                require: [...require, [value.value]],
                counts: [...counts, value]
            };

        dispatch(updateTAS(
            newTAS.require,
            [],
            newTAS.counts
        ));
    };

    const keys = counts.map((t) => `${t.value}-${t.count}`);

    const tags = appliedCounts.map((value) => ({
        value,
        title: `${value.label} (${value.count})`,
        toggleFilter,
        staged: keys.includes(`${value.value}-${value.count}`)
    }));

    return (<BaseTopFilterGroup tags={tags} name={name} />);
};

ProgramSourceFilterGroup.propTypes = propTypes;
export default ProgramSourceFilterGroup;
