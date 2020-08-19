/**
 * SankeyNode.jsx
 * Created By Jonathan Hill 06/04/20
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    name: PropTypes.string,
    x0: PropTypes.number,
    x1: PropTypes.number,
    y0: PropTypes.number,
    y1: PropTypes.number,
    color: PropTypes.string,
    whiteRectangle: PropTypes.bool,
    description: PropTypes.string
};

const smallerRectangle = 2;

const SankeyNode = ({
    name,
    x0,
    x1,
    y0,
    y1,
    color,
    whiteRectangle,
    description
}) => (
    <g tabIndex="0" aria-label={description}>
        <desc>{description}</desc>
        <rect
            x={x0 || 0}
            y={y0 || 0}
            width={x1 - x0 || 0}
            height={(y1 - y0).toString().startsWith('-') || isNaN(y1 - y0) ? 0 : y1 - y0}
            fill={color}>
            <title>{name}</title>
        </rect>
        {
            whiteRectangle &&
            <g tabIndex="0" aria-label="A white rectangle">
                <desc>A white rectangle</desc>
                <rect
                    x={x0 + smallerRectangle || 0}
                    y={y0 + smallerRectangle || 0}
                    width={(x1 - x0) - (smallerRectangle * 2) || 0}
                    height={((y1 - y0) - (smallerRectangle * 2)).toString().startsWith('-') || isNaN((y1 - y0) - (smallerRectangle * 2)) ? 0 : (y1 - y0) - (smallerRectangle * 2)}
                    fill="white">
                    <title>{name}</title>
                </rect>
            </g>
        }
    </g>
);

SankeyNode.propTypes = propTypes;
export default SankeyNode;
