/**
 * AwardAmountFilterGroup.jsx
 * Created by michaelbray on 3/9/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";

import { formatAwardAmountRange } from "helpers/awardAmountHelper";
import { updateAwardAmounts } from "redux/actions/search/searchFilterActions";
import BaseTopFilterGroup from '../BaseTopFilterGroup';

const propTypes = { filter: PropTypes.object };

const AwardAmountFilterGroup = ({ filter }) => {
    const awardAmounts = useSelector((state) => state.filters.awardAmounts);
    const appliedAwardAmounts = useSelector((state) => state.appliedFilters.filters.awardAmounts);
    const dispatch = useDispatch();

    const toggleFilter = (value) => dispatch(updateAwardAmounts({ value }));

    const tags = [];

    appliedAwardAmounts.forEach((amounts, i) => {
        const value = typeof i === 'string' ?
            i : amounts;

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
