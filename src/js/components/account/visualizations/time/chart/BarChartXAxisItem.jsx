/**
 * BarChartXAxisItem.jsx
 * Created by Kevin Li 7/26/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    label: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number
};

const BarChartXAxisItem = (props) => (
    <g
        className="axis-item y-axis"
        transform={`translate(${props.x},${props.y})`}>
        <text
            textAnchor="middle">
            {props.label}
        </text>
    </g>
);

BarChartXAxisItem.propTypes = propTypes;

export default BarChartXAxisItem;
