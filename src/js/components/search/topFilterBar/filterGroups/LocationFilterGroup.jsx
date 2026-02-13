/**
 * LocationFilterGroup.jsx
 * Created by Kevin Li 1/25/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";

import { updateGenericFilter } from "redux/actions/search/searchFilterActions";
import BaseTopFilterGroup from '../BaseTopFilterGroup';

const propTypes = { name: PropTypes.string, code: PropTypes.string };

const LocationFilterGroup = ({ name, code }) => {
    const foreignLocationsCode = code === 'selectedLocations' ?
        'locationDomesticForeign' : 'recipientDomesticForeign';

    const stagedLocations = useSelector((state) => state.filters[code]);
    const stagedForeignLocations = useSelector((state) => state.filters[foreignLocationsCode]);
    const appliedLocations = useSelector(
        (state) => state.appliedFilters.filters[code]
    );
    const appliedForeignLocations = useSelector(
        (state) => state.appliedFilters.filters[foreignLocationsCode]
    );
    const dispatch = useDispatch();

    const toggleFilter = (value, staged) => {
        const newValue = staged ?
            stagedLocations.delete(value.identifier) :
            stagedLocations.set(value.identifier, value);

        dispatch(updateGenericFilter({
            type: code,
            value: newValue
        }));
    };

    const toggleDomestic = (value, staged) => {
        const newValue = staged ? 'all' : 'foreign';

        dispatch(updateGenericFilter({
            type: foreignLocationsCode,
            value: newValue
        }));
    };

    const tags = [];

    appliedLocations.forEach((value) => {
        const tag = {
            value,
            title: `${value?.display?.entity?.toUpperCase()} | ${value?.display?.standalone}`,
            toggleFilter,
            staged: stagedLocations.includes(value)
        };

        tags.push(tag);
    });

    if (appliedForeignLocations !== "all") {
        const tag = {
            value: stagedForeignLocations,
            title: "ALL FOREIGN LOCATIONS",
            toggleFilter: toggleDomestic,
            staged: stagedForeignLocations === 'foreign'
        };

        tags.push(tag);
    }

    return (<BaseTopFilterGroup tags={tags} name={name} />);
};

LocationFilterGroup.propTypes = propTypes;
export default LocationFilterGroup;
