/**
 * SetAsideFilterGroup.jsx
 * Created by Emily Gullo on 6/27/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";

import { updateGenericFilter } from "redux/actions/search/searchFilterActions";
import { setAsideDefinitions } from "dataMapping/search/contractFields";
import BaseTopFilterGroup from '../BaseTopFilterGroup';

const propTypes = { name: PropTypes.string };

const SetAsideFilterGroup = ({ name }) => {
    const setAside = useSelector((state) => state.filters.setAside);
    const appliedSetAside = useSelector((state) => state.appliedFilters.filters.setAside);
    const dispatch = useDispatch();

    const toggleFilter = (value, staged) => {
        const newValue = staged ?
            setAside.delete(value) :
            setAside.add(value);

        dispatch(updateGenericFilter({
            type: 'setAside',
            value: newValue
        }));
    };

    const tags = [];

    appliedSetAside.forEach((value) => {
        const tag = {
            value,
            title: setAsideDefinitions[value],
            toggleFilter,
            staged: setAside.has(value)
        };

        tags.push(tag);
    });

    return (<BaseTopFilterGroup tags={tags} name={name} />);
};

SetAsideFilterGroup.propTypes = propTypes;
export default SetAsideFilterGroup;
