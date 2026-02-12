/**
 * AwardAmountFilterGroup.jsx
 * Created by michaelbray on 3/9/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";

import { formatAwardAmountRange } from "helpers/awardAmountHelper";
import { updateGenericFilter } from "redux/actions/search/searchFilterActions";
import BaseTopFilterGroup from '../BaseTopFilterGroup';

const propTypes = { filter: PropTypes.object };

const AwardAmountFilterGroup = ({ filter }) => {
    const awardAmounts = useSelector((state) => state.filters.awardAmounts);
    const appliedAwardAmounts = useSelector((state) => state.appliedFilters.filters.awardAmounts);
    const dispatch = useDispatch();

    const toggleFilter = ({ key, value }, staged) => {
        const newValue = staged ?
            awardAmounts.delete(key) :
            awardAmounts.set(key, value);

        dispatch(updateGenericFilter({
            type: 'awardAmounts',
            value: newValue
        }));
    };

    const tags = [];

    appliedAwardAmounts.forEach((value, key) => {
        const tag = {
            value: { key, value },
            title: formatAwardAmountRange(value),
            toggleFilter,
            staged: awardAmounts.has(key)
        };

        tags.push(tag);
    });

    return (<BaseTopFilterGroup tags={tags} filter={filter} />);
};

AwardAmountFilterGroup.propTypes = propTypes;
export default AwardAmountFilterGroup;
