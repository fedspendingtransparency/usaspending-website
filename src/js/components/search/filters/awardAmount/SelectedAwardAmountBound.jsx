/**
 * SelectedAwardAmountBound.jsx
 * Created by Jonathan Hill on 09/13/19.
 */

import React from 'react';
import PropTypes from 'prop-types';
import ShownValue from '../otherFilters/ShownValue';

const propTypes = {
    label: PropTypes.string,
    removeFilter: PropTypes.func,
    name: PropTypes.string
};

const SelectedAwardAmountBound = (props) => {
    const removeFilterFn = () => {
        const { removeFilter, name } = props;
        removeFilter(name);
    };

    const { label } = props;
    return (
        <ShownValue label={label} removeValue={removeFilterFn} />
    );
};

SelectedAwardAmountBound.propTypes = propTypes;
export default SelectedAwardAmountBound;
