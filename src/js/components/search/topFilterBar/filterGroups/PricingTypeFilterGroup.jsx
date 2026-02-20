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

const propTypes = { name: PropTypes.string };

const PricingTypeFilterGroup = ({ name }) => {
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

    appliedPricingType.forEach((value) => {
        const tag = {
            value,
            title: pricingTypeDefinitions[value],
            toggleFilter,
            staged: pricingType.has(value)
        };

        tags.push(tag);
    });

    return (<BaseTopFilterGroup tags={tags} name={name} />);
};

PricingTypeFilterGroup.propTypes = propTypes;
export default PricingTypeFilterGroup;
