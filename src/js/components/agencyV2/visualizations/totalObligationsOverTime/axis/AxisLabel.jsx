/**
 * AxisLabel.jsx
 * Created by Jonathan Hill 04/09/21
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    axis: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    label: PropTypes.string,
    index: PropTypes.number
};

const AxisLabel = ({
    axis = 'x',
    x = 0,
    y = 0,
    label = ''
}) => (
    <text
        className={`${axis}-axis-label`}
        tabIndex="0"
        x={x}
        y={y}>
        {label}
    </text>
);

AxisLabel.propTypes = propTypes;
export default AxisLabel;
