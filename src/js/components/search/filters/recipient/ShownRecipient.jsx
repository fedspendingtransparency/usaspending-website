/**
 * ShownRecipient.jsx
 * Created by michaelbray on 2/17/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    toggleRecipient: PropTypes.func,
    label: PropTypes.string
};

const ShownRecipient = ({ toggleRecipient, label }) => (
    <button
        className="shown-filter-button"
        value={label}
        onClick={toggleRecipient}
        title="Click to remove filter."
        aria-label={`Applied filter: ${label}`}>
        {label}
        <span className="close">
            <FontAwesomeIcon icon="times" />
        </span>
    </button>
);

ShownRecipient.propTypes = propTypes;
export default ShownRecipient;
