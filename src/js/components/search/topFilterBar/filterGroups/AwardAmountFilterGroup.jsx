/**
 * AwardAmountFilterGroup.jsx
 * Created by michaelbray on 3/9/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { OrderedMap } from "immutable";

import { formatAwardAmountRange } from "helpers/awardAmountHelper";
import { updateGenericFilter } from "redux/actions/search/searchFilterActions";
import BaseTopFilterGroup from '../BaseTopFilterGroup';

const propTypes = { filter: PropTypes.object };

const AwardAmountFilterGroup = ({ filter }) => {
    const awardAmounts = useSelector((state) => state.filters.awardAmounts);
    const appliedAwardAmounts = useSelector((state) => state.appliedFilters.filters.awardAmounts);
    const dispatch = useDispatch();

    const toggleFilter = (value, staged) => {
        const newValue = staged ?
            new OrderedMap() :
            appliedAwardAmounts;

        dispatch(updateGenericFilter({
            type: 'awardAmounts',
            value: newValue
        }));
    };

    const tags = [];

    appliedAwardAmounts.forEach((amounts, i) => {
        const value = i === 'specific' ?
            amounts : i;

        const tag = {
            value,
            title: formatAwardAmountRange(amounts),
            toggleFilter,
            staged: awardAmounts.has(i)
        };

        tags.push(tag);
    });

    return (<BaseTopFilterGroup tags={tags} filter={filter} />);
};

AwardAmountFilterGroup.propTypes = propTypes;
export default AwardAmountFilterGroup;
