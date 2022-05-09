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
    defaultLineData,
    rectangleColorMapping,
    rectangleColorMappingArp
} from 'dataMapping/covid19/amountsVisualization';

import { lineXPosition } from 'helpers/covid19/amountsVisualization';

const propTypes = {
    scale: PropTypes.func,
    overviewData: PropTypes.object,
    dataId: PropTypes.string,
    tooltipId: PropTypes.string,
    displayTooltip: PropTypes.func,
    hideTooltip: PropTypes.func,
    description: PropTypes.string,
    className: PropTypes.string,
    publicLaw: PropTypes.string
};

const DefaultLine = ({
    scale,
    overviewData,
    dataId,
    tooltipId,
    displayTooltip,
    hideTooltip,
    description = 'A line linking a Line to text',
    className,
    publicLaw
}) => {
    const [lineData, setLineData] = useState(defaultLineData);

    useEffect(() => {
        if (scale) {
            const {
                lineLength,
                lineOffset,
                isLineAboveChart
            } = rectangleMapping[dataId];
            const { color } = publicLaw === 'american-rescue-plan' ? rectangleColorMappingArp[dataId] : rectangleColorMapping[dataId];
            const amount = Math.abs(overviewData[dataId]);
            const position = lineXPosition(overviewData, scale, dataId);
            const properties = {
                color,
                x1: position,
                x2: position,
                y1: isLineAboveChart ? startOfChartY - lineLength() : startOfChartY + (rectangleHeight - lineOffset || 0),
                y2: startOfChartY + (isLineAboveChart ? lineOffset || 0 : rectangleHeight + lineLength())
            };
            if (!isNaN(scale(amount))) setLineData(properties);
        }
    }, [scale, overviewData, publicLaw]);
    return (
        <g
            tabIndex="0"
            aria-label={description}
            data-id={dataId}
            data-tooltip={tooltipId}
            onFocus={displayTooltip}
            onBlur={hideTooltip}>
            <desc>{description}</desc>
            <line
                className={className}
                data-id={dataId}
                data-tooltip={tooltipId}
                x1={lineData.x1}
                x2={lineData.x2}
                y1={lineData.y1}
                y2={lineData.y2}
                stroke={lineData.color}
                strokeWidth={lineStrokeWidth}
                onMouseMove={displayTooltip}
                onMouseLeave={hideTooltip} />
        </g>
    );
};

DefaultLine.propTypes = propTypes;
export default DefaultLine;
