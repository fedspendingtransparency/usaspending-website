/**
 * ItemLabel.jsx
 * Created by Kevin Li 3/28/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    hide: PropTypes.bool,
    title: PropTypes.string,
    value: PropTypes.string
};

const ItemLabel = ({
    x = 0, y = 0, hide = false, title, value
}) => {
    if (hide) {
        return null;
    }

    return (
        <g
            className="item-label"
            transform={`translate(${x},${y})`}>
            <text
                className="title"
                x={0}
                y={0}>
                {title}
            </text>
            <text
                className="value"
                x={0}
                y={16}>
                {value}
            </text>
        </g>
    );
};

ItemLabel.propTypes = propTypes;
export default ItemLabel;
