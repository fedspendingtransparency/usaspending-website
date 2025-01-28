/**
 * ShownValue.jsx
 * Created by Emily Gullo 07/10/2017
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from 'data-transparency-ui';

const propTypes = {
    removeValue: PropTypes.func,
    label: PropTypes.string
};

const ShownValue = ({ removeValue, label }) => (
    <div
        className="shown-filter-button"
        value={label}
        aria-label={`Applied filter: ${label}`}>
        {label}
        <div
            title="Click to remove filter">
            <Button
                onClick={removeValue}
                buttonSize="sm"
                buttonType="icon"
                backgroundColor="light"
                buttonTitle="close"
                copy="Click to remove filter."
                additionalClassnames="shown-filter-button__shown-filter-button-icon"
                image={<FontAwesomeIcon icon="times" />} />
        </div>

    </div>
);

ShownValue.propTypes = propTypes;
export default ShownValue;
