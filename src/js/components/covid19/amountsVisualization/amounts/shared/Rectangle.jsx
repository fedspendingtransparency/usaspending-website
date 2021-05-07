/**
 * Rectangle.jsx
 * Created by Jonathan Hill 04/22/21
 */

import React, { useState, useEffect } from 'react';
import { upperFirst } from 'lodash';
import PropTypes from 'prop-types';
import { ARP_RELEASED } from 'GlobalConstants';

import {
    calculateUnits,
    formatMoneyWithPrecision
} from 'helpers/moneyFormatter';
import {
    amountsPadding,
    rectangleMapping,
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
    publicLawFilter: PropTypes.string
};

const Rectangle = ({
    overviewData,
    scale = () => {},
    displayTooltip = () => {},
    hideTooltip = () => {},
    showTooltip = '',
    dataId = '',
    publicLawFilter = 'all'
}) => {
    const [data, setData] = useState(defaultRectangleData);
    useEffect(() => {
        if (scale) {
            const { offset, fill, text: textInfo } = rectangleMapping[dataId];
            const { left } = amountsPadding;
            const amount = Math.abs(overviewData[dataId]);
            const rectWidth = rectangleWidth(overviewData, scale, dataId);
            const units = calculateUnits([amount]);
            const moneyLabel = `${formatMoneyWithPrecision(amount / units.unit, 1)} ${upperFirst(units.longLabel)}`;
            let color = fill.defCode;
            if (ARP_RELEASED) {
                color = publicLawFilter === 'all' ? fill.default : fill.defCode;
            }
            const properties = {
                x: left + offset.left,
                y: startOfChartY + offset.top,
                width: rectWidth < (lineStrokeWidth / 2) ? lineStrokeWidth : rectWidth,
                height: rectangleHeight - (2 * offset.bottom),
                fill: color,
                description: `A rectangle with width representative of the ${textInfo.label} amount ${moneyLabel}`
            };
            if (!isNaN(scale(amount))) setData(properties);
        }
    }, [scale, overviewData]);

    return (
        <g
            tabIndex="0"
            aria-label={data.description}
            data-id={dataId}
            onFocus={displayTooltip}
            onBlur={hideTooltip}>
            <desc>{data.description}</desc>
            <rect
                className={showTooltip === dataId ? 'highlight' : ''}
                data-id={dataId}
                x={data.x}
                y={data.y}
                width={data.width}
                height={data.height}
                fill={data.fill}
                onMouseMove={displayTooltip}
                onMouseLeave={hideTooltip} />
        </g>
    ); };

Rectangle.propTypes = propTypes;
export default Rectangle;
