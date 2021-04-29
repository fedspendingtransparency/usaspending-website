/**
 * LineAndText.jsx
 * created by Jonathan Hill 04/22/21
 */

import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { upperFirst } from 'lodash';
import PropTypes from 'prop-types';

import {
    calculateUnits,
    formatMoneyWithPrecision
} from 'helpers/moneyFormatter';

import {
    amountsPadding,
    rectangleMapping,
    startOfChartY,
    rectangleHeight,
    spacingBetweenLineAndText,
    lineStrokeWidth,
    heightOfRemainingBalanceLines,
    defaultLineData
} from 'dataMapping/covid19/amountsVisualization';

import { defaultTextState, textXPosition, lineXPosition } from 'helpers/covid19/amountsVisualization';

import TextGroup from '../shared/TextGroup';

const propTypes = {
    scale: PropTypes.func,
    overviewData: PropTypes.object,
    displayTooltip: PropTypes.func,
    hideTooltip: PropTypes.func,
    lineData: PropTypes.object,
    rectangleData: PropTypes.object,
    dataId: PropTypes.string,
    remainingBalanceLabelData: PropTypes.shape({
        x: PropTypes.number,
        width: PropTypes.number
    }),
    remainingBalanceValueData: PropTypes.shape({
        x: PropTypes.number,
        width: PropTypes.number
    })
};

