/**
 * DefCodesFilterGroup.jsx
 * Created by Maxwell Kendall 06/01/2020
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { difference, indexOf } from "lodash-es";

import { defCodes as defCodeLabels, defCodeGroups, groupLabels } from 'dataMapping/search/defCodes';
import { updateGenericFilter } from "redux/actions/search/searchFilterActions";
import BaseTopFilterGroup from '../BaseTopFilterGroup';

const propTypes = { name: PropTypes.string };

const DefCodesFilterGroup = ({ name }) => {
    const defCode = useSelector((state) => state.filters.defCode);
    const appliedDefCode = useSelector((state) => state.appliedFilters.filters.defCode);
    const dispatch = useDispatch();

    const toggleFilter = (value, staged) => {
        const newValue = staged ?
            defCode.delete(value) :
            defCode.add(value);

        dispatch(updateGenericFilter({
            type: 'defCode',
            value: newValue
        }));
    };

    const toggleGroups = (value, staged) => {
        const defCodes = defCodeGroups[value];
        let newValue = defCode;

        if (staged) newValue = newValue.filter((x) => !(indexOf(defCodes, x) > -1));
        else {
            defCodes.forEach((x) => {
                newValue = newValue.add(x);
            });
        }

        dispatch(updateGenericFilter({
            type: 'defCode',
            value: newValue
        }));
    };

    const tags = [];

    // check to see if any type groups are fully selected
    const fullGroups = [];
    const unstagedGroups = [];
    let excludedValues = [];

    Object.keys(defCodeGroups).forEach((key) => {
        const fullMembership = defCodeGroups[key];

        const missingValues = difference(fullMembership, appliedDefCode.toArray());
        const unstaged = difference(fullMembership, defCode.toArray());

        if (missingValues.length === 0) fullGroups.push(key);
        if (unstaged.length > 0) unstagedGroups.push(key);
    });

    // add full groups to the beginning of the tag list
    fullGroups.forEach((value) => {
        const tag = {
            value,
            title: `All ${groupLabels[value]}`,
            toggleFilter: toggleGroups,
            staged: !unstagedGroups.includes(value)
        };

        tags.push(tag);

        excludedValues = [...excludedValues, ...defCodeGroups[value]];
    });

    appliedDefCode.forEach((value) => {
        if (!excludedValues.includes(value)) {
            const tag = {
                value,
                title: defCodeLabels[value].title,
                toggleFilter,
                staged: defCode.has(value)
            };
            if (indexOf(excludedValues, value) < 0) tags.push(tag);
        }
    });

    return (<BaseTopFilterGroup tags={tags} name={name} />);
};

DefCodesFilterGroup.propTypes = propTypes;
export default DefCodesFilterGroup;
