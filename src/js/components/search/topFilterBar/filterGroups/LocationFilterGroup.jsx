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
    const {
        selectedLocations,
        selectedRecipientLocations,
        locationDomesticForeign,
        recipientDomesticForeign
    } = useSelector((state) => state.filters);
    const {
        selectedLocations: appliedSelectedLocations,
        selectedRecipientLocations: appliedRecipientLocations,
        locationDomesticForeign: appliedLocationDomesticForeign,
        recipientDomesticForeign: appliedRecipientDomesticForeign
    } = useSelector((state) => state.appliedFilters.filters);
    const dispatch = useDispatch();

    const filterType = filter.code === 'selectedLocations' ?
        {
            locations: selectedLocations,
            appliedLocations: appliedSelectedLocations,
            domesticForeign: locationDomesticForeign,
            appliedDomesticForeign: appliedLocationDomesticForeign,
            type: 'locationDomesticForeign'
        } :
        {
            locations: selectedRecipientLocations,
            appliedLocations: appliedRecipientLocations,
            domesticForeign: recipientDomesticForeign,
            appliedDomesticForeign: appliedRecipientDomesticForeign,
            type: 'recipientDomesticForeign'
        };

    const toggleFilter = (value, staged) => {
        const newValue = staged ?
            filterType.locations.delete(value.identifier) :
            filterType.locations.set(value.identifier, value);

        dispatch(updateGenericFilter({
            type: filter.code,
            value: newValue
        }));
    };

    const toggleDomestic = (value, staged) => {
        const newValue = staged ? 'all' : 'foreign';

        dispatch(updateGenericFilter({
            type: filterType.type,
            value: newValue
        }));
    };

    const tags = [];

    filterType.appliedLocations.forEach((value) => {
        const tag = {
            value,
            title: `${value?.display?.entity?.toUpperCase()} | ${value?.display?.standalone}`,
            toggleFilter,
            staged: filterType.locations.includes(value)
        };

        tags.push(tag);
    });

    if (filterType.appliedDomesticForeign !== "all") {
        const tag = {
            value: filterType.appliedDomesticForeign,
            title: "ALL FOREIGN LOCATIONS",
            toggleFilter: toggleDomestic,
            staged: filterType.domesticForeign === 'foreign'
        };

        tags.push(tag);
    }

    return (<BaseTopFilterGroup tags={tags} filter={filter} />);
};

LocationFilterGroup.propTypes = propTypes;
export default LocationFilterGroup;
