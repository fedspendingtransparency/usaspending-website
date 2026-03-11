/**
 * SelectedAwardAmountBound.jsx
 * Created by Jonathan Hill on 09/13/19.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";

import { formatAwardAmountRange } from "helpers/awardAmountHelper";
import { updateGenericFilter } from "redux/actions/search/searchFilterActions";
import ShownValue from '../ShownValue';

const propTypes = {
    label: PropTypes.string,
    removeFilter: PropTypes.func,
    name: PropTypes.string
};

const SelectedAwardAmountBound = ({ awardAmounts }) => {
    const dispatch = useDispatch();

    const stagedFilters = [];

    awardAmounts.forEach((value, key) => {
        const label = formatAwardAmountRange(value);

        const removeFilter = () => {
            const newValue = awardAmounts.delete(key);
            dispatch(updateGenericFilter({
                type: 'awardAmounts',
                value: newValue
            }));
        };

        stagedFilters.push(<ShownValue label={label} removeValue={removeFilter} />);
    });

    return (
        <>{stagedFilters}</>
    );
};

SelectedAwardAmountBound.propTypes = propTypes;
export default SelectedAwardAmountBound;
