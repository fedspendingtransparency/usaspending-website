/**
 * ItemLegend.jsx
 * Created by Kevin Li 3/28/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    color: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    hide: PropTypes.bool,
    title: PropTypes.string,
    value: PropTypes.string
};

const ItemLegend = ({
    color = '#000000', x = 0, y = 0, hide = false, title, value
}) => {
    if (hide) {
        return null;
    }

    return (
        <g
            className="item-label"
            transform={`translate(${x},${y})`}>
            <circle r="5" fill={color} />
            <text
                className="title"
                x={20}
                y={0}>
                {title}
            </text>
            <text
                className="value"
                x={20}
                y={16}>
                {value}
            </text>
        </g>
    );
};

ItemLegend.propTypes = propTypes;
export default ItemLegend;
