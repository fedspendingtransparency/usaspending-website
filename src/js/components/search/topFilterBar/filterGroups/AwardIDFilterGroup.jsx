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
    const dispatch = useDispatch();

    const removeFilter = (value, staged) => {
        let newValue;

        if (staged) newValue = selectedAwardIDs.delete(value);
        else newValue = selectedAwardIDs.set(value);

        dispatch(updateGenericFilter({
            type: 'selectedAwardIDs',
            value: newValue
        }));
    };

    const tags = [];

    filter.values.forEach((value) => {
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
