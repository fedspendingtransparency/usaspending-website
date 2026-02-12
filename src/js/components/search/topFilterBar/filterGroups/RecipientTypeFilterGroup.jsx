/**
 * RecipientTypeFilterGroup.jsx
 * Created by michaelbray on 5/18/17.
 */

import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';

import { updateGenericFilter } from "redux/actions/search/searchFilterActions";
import { groupLabels, recipientTypes } from "dataMapping/search/recipientType";
import BaseTopFilterGroup from '../BaseTopFilterGroup';

const propTypes = { filter: PropTypes.object };

const RecipientTypeFilterGroup = ({ filter }) => {
    const recipientType = useSelector((state) => state.filters.recipientType);
    const dispatch = useDispatch();

    const toggleFilter = (value, staged) => {
        const newValue = staged ?
            recipientType.delete(value) :
            recipientType.add(value);

        dispatch(updateGenericFilter({
            type: 'recipientType',
            value: newValue
        }));
    };

    const tags = [];

    filter.values.forEach((value) => {
        const tag = {
            value,
            title: recipientTypes[value],
            toggleFilter,
            staged: recipientType.has(value)
        };

        // check if this is a parent group
        if (groupLabels[value]) {
            // this is a parent
            tag.title = `All ${groupLabels[value]}`;
        }

        tags.push(tag);
    });

    return (<BaseTopFilterGroup tags={tags} filter={filter} />);
};

RecipientTypeFilterGroup.propTypes = propTypes;
export default RecipientTypeFilterGroup;
