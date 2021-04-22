/**
 * TextLineRectangle.jsx
 * created by Jonathan Hill 04/22/21
 */

import React from 'react';
import PropTypes from 'prop-types';

import Text from './Text';

const propTypes = {
    displayTooltip: PropTypes.func,
    hideTooltip: PropTypes.func,
    lineData: PropTypes.object,
    lineStrokeWidth: PropTypes.number,
    rectangleData: PropTypes.object,
    showTooltip: PropTypes.bool,
    dataId: PropTypes.string,
    text: PropTypes.array
};

const TextLineRectangle = ({
    displayTooltip = () => {},
    hideTooltip = () => {},
    lineData = {
        x1: 0,
        x2: 0,
        y1: 0,
        y2: 0
    },
    lineStrokeWidth = 0,
    rectangleData = {
        description: '',
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        fill: 'transparent'
    },
    showTooltip = false,
    dataId = '',
    text = []
}) => (
    <g>
        <title>The text, vertical line and rectangle representative of the COVID-19 Total Budgetary Resources</title>
        <g
            tabIndex="0"
            aria-label="A line linking a rectangle to text"
            data-id={dataId}
            onFocus={displayTooltip}
            onBlur={hideTooltip}>
            <desc>A line linking a rectangle to text</desc>
            <line
                data-id={dataId}
                x1={lineData.x1}
                x2={lineData.x2}
                y1={lineData.y1}
                y2={lineData.y2}
                stroke={lineData.lineColor}
                strokeWidth={lineStrokeWidth}
                onMouseMove={displayTooltip}
                onMouseLeave={hideTooltip} />
        </g>
        <g
            tabIndex="0"
            aria-label={rectangleData.description}
            data-id={dataId}
            onFocus={displayTooltip}
            onBlur={hideTooltip}>
            <desc>{rectangleData.description}</desc>
            <rect
                className={showTooltip === { dataId } ? 'highlight' : ''}
                data-id={dataId}
                x={rectangleData.x}
                y={rectangleData.y}
                width={rectangleData.width}
                height={rectangleData.height}
                fill={rectangleData.fill}
                onMouseMove={displayTooltip}
                onMouseLeave={hideTooltip} />
        </g>
        <Text text={text} />
    </g>
);

TextLineRectangle.propTypes = propTypes;
export default TextLineRectangle;
