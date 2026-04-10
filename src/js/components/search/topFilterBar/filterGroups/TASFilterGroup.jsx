/**
 * TASFilterGroup.jsx
 * Created by Lizzie Salita 6/14/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import {
    setCheckedTas,
    setUncheckedTas,
    setExpandedTas
} from 'redux/actions/search/tasActions';
import { updateTAS } from "redux/actions/search/searchFilterActions";
import { handleNewCheckedIds } from 'helpers/checkboxTreeHelper';
import BaseTopFilterGroup from '../BaseTopFilterGroup';

const propTypes = { name: PropTypes.string };

const getUniqueValues = (value, index, array) => array.indexOf(value) === index;

const TASFilterGroup = ({ name }) => {
    const { require, exclude, counts } = useSelector((state) => state.filters.tasCodes);
    const {
        require: appliedRequire,
        exclude: appliedExclude,
        counts: appliedCounts
    } = useSelector((state) => state.appliedFilters.filters.tasCodes);
    const nodes = useSelector((state) => state.tas.tas.toJS());
    const checked = useSelector((state) => state.tas.checked.toJS());
    const unchecked = useSelector((state) => state.tas.unchecked.toJS());
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

        dispatch(updateTAS(
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
                staged,
                false
            );

            const toExpand = newRequire
                .flatMap((subArray) => subArray.slice(0, -1));

            dispatch(setCheckedTas(newChecked));
            dispatch(setUncheckedTas(newUnchecked));
            dispatch(setExpandedTas([...new Set(toExpand)]));
        }
    };

    const keys = counts.map((t) => `${t.value}-${t.count}`);
    const uniqueTAS = appliedRequire.filter(getUniqueValues);

    const tags = appliedCounts.map((value) => {
        const array = uniqueTAS.filter((v) => v.indexOf(value.value) === 0);
        return {
            value: { value, array },
            title: `${value.label} (${value.count})`,
            toggleFilter,
            staged: keys.includes(`${value.value}-${value.count}`)
        };
    });

    return (<BaseTopFilterGroup tags={tags} name={name} />);
};

TASFilterGroup.propTypes = propTypes;
export default TASFilterGroup;
