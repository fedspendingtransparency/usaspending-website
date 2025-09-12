/**
 * DirectionLabel.jsx
 * Created by Kevin Li 3/28/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    paddingX: PropTypes.number,
    title: PropTypes.string,
    children: PropTypes.element
};

const DirectionLabel = ({
    x = 0, y = 0, paddingX, title, children
}) => (
    <g
        className="direction-label"
        transform={`translate(${x},${y})`}>
        <text
            className="title"
            x={0}
            y={0}
            aria-label={title}>
            {title.toUpperCase()}
        </text>
        <g
            className="direction-icon"
            transform={`translate(${paddingX},-10) scale(0.016 0.016)`}>
            {children}
        </g>
    </g>
);

DirectionLabel.propTypes = propTypes;
export default DirectionLabel;
