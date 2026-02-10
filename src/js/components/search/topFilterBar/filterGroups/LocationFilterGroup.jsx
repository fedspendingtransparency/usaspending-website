/**
 * LocationFilterGroup.jsx
 * Created by Kevin Li 1/25/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";

import { updateGenericFilter } from "redux/actions/search/searchFilterActions";
import BaseTopFilterGroup from '../BaseTopFilterGroup';

const propTypes = { filter: PropTypes.object };

const LocationFilterGroup = ({ filter }) => {
    const { selectedLocations, selectedRecipientLocations } = useSelector((state) => state.filters);
    const dispatch = useDispatch();

    const filterType = filter.code === 'selectedLocations' ?
        selectedLocations :
        selectedRecipientLocations;

    const toggleFilter = (value, staged) => {
        let newValue = filterType;

        filterType.forEach((v, i) => {
            if (staged && v.identifier === value.identifier) newValue = newValue.delete(i);
            else newValue = newValue.add(i);
        });

        if (!staged) newValue = newValue.set(value.identifier, value);

        dispatch(updateGenericFilter({
            type: filter.code,
            value: newValue
        }));
    };

    const tags = [];

    filter.values.forEach((value) => {
        const staged = filterType.includes(value);
        let tag = {
            value,
            title: `${value?.display?.entity?.toUpperCase()} | ${value?.display?.standalone}`,
            toggleFilter,
            staged
        };

        if (value.isScope) {
            tag = {
                value,
                title: "ALL FOREIGN LOCATIONS",
                toggleFilter,
                staged
            };
        }

        tags.push(tag);
    });

    return (<BaseTopFilterGroup tags={tags} filter={filter} />);
};

LocationFilterGroup.propTypes = propTypes;
export default LocationFilterGroup;
