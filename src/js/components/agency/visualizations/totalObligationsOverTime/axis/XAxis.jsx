/**
 * XAxis.jsx
 * Created by Jonathan Hill 04/09/21
 */

import React from 'react';
import PropTypes from 'prop-types';
import AxisLabel from './AxisLabel';

const propTypes = {
    className: PropTypes.string,
    ticks: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        x: PropTypes.number,
        y: PropTypes.number
    })),
    x1: PropTypes.number,
    x2: PropTypes.number,
    y1: PropTypes.number,
    y2: PropTypes.number
};

const XAxis = ({
    className,
    ticks,
    x1,
    x2,
    y1,
    y2
}) => (
    <g tabIndex="0" className={`x-axis${className ? ` ${className}` : ''}`}>
        <title>The X-Axis</title>
        <description>The X-Axis consisting of a horizontal line and labels</description>
        <line
            tabIndex="0"
            x1={x1}
            x2={x2}
            y1={y1}
            y2={y2} />
        <g tabIndex="0" className="x-axis-labels">
            <title>The X-Axis Labels</title>
            {
                ticks.map((tick, i) => (
                    <AxisLabel
                        key={`Tick-${i}-${tick.label}`}
                        x={tick.x}
                        y={tick.y}
                        label={tick.label} />
                ))
            }
        </g>
    </g>
);

XAxis.propTypes = propTypes;
export default XAxis;
