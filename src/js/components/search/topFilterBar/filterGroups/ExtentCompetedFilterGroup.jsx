/**
 * ExtentCompetedFilterGroup.jsx
 * Created by Emily Gullo on 6/27/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";

import { extentCompetedDefinitions } from "dataMapping/search/contractFields";
import { updateGenericFilter } from "redux/actions/search/searchFilterActions";
import BaseTopFilterGroup from '../BaseTopFilterGroup';

const propTypes = { filter: PropTypes.object };

const ExtentCompetedFilterGroup = ({ filter }) => {
    const extentCompeted = useSelector((state) => state.filters.extentCompeted);
    const appliedExtentCompeted = useSelector(
        (state) => state.appliedFilters.filters.extentCompeted
    );
    const dispatch = useDispatch();

    const toggleFilter = (value, staged) => {
        const newValue = staged ?
            extentCompeted.delete(value) :
            extentCompeted.add(value);

        dispatch(updateGenericFilter({
            type: 'extentCompeted',
            value: newValue
        }));
    };

    const tags = [];

    appliedExtentCompeted.forEach((value) => {
        const tag = {
            value,
            title: extentCompetedDefinitions[value],
            toggleFilter,
            staged: extentCompeted.has(value)
        };

        tags.push(tag);
    });

    return (<BaseTopFilterGroup tags={tags} filter={filter} />);
};

ExtentCompetedFilterGroup.propTypes = propTypes;
export default ExtentCompetedFilterGroup;
