/**
 * Axis.jsx
 * Created by Jonathan Hill 04/09/21
 */

import React from 'react';
import PropTypes from 'prop-types';
import XAxis from './XAxis';
import YAxis from './YAxis';

const propTypes = {
    padding: PropTypes.shape({
        right: PropTypes.number,
        left: PropTypes.number,
        top: PropTypes.number,
        bottom: PropTypes.number
    }),
    width: PropTypes.number,
    height: PropTypes.number,
    xTicks: PropTypes.array,
    yTicks: PropTypes.array
};

const Axis = ({
    padding = {
        right: 0,
        left: 0,
        top: 0,
        bottom: 0
    },
    width = 0,
    height = 0,
    xTicks = [],
    yTicks = []
}) => (
    <g className="total-obligations-over-time-svg-axis">
        <XAxis
            x1={padding.left}
            x2={width - padding.right}
            y1={height - padding.bottom}
            y2={height - padding.bottom}
            ticks={xTicks} />
        <YAxis
            x1={padding.left}
            x2={padding.left}
            y1={padding.top / 2} // top of graph
            y2={height - padding.bottom} // bottom of graph
            ticks={yTicks} />
    </g>
);

Axis.propTypes = propTypes;
export default Axis;
