/**
 * OutlayLine.jsx
 * Created by Lizzie Salita 9/5/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import * as MoneyFormatter from 'helpers/moneyFormatter';

const propTypes = {
    description: PropTypes.string,
    value: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
    height: PropTypes.number,
    color: PropTypes.string
};

// calculate the length of an equilateral triangle of with length 10px on each side
const triangleX = Math.sqrt(100 - 25);

const OutlayLine = (props) => (
    <g
        transform={`translate(${props.x},${props.y})`}>
        <desc>
            {`${props.description}: ${MoneyFormatter.formatMoney(props.value)}`}
        </desc>
        <line
            className="outlay-line"
            x1={0}
            x2={0}
            y1={0}
            y2={props.height}
            strokeWidth={2}
            stroke={props.color} />
        <g
            transform="translate(0, -5)">
            <polygon
                className="outlay-triangle"
                fill={props.color}
                points={`0,0 -5,-${triangleX} 5,-${triangleX}`} />
        </g>

    </g>
);

OutlayLine.propTypes = propTypes;

export default OutlayLine;
