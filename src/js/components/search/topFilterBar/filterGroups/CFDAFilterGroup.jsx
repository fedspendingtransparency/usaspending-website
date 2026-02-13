/**
 * CFDAFilterGroup.jsx
 * Created by Emily Gullo 07/21/2017
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";

import { updateGenericFilter } from "redux/actions/search/searchFilterActions";
import BaseTopFilterGroup from '../BaseTopFilterGroup';

const propTypes = { name: PropTypes.string };

const CFDAFilterGroup = ({ name }) => {
    const selectedCFDA = useSelector((state) => state.filters.selectedCFDA);
    const appliedCFDA = useSelector((state) => state.appliedFilters.filters.selectedCFDA);
    const dispatch = useDispatch();

    const toggleFilter = (value, staged) => {
        const newValue = staged ?
            selectedCFDA.delete(value.identifier) :
            selectedCFDA.set(value.identifier, value);

        dispatch(updateGenericFilter({
            type: 'selectedCFDA',
            value: newValue
        }));
    };

    const tags = [];

    appliedCFDA.forEach((value) => {
        const tag = {
            value,
            title: `${value.program_number} | ${value.program_title}`,
            toggleFilter,
            staged: selectedCFDA.has(value.identifier)
        };

        tags.push(tag);
    });

    return (<BaseTopFilterGroup tags={tags} name={name} />);
};

CFDAFilterGroup.propTypes = propTypes;
export default CFDAFilterGroup;
