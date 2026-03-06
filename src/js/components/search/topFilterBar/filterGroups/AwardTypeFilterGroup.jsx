/**
 * AwardTypeFilterGroup.jsx
 * Created by Kevin Li 1/24/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { indexOf, difference } from 'lodash-es';
import { useDispatch, useSelector } from "react-redux";

import {
    awardTypeCodes, awardTypeGroups, analyticsAwardTypeGroupLabels as groupLabels
} from "dataMapping/search/awardType";
import { updateGenericFilter } from "redux/actions/search/searchFilterActions";
import BaseTopFilterGroup from '../BaseTopFilterGroup';

const propTypes = { name: PropTypes.string };

const AwardTypeFilterGroup = ({ name }) => {
    const awardType = useSelector((state) => state.filters.awardType);
    const appliedAwardType = useSelector((state) => state.appliedFilters.filters.awardType);
    const dispatch = useDispatch();

    const toggleFilter = (value, staged) => {
        const newValue = staged ?
            awardType.delete(value) :
            awardType.add(value);

        dispatch(updateGenericFilter({
            type: 'awardType',
            value: newValue
        }));
    };

    const toggleGroup = (value, staged) => {
        const awardValues = awardTypeGroups[value];
        let updatedValues = awardType;

        if (staged) updatedValues = updatedValues.filter((x) => !(indexOf(awardValues, x) > -1));
        else {
            awardValues.forEach((x) => {
                updatedValues = updatedValues.add(x);
            });
        }

        dispatch(updateGenericFilter({
            type: 'awardType',
            value: updatedValues
        }));
    };

    const tags = [];

    // check to see if any type groups are fully selected
    const fullGroups = [];
    const unstagedGroups = [];

    Object.keys(groupLabels).forEach((key) => {
        const fullMembership = awardTypeGroups[key].filter((code) => code.indexOf('F0') !== 0);

        // quick way of checking for full group membership is to return an array of missing
        // values; it'll be empty if all the values are selected
        const missingValues = difference(fullMembership, appliedAwardType.toArray());
        const unstaged = difference(fullMembership, awardType.toArray());

        if (missingValues.length === 0) fullGroups.push(key);

        if (unstaged.length > 0) unstagedGroups.push(key);
    });

    // add full groups to the beginning of the tag list
    let excludedValues = [];
    fullGroups.forEach((group) => {
        const tag = {
            value: group,
            title: `All ${groupLabels[group]}`,
            toggleFilter: toggleGroup,
            staged: !unstagedGroups.includes(group)
        };

        tags.push(tag);

        // exclude these values from the remaining tags
        excludedValues = [...excludedValues, ...awardTypeGroups[group]];
    });

    appliedAwardType.forEach((value) => {
        // exclude the new Assistance Type Codes (F0XX codes)
        if (value.indexOf('F0') === 0) return;

        const tag = {
            value,
            title: awardTypeCodes[value],
            toggleFilter,
            staged: awardType.includes(value)
        };

        // only insert individual tags that aren't part of a fully-selected group
        if (indexOf(excludedValues, value) < 0) tags.push(tag);
    });

    return (<BaseTopFilterGroup tags={tags} name={name} />);
};

AwardTypeFilterGroup.propTypes = propTypes;
export default AwardTypeFilterGroup;
