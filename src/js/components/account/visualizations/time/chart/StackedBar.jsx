/**
 * StackedBar.jsx
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
    height: PropTypes.number,
    color: PropTypes.string
};

const StackedBar = (props) => (
    <g>
        <desc>
            {`${props.description} in ${props.xValue}: ${MoneyFormatter.formatMoney(props.value)}`}
        </desc>
        <rect
            className="stacked-bar-item"
            x={props.x}
            y={props.y}
            width={props.width}
            height={props.height}
            fill={props.color} />
    </g>
);

StackedBar.propTypes = propTypes;

export default StackedBar;
