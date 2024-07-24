/**
 * ShownAwardID.jsx
 * Created by michaelbray on 3/2/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    toggleAwardID: PropTypes.func,
    label: PropTypes.string
};

const ShownAwardID = (props) => {
    const { toggleAwardID, label } = props;

    return (
        <button
            className="shown-filter-button"
            value={label}
            onClick={toggleAwardID}
            title="Click to remove filter."
            aria-label={`Applied filter: ${label}`}>
            {label}
            <span className="close">
                <FontAwesomeIcon icon="times" />
            </span>
        </button>
    );
};

ShownAwardID.propTypes = propTypes;
export default ShownAwardID;
