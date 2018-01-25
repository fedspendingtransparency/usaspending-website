/**
 * DesktopButton.jsx
 * Created by Kevin Li 1/25/18
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    code: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
};

const DesktopButton = (props) => (
    <button
        className={`homepage-download__button download-type download-type_${props.code}`}>
        {props.label}
    </button>
);

DesktopButton.propTypes = propTypes;
export default DesktopButton;
