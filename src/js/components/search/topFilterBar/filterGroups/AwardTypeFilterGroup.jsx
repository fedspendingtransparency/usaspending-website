/**
 * AwardTypeFilterGroup.jsx
 * Created by Kevin Li 1/24/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { indexOf, difference, concat } from 'lodash-es';
import { useDispatch, useSelector } from "react-redux";

import {
    awardTypeCodes, awardTypeGroups, analyticsAwardTypeGroupLabels as groupLabels
} from "dataMapping/search/awardType";
import { updateGenericFilter } from "redux/actions/search/searchFilterActions";
import BaseTopFilterGroup from '../BaseTopFilterGroup';

const propTypes = {
    filter: PropTypes.object
};

const AwardTypeFilterGroup = ({ filter }) => {
    const awardType = useSelector((state) => state.filters.awardType);
    const dispatch = useDispatch();

    const removeFilter = (value, staged) => {
        let newValue;

        if (staged) newValue = awardType.delete(value);
        else newValue = awardType.add(value);

        dispatch(updateGenericFilter({
            type: 'awardType',
            value: newValue
        }));
    };

    const removeGroup = (value, staged) => {
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
    const selectedValues = filter.values;
    const fullGroups = [];
    const unstagedGroups = [];

    Object.keys(groupLabels).forEach((key) => {
        const fullMembership = awardTypeGroups[key];

        // quick way of checking for full group membership is to return an array of missing
        // values; it'll be empty if all the values are selected
        const missingValues = difference(fullMembership, selectedValues);
        const unstaged = difference(fullMembership, awardType.toArray());

        if (missingValues.length === 0) {
            // this group is complete
            fullGroups.push(key);
        }

        if (unstaged.length > 0) unstagedGroups.push(key);
    });

    // add full groups to the beginning of the tag list
    let excludedValues = [];
    fullGroups.forEach((group) => {
        const unstaged = unstagedGroups.includes(group);
        const tag = {
            value: group,
            title: `All ${groupLabels[group]}`,
            unstageFilter: () => removeGroup(group, !unstaged),
            unstaged
        };

        tags.push(tag);

        // exclude these values from the remaining tags
        excludedValues = concat(excludedValues, awardTypeGroups[group]);
    });

    selectedValues.forEach((value) => {
        const unstaged = !awardType.includes(value);
        const tag = {
            title: awardTypeCodes[value],
            unstageFilter: () => removeFilter(value, !unstaged),
            unstaged
        };

        if (indexOf(excludedValues, value) < 0) {
            // only insert individual tags that aren't part of a fully-selected group
            // excluded values is an array of values that are already included in a full group,
            // so if this value isn't in that array, it can be shown individually
            tags.push(tag);
        }
    });

    return (<BaseTopFilterGroup tags={tags} filter={filter} />);
};

AwardTypeFilterGroup.propTypes = propTypes;
export default AwardTypeFilterGroup;
