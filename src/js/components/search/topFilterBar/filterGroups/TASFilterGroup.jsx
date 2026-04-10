/**
 * TASFilterGroup.jsx
 * Created by Lizzie Salita 6/14/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { setCheckedTas, setUncheckedTas } from 'redux/actions/search/tasActions';
import { updateTAS } from "redux/actions/search/searchFilterActions";
import { handleNewCheckedIds } from 'helpers/checkboxTreeHelper';
import BaseTopFilterGroup from '../BaseTopFilterGroup';

const propTypes = { name: PropTypes.string };

const getUniqueValues = (value, index, array) => array.indexOf(value) === index;

const TASFilterGroup = ({ name }) => {
    const { require, counts } = useSelector((state) => state.filters.tasCodes);
    const { require: appliedRequire, counts: appliedCounts } = useSelector((state) => state.appliedFilters.filters.tasCodes);
    const nodes = useSelector((state) => state.tas.tas.toJS());
    const checked = useSelector((state) => state.tas.checked.toJS());
    const unchecked = useSelector((state) => state.tas.unchecked.toJS());
    const dispatch = useDispatch();


    const toggleFilter = ({ value, array }, staged) => {
        console.log("checking value ======= ", value);
        console.log("checking staged ======= ", staged);
        console.log("checking array ======= ", array);
        const newTAS = staged ?
            {
                require: require.filter((v) => !array.includes(v)),
                counts: counts.filter((v) => v.value !== value.value)
            } :
            {
                require: [...require, ...array],
                counts: [...counts, value]
            };
        console.log("checking require ======= ", require);
        console.log("checking appliedRequire ======= ", appliedRequire);
        console.log("checking newNAICS ======= ", newTAS);
        dispatch(updateTAS(
            newTAS.require,
            [],
            newTAS.counts
        ));


        if (nodes.length !== 0) {
            // only want last index of each array.
            const filteredArray = array.map(
                (ancestryPath) => ancestryPath[ancestryPath.length - 1]
            );

            console.log("checking filteredArray ====== ", filteredArray);
            const { newChecked, newUnchecked } = handleNewCheckedIds(
                nodes,
                value.value,
                [...checked, ...filteredArray],
                unchecked,
                staged,
                false
            );

            console.log("checking newChecked ==== ", newChecked);

            dispatch(setCheckedTas(newChecked));
            dispatch(setUncheckedTas(newUnchecked));
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
