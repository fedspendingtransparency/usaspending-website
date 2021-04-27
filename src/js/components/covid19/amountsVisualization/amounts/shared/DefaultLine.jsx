/**
 * DefaultLine.jsx
 * Created by Jonathan Hill 04/27/21
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
    rectangleMapping,
    startOfChartY,
    rectangleHeight,
    lineStrokeWidth,
    defaultLineData
} from 'dataMapping/covid19/amountsVisualization';

import { lineXPosition } from 'helpers/covid19/amountsVisualization';

const propTypes = {
    scale: PropTypes.func,
    overviewData: PropTypes.object,
    dataId: PropTypes.string,
    displayTooltip: PropTypes.func,
    hideTooltip: PropTypes.func
};

const DefaultLine = ({
    scale,
    overviewData,
    dataId,
    displayTooltip,
    hideTooltip
}) => {
    const [lineData, setLineData] = useState(defaultLineData);

    useEffect(() => {
        if (scale) {
            const {
                lineLength,
                lineColor
            } = rectangleMapping[dataId];
            const amount = Math.abs(overviewData[dataId]);
            const width = lineXPosition(overviewData, scale, dataId);
            const properties = {
                lineColor,
                x1: width,
                x2: width,
                y1: startOfChartY - lineLength,
                y2: startOfChartY + (rectangleHeight / 2)
            };
            if (!isNaN(scale(amount))) setLineData(properties);
        }
    }, [scale, overviewData]);
    return (
        <g
            tabIndex="0"
            aria-label="A line linking a Line to text"
            data-id={dataId}
            onFocus={displayTooltip}
            onBlur={hideTooltip}>
            <desc>A line linking a Line to text</desc>
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
    );
};

DefaultLine.propTypes = propTypes;
export default DefaultLine;
