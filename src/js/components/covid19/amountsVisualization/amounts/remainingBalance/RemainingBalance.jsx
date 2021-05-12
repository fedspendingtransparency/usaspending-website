/**
 * RemainingBalance.jsx
 * created by Jonathan Hill 04/26/21
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { upperFirst } from 'lodash';

import {
    calculateUnits,
    formatMoneyWithPrecision
} from 'helpers/moneyFormatter';

import {
    amountsPadding,
    rectangleMapping,
    startOfChartY,
    rectangleHeight,
    lineStrokeWidth,
    defaultRectangleData
} from 'dataMapping/covid19/amountsVisualization';

import LinesAndText from './LinesAndText';

const propTypes = {
    displayTooltip: PropTypes.func,
    hideTooltip: PropTypes.func,
    showTooltip: PropTypes.string,
    dataId: PropTypes.string,
    overviewData: PropTypes.object,
    scale: PropTypes.func,
    width: PropTypes.number,
    setRemainingBalanceLabelData: PropTypes.func,
    setRemainingBalanceValueData: PropTypes.func
};

const dataId = '_remainingBalance';

const RemainingBalance = ({
    displayTooltip,
    hideTooltip,
    showTooltip,
    overviewData,
    scale,
    width,
    setRemainingBalanceLabelData,
    setRemainingBalanceValueData
}) => {
    const [rectangleData, setRectangleData] = useState(defaultRectangleData);
    const [show, setShow] = useState(false);
    useEffect(() => {
        if (scale) {
            const { offset, fill, text: textInfo } = rectangleMapping[dataId];
            const { right } = amountsPadding;
            const amount = Math.abs(overviewData[dataId]);
            const units = calculateUnits([amount]);
            const moneyLabel = `${formatMoneyWithPrecision(amount / units.unit, 1)} ${upperFirst(units.longLabel)}`;
            const totalWidth = scale(overviewData._totalBudgetAuthority) - (right + (offset.right || 0));
            const obligationWidth = scale(overviewData._totalObligations) - (right + (offset.right || 0));
            let adjustedWidth = (totalWidth || 0) - (obligationWidth || 0) - offset.right;
            if (adjustedWidth > 2) {
                setShow(true);
            }
            else {
                adjustedWidth = 0;
                setShow(false);
            }
            const data = {
                x: amountsPadding.left + obligationWidth + lineStrokeWidth,
                y: startOfChartY + offset.top,
                width: adjustedWidth,
                height: rectangleHeight - (2 * offset.bottom),
                fill,
                description: `A rectangle with width representative of the ${textInfo.label} amount ${moneyLabel}`
            };
            if (!isNaN(scale(amount))) setRectangleData(data);
        }
    }, [scale, overviewData]);
    return (
        <g>
            <title>The text, vertical line and rectangle representative of the COVID-19 Remaining Balance</title>
            <g
                tabIndex="0"
                aria-label={rectangleData.description}
                data-id={dataId}
                onFocus={displayTooltip}
                onBlur={hideTooltip}>
                <desc>{rectangleData.description}</desc>
                <rect
                    className={showTooltip === dataId ? 'highlight' : ''}
                    data-id={dataId}
                    x={rectangleData.x}
                    y={rectangleData.y}
                    width={rectangleData.width}
                    height={rectangleData.height}
                    fill={rectangleData.fill}
                    onMouseMove={displayTooltip}
                    onMouseLeave={hideTooltip} />
            </g>
            {show && <LinesAndText
                overviewData={overviewData}
                scale={scale}
                displayTooltip={displayTooltip}
                hideTooltip={hideTooltip}
                dataId={dataId}
                width={width}
                setRemainingBalanceLabelData={setRemainingBalanceLabelData}
                setRemainingBalanceValueData={setRemainingBalanceValueData} />}
        </g>
    ); };

RemainingBalance.propTypes = propTypes;
export default RemainingBalance;
