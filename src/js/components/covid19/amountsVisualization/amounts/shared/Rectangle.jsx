/**
 * Rectangle.jsx
 * Created by Jonathan Hill 04/22/21
 */

import React, { useState, useEffect } from 'react';
import { upperFirst } from 'lodash';
import PropTypes from 'prop-types';

import {
    calculateUnits,
    formatMoneyWithPrecision
} from 'helpers/moneyFormatter';
import {
    amountsPadding,
    rectangleMapping,
    rectangleColorMapping,
    rectangleColorMappingArp,
    startOfChartY,
    rectangleHeight,
    defaultRectangleData,
    lineStrokeWidth
} from 'dataMapping/covid19/amountsVisualization';

import { rectangleWidth } from 'helpers/covid19/amountsVisualization';


const propTypes = {
    overviewData: PropTypes.object,
    scale: PropTypes.func,
    displayTooltip: PropTypes.func,
    hideTooltip: PropTypes.func,
    showTooltip: PropTypes.string,
    dataId: PropTypes.string,
    tooltipId: PropTypes.string,
    className: PropTypes.string,
    publicLaw: PropTypes.string
};

const Rectangle = ({
    overviewData,
    scale = () => {},
    displayTooltip = () => {},
    hideTooltip = () => {},
    showTooltip = '',
    dataId = '',
    tooltipId,
    className,
    publicLaw
}) => {
    const [data, setData] = useState(defaultRectangleData);
    useEffect(() => {
        if (scale) {
            const {
                offset, text: textInfo
            } = rectangleMapping[dataId];
            const { fill, color } = publicLaw === 'american-rescue-plan' ? rectangleColorMappingArp[dataId] : rectangleColorMapping[dataId];
            const { left } = amountsPadding;
            const amount = Math.abs(overviewData[dataId]);
            const rectWidth = rectangleWidth(overviewData, scale, dataId);
            const units = calculateUnits([amount]);
            const moneyLabel = `${formatMoneyWithPrecision(amount / units.unit, 1)} ${upperFirst(units.longLabel)}`;
            const properties = {
                x: left + offset.left,
                y: startOfChartY + offset.top,
                width: rectWidth < (lineStrokeWidth / 2) ? lineStrokeWidth : rectWidth,
                height: rectangleHeight - (2 * offset.bottom),
                fill,
                stroke: color,
                description: `A rectangle with width representative of the ${textInfo.label} amount ${moneyLabel}`
            };
            if (!isNaN(scale(amount))) setData(properties);
        }
    }, [scale, overviewData, publicLaw === 'american-rescue-plan']);
    return (
        <g
            tabIndex="0"
            aria-label={data.description}
            data-id={dataId}
            data-tooltip={tooltipId}
            onFocus={displayTooltip}
            onBlur={hideTooltip}>
            <desc>{data.description}</desc>
            <rect
                className={`${className || ''} ${showTooltip === tooltipId ? 'highlight' : ''}`}
                data-id={dataId}
                data-tooltip={tooltipId}
                x={data.x}
                y={data.y}
                width={data.width}
                height={data.height}
                fill={data.fill}
                stroke={data.stroke}
                strokeWidth={lineStrokeWidth}
                onMouseMove={displayTooltip}
                onMouseLeave={hideTooltip} />
        </g>
    );
};

Rectangle.propTypes = propTypes;
export default Rectangle;
