/**
 * PSCFilterGroup.jsx
 * Created by Emily Gullo 07/21/2017
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";

import { updatePSC } from "redux/actions/search/searchFilterActions";
import BaseTopFilterGroup from '../BaseTopFilterGroup';

const propTypes = { name: PropTypes.string };

const PSCFilterGroup = ({ name }) => {
    const { require, exclude, counts } = useSelector((state) => state.filters.pscCodes);
    const { require: appliedRequire, exclude: appliedExclude, counts: appliedCounts } = useSelector(
        (state) => state.appliedFilters.filters.pscCodes
    );
    const dispatch = useDispatch();

    const toggleFilter = (value, staged = true) => {
        let newRequire;
        let newExclude;
        let newCounts;

        if (staged) {
            newRequire = require.filter((v) => v[0] !== value.value);
            newExclude = exclude.filter((v) => v[0] !== value.value);
            newCounts = counts.filter((v) => v.value !== value.value);
        }
        else {
            newRequire = [...require, ...appliedRequire.filter((v) => v[0] === value.value)];
            newExclude = [...exclude, ...appliedExclude.filter((v) => v[0] === value.value)];
            newCounts = [...counts, ...appliedCounts.filter((v) => v.value === value.value)];
        }

        dispatch(updatePSC(
            newRequire,
            newExclude,
            newCounts
        ));
    };

    const keys = counts.map((t) => `${t.value}-${t.count}`);

    // check to see if a PSC code is provided
    const tags = appliedCounts.map((value) => ({
        value,
        title: `${value.value} (${value.count})`,
        toggleFilter,
        staged: keys.includes(`${value.value}-${value.count}`)
    }));

    return (<BaseTopFilterGroup tags={tags} name={name} />);
};

PSCFilterGroup.propTypes = propTypes;
export default PSCFilterGroup;
