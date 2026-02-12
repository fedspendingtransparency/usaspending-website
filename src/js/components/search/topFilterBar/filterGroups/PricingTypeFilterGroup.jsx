/**
 * PricingTypeFilterGroup.jsx
 * Created by Emily Gullo on 6/27/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";

import { pricingTypeDefinitions } from "dataMapping/search/contractFields";
import { updateGenericFilter } from "redux/actions/search/searchFilterActions";
import BaseTopFilterGroup from '../BaseTopFilterGroup';

const propTypes = { filter: PropTypes.object };

const PricingTypeFilterGroup = ({ filter }) => {
    const pricingType = useSelector((state) => state.filters.pricingType);
    const appliedPricingType = useSelector((state) => state.appliedFilters.filters.pricingType);
    const dispatch = useDispatch();

    const toggleFilter = (value, staged) => {
        const newValue = staged ?
            pricingType.delete(value) :
            pricingType.add(value);

        dispatch(updateGenericFilter({
            type: 'pricingType',
            value: newValue
        }));
    };

    const tags = [];

    appliedPricingType.forEach((key) => {
        const tag = {
            value: key,
            title: pricingTypeDefinitions[key],
            toggleFilter,
            staged: pricingType.has(key)
        };

        tags.push(tag);
    });

    return (<BaseTopFilterGroup tags={tags} filter={filter} />);
};

PricingTypeFilterGroup.propTypes = propTypes;
export default PricingTypeFilterGroup;