const LineAndText = ({
    scale,
    overviewData,
    displayTooltip = () => {},
    hideTooltip = () => {},
    dataId = '',
    remainingBalanceLabelData,
    remainingBalanceValueData
}) => {
    const [lineDataOne, setLineDataOne] = useState(defaultLineData);
    const [lineDataTwo, setLineDataTwo] = useState(defaultLineData);
    const [lineDataThree, setLineDataThree] = useState(defaultLineData);
    const [lineDataFour, setLineDataFour] = useState(defaultLineData);
    const [descriptionData, setDescriptionData] = useState(defaultTextState(dataId, 'description'));
    const [valueData, setValueData] = useState(defaultTextState(dataId, 'value'));
    const [labelData, setLabelData] = useState(defaultTextState(dataId, 'label'));
    const [overlapLineThree, setOverlapLineThree] = useState(false);
    const [overlapLineTwo, setOverlapLineTwo] = useState(false);
    const [showRemainingBalance, setShowRemainingBalance] = useState(false);
    const descriptionTextRef = useRef(null);
    const labelTextRef = useRef(null);
    const valueTextRef = useRef(null);
    useEffect(() => {
        if (scale) {
            const { offset } = rectangleMapping[dataId];
            const { right } = amountsPadding;
            const totalWidth = scale(overviewData._totalBudgetAuthority) - (right + (offset.right || 0));
            const obligationWidth = scale(overviewData._totalObligations) - (right + (offset.right || 0));
            const adjustedWidth = (totalWidth || 0) - (obligationWidth || 0) - offset.right;
            if (adjustedWidth > 2) {
                setShowRemainingBalance(true);
            } }
    }, [scale, overviewData]);
    // lineDataOne
    useEffect(() => {
        if (scale) {
            const {
                lineColor
            } = rectangleMapping[dataId];
            const amount = Math.abs(overviewData[dataId]);
            const position = lineXPosition(overviewData, scale, dataId);
            const data = {
                lineColor,
                x1: position,
                x2: position,
                y1: startOfChartY + (rectangleHeight / 2),
                y2: startOfChartY + rectangleHeight + heightOfRemainingBalanceLines + (spacingBetweenLineAndText / 2)
            };
            if (!isNaN(scale(amount))) setLineDataOne(data);
        }
    }, [scale, overviewData]);
    // lineDataTwo
    useEffect(() => {
        if (scale) {
            const amount = Math.abs(overviewData[dataId]);
            const data = {
                lineColor: rectangleMapping[dataId].lineColor,
                x1: lineDataOne.x1 || 0,
                x2: lineDataOne.x1 || 0,
                y1: lineDataOne.y2 || 0,
                y2: (lineDataOne.y2 || 0) + (descriptionData.height || 0) + (rectangleMapping._remainingBalance.text.offset.y / 2) + 3
            };
            if (!isNaN(scale(amount))) setLineDataTwo(data);
        }
    }, [scale, lineDataOne]);
    // lineDataThree
    useEffect(() => {
        if (scale) {
            const amount = Math.abs(overviewData[dataId]);
            const data = {
                lineColor: rectangleMapping[dataId].lineColor,
                x1: lineDataTwo.x1 || 0,
                x2: lineDataTwo.x1 || 0,
                y1: lineDataTwo.y2 || 0,
                y2: ((lineDataTwo.y2 || 0) + (valueData.height || 0)) - 3
            };
            if (!isNaN(scale(amount))) setLineDataThree(data);
        }
    }, [scale, lineDataTwo]);
    // overlapLineTwo
    useEffect(() => {
        const endOfRemainingBalanceText = remainingBalanceValueData.x + remainingBalanceValueData.width;
        if (
            (remainingBalanceLabelData.x < lineDataTwo.x1 && lineDataTwo.x1 < endOfRemainingBalanceText) ||
            (remainingBalanceLabelData.x < lineDataTwo.x1 && lineDataTwo.x1 < endOfRemainingBalanceText)
        ) {
            setOverlapLineTwo(true);
        }
        else {
            setOverlapLineTwo(false);
        }
    }, [lineDataTwo, remainingBalanceLabelData, remainingBalanceValueData]);
    // overlapLineThree
    useEffect(() => {
        const endOfRemainingBalanceText = remainingBalanceValueData.x + remainingBalanceValueData.width;
        if (
            (remainingBalanceLabelData.x < lineDataThree.x1 && lineDataThree.x1 < endOfRemainingBalanceText) ||
          (remainingBalanceLabelData.x < lineDataThree.x1 && lineDataThree.x1 < endOfRemainingBalanceText)
        ) {
            setOverlapLineThree(true);
        }
        else {
            setOverlapLineThree(false);
        }
    }, [lineDataTwo, remainingBalanceLabelData, remainingBalanceValueData]);
    // lineDataFour
    useEffect(() => {
        if (scale) {
            const {
                lineLength,
                lineColor
            } = rectangleMapping[dataId];
            const amount = Math.abs(overviewData[dataId]);
            const data = {
                lineColor,
                x1: lineDataThree.x1 || 0,
                x2: lineDataThree.x1 || 0,
                y1: lineDataThree.y2 || 0,
                y2: startOfChartY + rectangleHeight + lineLength
            };
            if (!isNaN(scale(amount))) setLineDataFour(data);
        }
    }, [scale, lineDataThree]);
    // descriptionData
    useLayoutEffect(() => {
        const { text: textInfo } = rectangleMapping[dataId];
        const descriptionRef = descriptionTextRef.current?.getBoundingClientRect();
        if (scale) {
            setDescriptionData({
                y: (lineDataFour?.y2 || 0) - spacingBetweenLineAndText,
                x: textXPosition(overviewData, scale, dataId, { description: descriptionRef }, 'description'),
                height: descriptionRef?.height || 0,
                text: textInfo.description,
                className: `amounts-text__description ${!descriptionRef ? 'white' : ''}`
            });
        }
    }, [scale, overviewData, lineDataFour]);
    // valueData
    useLayoutEffect(() => {
        const ref = valueTextRef.current?.getBoundingClientRect();
        const amount = Math.abs(overviewData[dataId]);
        const units = calculateUnits([amount]);
        const moneyLabel = `${formatMoneyWithPrecision(amount / units.unit, 1)} ${upperFirst(units.longLabel)}`;
        if (scale) {
            setValueData({
                y: (lineDataFour?.y2 || 0) - (descriptionData?.height || 0) - spacingBetweenLineAndText,
                x: textXPosition(overviewData, scale, dataId, { description: descriptionTextRef?.current.getBoundingClientRect(), value: ref, label: labelTextRef?.current.getBoundingClientRect() }, 'value'),
                height: ref?.height || 0,
                theWidth: ref?.width || 0,
                text: moneyLabel,
                className: `amounts-text__value ${!ref ? 'white' : ''}`
            });
        }
    }, [lineDataFour]);
    // labelData
    useLayoutEffect(() => {
        const ref = labelTextRef.current?.getBoundingClientRect();
        const { text: textInfo } = rectangleMapping[dataId];
        if (scale) {
            setLabelData({
                y: (lineDataFour?.y2 || 0) - (descriptionData?.height || 0) - spacingBetweenLineAndText,
                x: textXPosition(overviewData, scale, dataId, { description: descriptionTextRef?.current.getBoundingClientRect(), value: valueTextRef?.current.getBoundingClientRect(), label: ref }, 'label'),
                height: ref?.height || 0,
                text: textInfo.label,
                theWidth: ref?.width || 0,
                className: `amounts-text__label ${!ref ? 'white' : ''}`
            });
        }
    }, [valueData]);

    return (
        <g>
            <g
                tabIndex="0"
                aria-label="A line linking a rectangle to text"
                data-id={dataId}
                onFocus={displayTooltip}
                onBlur={hideTooltip}>
                <desc>A line linking a rectangle to text</desc>
                <line
                    className="line__obligation"
                    x1={lineDataOne.x1}
                    data-id={dataId}
                    x2={lineDataOne.x2}
                    y1={lineDataOne.y1}
                    y2={lineDataOne.y2}
                    strokeWidth={lineStrokeWidth}
                    onMouseMove={displayTooltip}
                    onMouseLeave={hideTooltip} />
            </g>
            <g
                tabIndex="0"
                aria-label="A line 2 linking a rectangle to text"
                data-id={dataId}
                onFocus={displayTooltip}
                onBlur={hideTooltip}>
                <desc>A line linking a rectangle to text</desc>
                <line
                    x1={lineDataTwo.x1}
                    data-id={dataId}
                    x2={lineDataTwo.x2}
                    y1={lineDataTwo.y1}
                    y2={lineDataTwo.y2}
                    className={(showRemainingBalance && overlapLineTwo) ? 'line__opacity' : 'line__obligation'}
                    onMouseMove={displayTooltip}
                    onMouseLeave={hideTooltip} />
            </g>
            <g
                tabIndex="0"
                aria-label="A line 3 linking a rectangle to text"
                data-id={dataId}
                onFocus={displayTooltip}
                onBlur={hideTooltip}>
                <desc>A line linking a rectangle to text</desc>
                <line
                    x1={lineDataThree.x1}
                    data-id={dataId}
                    x2={lineDataThree.x2}
                    y1={lineDataThree.y1}
                    y2={lineDataThree.y2}
                    className={(showRemainingBalance && overlapLineThree) ? 'line__opacity' : 'line__obligation'}
                    onMouseMove={displayTooltip}
                    onMouseLeave={hideTooltip} />
            </g>
            <g
                tabIndex="0"
                aria-label="A line 4 linking a rectangle to text"
                data-id={dataId}
                onFocus={displayTooltip}
                onBlur={hideTooltip}>
                <desc>A line linking a rectangle to text</desc>
                <line
                    className="line__obligation"
                    data-id={dataId}
                    x1={lineDataFour.x1}
                    x2={lineDataFour.x2}
                    y1={lineDataFour.y1}
                    y2={lineDataFour.y2}
                    strokeWidth={lineStrokeWidth}
                    onMouseMove={displayTooltip}
                    onMouseLeave={hideTooltip} />
            </g>
            <TextGroup data={[
                { ...descriptionData, ref: descriptionTextRef },
                { ...valueData, ref: valueTextRef },
                { ...labelData, ref: labelTextRef }
            ].map((textItem) => ({
                ...textItem,
                dataId,
                displayTooltip,
                hideTooltip
            }))} />
        </g>
    );
};

LineAndText.propTypes = propTypes;
export default LineAndText;
