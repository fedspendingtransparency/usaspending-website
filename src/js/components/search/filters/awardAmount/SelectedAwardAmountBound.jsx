/**
 * SelectedAwardAmountBound.jsx
 * Created by Jonathan Hill on 09/13/19.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


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
        <button
            className="shown-filter-button"
            value={label}
            onClick={removeFilterFn}
            title="Click to remove."
            aria-label={`Applied filter: ${label}`}>
            {label}
            <span className="close">
                <FontAwesomeIcon icon="times" />
            </span>
        </button>
    );
};

SelectedAwardAmountBound.propTypes = propTypes;
export default SelectedAwardAmountBound;
