/**
 * CustomXTick.jsx
 * Created by Keith Didier 09/23/2024
 **/

import React from "react";
import PropTypes from "prop-types";

const customXTickPropTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    payload: PropTypes.object
};

const CustomXTick = (props) => {
    const {
        x, y, payload
    } = props;

    return (
        <g transform={`translate(${x},${y})`}>
            <text
                x={0}
                y={0}
                dx={12}
                dy={12}
                textAnchor="end"
                fill="#5C5C5C"
                fontSize={12}
                width="40px">
                {payload.value}
            </text>
        </g>);
};

CustomXTick.propTypes = customXTickPropTypes;
export default CustomXTick;
