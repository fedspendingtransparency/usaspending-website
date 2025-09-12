/**
 * SankeyBar.jsx
 * Created by Kevin Li 3/27/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
    description: PropTypes.string,
    color: PropTypes.string
};

const SankeyBar = ({
    width, height, x, y, description = '', color
}) => {
    if (height <= 0 || width <= 0) {
        // don't display anything if there's no value
        return null;
    }

    return (
        <g
            transform={`translate(${x},${y})`}
            aria-label={description}>
            <desc>{description}</desc>
            <rect
                fill={color}
                x="0"
                y="0"
                width={width}
                height={height} />
        </g>
    );
};

SankeyBar.propTypes = propTypes;
export default SankeyBar;
