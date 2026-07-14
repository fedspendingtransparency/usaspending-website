/**
 * OutlayLine.jsx
 * Created by Kevin Li 7/26/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import * as MoneyFormatter from 'helpers/moneyFormatter';

const propTypes = {
    xValue: PropTypes.string,
    description: PropTypes.string,
    value: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    color: PropTypes.string
};

// calculate the length of an equilateral triangle of with length 10px on each side
const triangleX = Math.sqrt(100 - 25);

const OutlayLine = (props) => (
    <g
        transform={`translate(${props.x},${props.y})`}>
        <desc>
            {`${props.description} in ${props.xValue}: ${MoneyFormatter.formatMoney(props.value)}`}
        </desc>
        <line
            className="outlay-line"
            x1={0}
            x2={props.width}
            y1={0}
            y2={0}
            strokeWidth={2}
            stroke={props.color} />
        <g
            transform={`translate(${props.width + 5},0)`}>
            <polygon
                className="outlay-triangle"
                fill={props.color}
                points={`0,0 ${triangleX},-5 ${triangleX},5`} />
        </g>

    </g>
);

OutlayLine.propTypes = propTypes;

export default OutlayLine;
