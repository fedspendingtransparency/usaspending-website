/**
 * BarChartYAxisItem.jsx
 * Created by Kevin Li 7/26/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    label: PropTypes.object,
    gridLine: PropTypes.object,
    x: PropTypes.number,
    y: PropTypes.number
};

const BarChartYAxisItem = (props) => (
    <g
        className="axis-item y-axis"
        transform={`translate(0,${props.y})`}>
        <text
            transform={`translate(${props.label.x},${props.label.y})`}
            textAnchor="end">
            {props.label.text}
        </text>
        <line
            className="grid-line"
            x1={props.gridLine.x1}
            x2={props.gridLine.x2}
            y1={props.gridLine.y1}
            y2={props.gridLine.y2} />
    </g>
);

BarChartYAxisItem.propTypes = propTypes;

export default BarChartYAxisItem;
