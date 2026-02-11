/**
 * CFDAFilterGroup.jsx
 * Created by Emily Gullo 07/21/2017
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";

import { updateGenericFilter } from "redux/actions/search/searchFilterActions";
import BaseTopFilterGroup from '../BaseTopFilterGroup';

const propTypes = { filter: PropTypes.object };

const CFDAFilterGroup = ({ filter }) => {
    const selectedCFDA = useSelector((state) => state.filters.selectedCFDA);
    const dispatch = useDispatch();

    const toggleFilter = ({ key, value }, staged) => {
        const newValue = staged ?
            selectedCFDA.delete(key) :
            selectedCFDA.set(key, value);

        dispatch(updateGenericFilter({
            type: 'selectedCFDA',
            value: newValue
        }));
    };

    const tags = [];

    filter.values.forEach((value) => {
        const staged = selectedCFDA.has(value.identifier);
        const tag = {
            value: { key: value.identifier, value },
            title: `${value.program_number} | ${value.program_title}`,
            toggleFilter,
            staged
        };

        tags.push(tag);
    });

    return (<BaseTopFilterGroup tags={tags} filter={filter} />);
};

CFDAFilterGroup.propTypes = propTypes;
export default CFDAFilterGroup;
