/**
 * AwardIDFilterGroup.jsx
 * Created by michaelbray on 3/6/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";

import { updateGenericFilter } from "redux/actions/search/searchFilterActions";
import BaseTopFilterGroup from '../BaseTopFilterGroup';

const propTypes = { filter: PropTypes.object };

const AwardIDFilterGroup = ({ filter }) => {
    const selectedAwardIDs = useSelector((state) => state.filters.selectedAwardIDs);
    const appliedAwardIDs = useSelector((state) => state.appliedFilters.filters.selectedAwardIDs);
    const dispatch = useDispatch();

    const removeFilter = (value, staged) => {
        const newValue = staged ?
            selectedAwardIDs.delete(value) :
            selectedAwardIDs.set(value, value);

        dispatch(updateGenericFilter({
            type: 'selectedAwardIDs',
            value: newValue
        }));
    };

    const tags = [];

    appliedAwardIDs.forEach((value) => {
        const tag = {
            value,
            title: `${value} | Award ID`,
            toggleFilter: removeFilter,
            staged: selectedAwardIDs.has(value)
        };

        tags.push(tag);
    });

    return (<BaseTopFilterGroup tags={tags} filter={filter} />);
};

AwardIDFilterGroup.propTypes = propTypes;
export default AwardIDFilterGroup;
