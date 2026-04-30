/**
 * PSCFilterGroup.jsx
 * Created by Emily Gullo 07/21/2017
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";

import { updatePSC } from "redux/actions/search/searchFilterActions";
import {
    setCheckedPsc,
    setUncheckedPsc,
    setExpandedPsc
} from "redux/actions/search/pscActions";
import { handleNewCheckedIds } from 'helpers/checkboxTreeHelper';
import BaseTopFilterGroup from '../BaseTopFilterGroup';

const propTypes = { name: PropTypes.string, resultsView: PropTypes.bool };

const getUniqueValues = (value, index, array) => array.indexOf(value) === index;

const PSCFilterGroup = ({ name, resultsView }) => {
    const { require, exclude, counts } = useSelector((state) => state.filters.pscCodes);
    const { require: appliedRequire, exclude: appliedExclude, counts: appliedCounts } = useSelector(
        (state) => state.appliedFilters.filters.pscCodes
    );
    const nodes = useSelector((state) => state.psc.psc.toJS());
    const checked = useSelector((state) => state.psc.checked.toJS());
    const unchecked = useSelector((state) => state.psc.unchecked.toJS());
    const dispatch = useDispatch();

    const toggleFilter = ({ value, array }, staged) => {
        let newRequire;
        let newExclude;
        let newCounts;

        if (staged) {
            newRequire = require.filter((v) => !array.includes(v));
            newExclude = exclude.filter((v) => !array.includes(v));
            newCounts = counts.filter((v) => v.value !== value.value);
        }
        else {
            newRequire = [...require, ...array];
            newExclude = [...exclude, ...appliedExclude.filter((v) => !array.includes(v))];
            newCounts = [...counts, value];
        }

        dispatch(updatePSC(
            newRequire,
            newExclude,
            newCounts
        ));

        if (nodes.length !== 0) {
            // only want last index of each array.
            const filteredArray = array.map(
                (ancestryPath) => ancestryPath[ancestryPath.length - 1]
            );

            const { newChecked, newUnchecked } = handleNewCheckedIds(
                nodes,
                value.value,
                [...checked, ...filteredArray],
                unchecked,
                staged
            );

            const toExpand = newRequire
                .flatMap((subArray) => subArray.slice(0, -1));

            dispatch(setCheckedPsc(newChecked));
            dispatch(setUncheckedPsc(newUnchecked));
            dispatch(setExpandedPsc([...new Set(toExpand)]));
        }
    };

    const keys = counts.map((t) => `${t.value}-${t.count}`);
    const uniquePSC = appliedRequire.filter(getUniqueValues);

    // check to see if a PSC code is provided
    const tags = appliedCounts.map((value) => {
        const array = uniquePSC.filter((v) => v.indexOf(value.value) === 0);

        return {
            value: { value, array },
            title: `${value.value} (${value.count})`,
            toggleFilter,
            staged: keys.includes(`${value.value}-${value.count}`)
        };
    });

    return (<BaseTopFilterGroup resultsView={resultsView} tags={tags} name={name} />);
};

PSCFilterGroup.propTypes = propTypes;
export default PSCFilterGroup;
