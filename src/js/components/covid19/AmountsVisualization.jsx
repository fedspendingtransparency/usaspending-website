/**
 * AmountsVisualization.jsx
 * Created by Jonathan Hill 06/23/20
 */

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';
import DateNote from 'components/covid19/DateNote';
import ResultsTableLoadingMessage from 'components/search/table/ResultsTableLoadingMessage';
import {
    amountsHeight,
    amountsPadding,
    rectangleMapping,
    startOfChartY,
    rectangleHeight,
    lineStrokeWidth,
    spacingBetweenLineAndText,
    remainingBalanceCircleRadius,
    labelTextAdjustment
} from 'dataMapping/covid19/covid19';
import { calculateUnits, formatMoneyWithPrecision } from 'helpers/moneyFormatter';

const propTypes = {
    overviewData: PropTypes.object,
    width: PropTypes.number
};

const AmountsVisualization = ({
    overviewData,
    width = null
}) => {
    const [loading, setLoading] = useState(null);
    const [scale, setScale] = useState(null);
    const [totalRectangleData, setTotalRectangleData] = useState(null);
    const [outlayRectangleData, setOutlayRectangleData] = useState(null);
    const [obligationRectangleData, setObligationRectangleData] = useState(null);
    const [remainingBalanceRectangleData, setRemainingBalanceRectangleData] = useState(null);
    const [totalLineData, setTotalLineData] = useState(null);
    const [outlayLineData, setOutlayLineData] = useState(null);
    const [obligationLineData, setObligationLineData] = useState(null);
    const [remainingBalanceLineData, setRemainingBalanceLineData] = useState(null);
    const [totalQuestionData, setTotalQuestionData] = useState(null);
    const [totalValueData, setTotalValueData] = useState(null);
    const [totalLabelData, setTotalLabelData] = useState(null);
    const [remainingBalanceQuestionData, setRemainingBalanceQuestionData] = useState(null);
    const [remainingBalanceValueData, setRemainingBalanceValueData] = useState(null);
    const [remainingBalanceLabelData, setRemainingBalanceLabelData] = useState(null);
    const [outlayQuestionData, setOutlayQuestionData] = useState(null);
    const [outlayValueData, setOutlayValueData] = useState(null);
    const [outlayLabelData, setOutlayLabelData] = useState(null);
    const [obligationQuestionData, setObligationQuestionData] = useState(null);
    const [obligationValueData, setObligationValueData] = useState(null);
    const [obligationLabelData, setObligationLabelData] = useState(null);
    const [remainingBalanceCircleData, setRemainingBalanceCircleData] = useState(null);
    const [zeroPercentData, setZeroPercentData] = useState(null);
    const [oneHundredPercentData, setOneHundredPercentData] = useState(null);
    const _totalBudgetAuthorityQuestion = useRef(null);
    const _totalBudgetAuthorityLabel = useRef(null);
    const _totalBudgetAuthorityValue = useRef(null);
    const _obligationQuestion = useRef(null);
    const _obligationLabel = useRef(null);
    const _obligationValue = useRef(null);
    const _outlayQuestion = useRef(null);
    const _outlayLabel = useRef(null);
    const _outlayValue = useRef(null);
    const _remainingBalanceQuestion = useRef(null);
    const _remainingBalanceLabel = useRef(null);
    const _remainingBalanceValue = useRef(null);
    const zerPercentRef = useRef(null);
    const oneHundredPercentRef = useRef(null);
    useEffect(() => setLoading(!Object.keys(overviewData).length), [overviewData]);
    // X Scale
    useEffect(() => {
        if (width) {
            const s = scaleLinear()
                .domain([0, overviewData._totalBudgetAuthority])
                .range([amountsPadding.left, width - amountsPadding.right]);
            setScale(() => s);
        }
    }, [width, overviewData]);
    // totalRectangleData
    useEffect(() => {
        if (scale && Object.keys(overviewData).length > 0) {
            const { offset, fill, text: textInfo } = rectangleMapping._totalBudgetAuthority;
            const { left, right } = amountsPadding;
            const amount = Math.abs(overviewData._totalBudgetAuthority);
            const units = calculateUnits([amount]);
            const moneyLabel = `${formatMoneyWithPrecision(amount / units.unit, units.precision)} ${units.longLabel}`;
            const data = {
                x: left + offset.left,
                y: startOfChartY + offset.top,
                width: scale(amount) - (right + (offset.right || 0)),
                height: rectangleHeight - (2 * offset.bottom),
                fill,
                description: `A rectangle with width representative of the ${textInfo.label} amount ${moneyLabel}`
            };
            if (!isNaN(scale(amount))) setTotalRectangleData(data);
        }
    }, [scale, overviewData]);
    // outlayRectangleData
    useEffect(() => {
        if (scale) {
            const { offset, fill, text: textInfo } = rectangleMapping._totalOutlays;
            const { left, right } = amountsPadding;
            const amount = Math.abs(overviewData._totalOutlays);
            const units = calculateUnits([amount]);
            const moneyLabel = `${formatMoneyWithPrecision(amount / units.unit, units.precision)} ${units.longLabel}`;
            const data = {
                x: left + offset.left,
                y: startOfChartY + offset.top,
                width: scale(amount) - (right + (offset.right || 0)),
                height: rectangleHeight - (2 * offset.bottom),
                fill,
                description: `A rectangle with width representative of the ${textInfo.label} amount ${moneyLabel}`
            };
            if (!isNaN(scale(amount))) setOutlayRectangleData(data);
        }
    }, [scale, overviewData]);
    // obligationRectangleData
    useEffect(() => {
        if (scale) {
            const { offset, fill, text: textInfo } = rectangleMapping._totalObligations;
            const { left, right } = amountsPadding;
            const amount = Math.abs(overviewData._totalObligations);
            const units = calculateUnits([amount]);
            const moneyLabel = `${formatMoneyWithPrecision(amount / units.unit, units.precision)} ${units.longLabel}`;
            const data = {
                x: left + offset.left,
                y: startOfChartY + offset.top,
                width: scale(amount) - (right + (offset.right || 0)),
                height: rectangleHeight - (2 * offset.bottom),
                fill,
                description: `A rectangle with width representative of the ${textInfo.label} amount ${moneyLabel}`
            };
            if (!isNaN(scale(amount))) setObligationRectangleData(data);
        }
    }, [scale, overviewData]);
    // remainingBalanceRectangleData
    useEffect(() => {
        if (scale && obligationRectangleData) {
            const { offset, fill, text: textInfo } = rectangleMapping._remainingBalance;
            const amount = Math.abs(overviewData._remainingBalance);
            const units = calculateUnits([amount]);
            const moneyLabel = `${formatMoneyWithPrecision(amount / units.unit, units.precision)} ${units.longLabel}`;
            let draw = true;
            if (overviewData._remainingBalance <= 0) draw = false;
            const data = {
                draw,
                // x: amountsPadding.left + (offset.left),
                x: amountsPadding.left + obligationRectangleData.width,
                y: startOfChartY + offset.top,
                width: width - offset.right - amountsPadding.right - amountsPadding.left - obligationRectangleData.width,
                height: rectangleHeight - (2 * offset.bottom),
                fill,
                description: `A rectangle with width representative of the ${textInfo.label} amount ${moneyLabel}`
            };
            if (!isNaN(scale(amount))) setRemainingBalanceRectangleData(data);
        }
    }, [scale, overviewData, obligationRectangleData]);
    // totalLineData
    useEffect(() => {
        if (scale) {
            const {
                offset,
                lineLength,
                lineColor
            } = rectangleMapping._totalBudgetAuthority;
            const { left, right } = amountsPadding;
            const amount = Math.abs(overviewData._totalBudgetAuthority);
            const x = left + offset.left;
            const rectWidth = scale(amount) - (right + (offset.right || 0));
            const data = {
                lineColor,
                x1: (x + rectWidth) - (lineStrokeWidth / 2),
                x2: (x + rectWidth) - (lineStrokeWidth / 2),
                y1: startOfChartY - lineLength,
                y2: startOfChartY + (rectangleHeight / 2)
            };
            if (!isNaN(scale(amount))) setTotalLineData(data);
        }
    }, [scale, overviewData]);
    // outlayLineData
    useEffect(() => {
        if (scale) {
            const {
                offset,
                lineLength,
                lineColor
            } = rectangleMapping._totalOutlays;
            const { left, right } = amountsPadding;
            const amount = Math.abs(overviewData._totalOutlays);
            const x = left + offset.left;
            const rectWidth = scale(amount) - (right + (offset.right || 0));
            const data = {
                lineColor,
                x1: (x + rectWidth) - (lineStrokeWidth / 2),
                x2: (x + rectWidth) - (lineStrokeWidth / 2),
                y1: startOfChartY - lineLength,
                y2: startOfChartY + (rectangleHeight / 2)
            };
            if (!isNaN(scale(amount))) setOutlayLineData(data);
        }
    }, [scale, overviewData]);
    // obligationLineData
    useEffect(() => {
        if (scale) {
            const {
                offset,
                lineLength,
                lineColor
            } = rectangleMapping._totalObligations;
            const { left, right } = amountsPadding;
            const amount = Math.abs(overviewData._totalObligations);
            const x = left + offset.left;
            const rectWidth = scale(amount) - (right + (offset.right || 0));
            const data = {
                lineColor,
                x1: (x + rectWidth) - (lineStrokeWidth / 2),
                x2: (x + rectWidth) - (lineStrokeWidth / 2),
                y1: startOfChartY + (rectangleHeight / 2),
                y2: startOfChartY + rectangleHeight + lineLength
            };
            if (!isNaN(scale(amount))) setObligationLineData(data);
        }
    }, [scale, overviewData]);
    // remainingBalanceLineData
    useEffect(() => {
        if (scale && remainingBalanceRectangleData?.draw) {
            const {
                lineLength,
                lineColor
            } = rectangleMapping._remainingBalance;
            const data = {
                lineColor,
                x1: remainingBalanceRectangleData.x + (0.75 * remainingBalanceRectangleData.width),
                x2: remainingBalanceRectangleData.x + (0.75 * remainingBalanceRectangleData.width),
                y1: startOfChartY + (rectangleHeight / 2),
                y2: startOfChartY + rectangleHeight + lineLength
            };
            setRemainingBalanceLineData(data);
        }
    }, [scale, remainingBalanceRectangleData]);
    // remainingBalanceCircleData
    useEffect(() => {
        if (scale && remainingBalanceRectangleData?.draw) {
            const { lineColor } = rectangleMapping._remainingBalance;
            const data = {
                lineColor,
                cx: remainingBalanceRectangleData.x + (0.75 * remainingBalanceRectangleData.width),
                cy: remainingBalanceRectangleData.y + (remainingBalanceRectangleData.height / 2),
                r: remainingBalanceCircleRadius
            };
            setRemainingBalanceCircleData(data);
        }
    }, [scale, remainingBalanceRectangleData]);
    // totalQuestionData
    useLayoutEffect(() => {
        const { text: textInfo } = rectangleMapping._totalBudgetAuthority;
        const questionRef = _totalBudgetAuthorityQuestion.current?.getBoundingClientRect();
        if (totalLineData) {
            setTotalQuestionData({
                y: totalLineData.y1 + (questionRef?.height || 0),
                x: totalLineData.x1 - ((questionRef?.width || 0) + spacingBetweenLineAndText),
                height: questionRef?.height || 0,
                text: textInfo.question,
                className: `amounts-text__question ${!questionRef ? 'white' : ''}`
            });
        }
    }, [_totalBudgetAuthorityQuestion, totalLineData]);
    // totalValueData
    useLayoutEffect(() => {
        const ref = _totalBudgetAuthorityValue.current?.getBoundingClientRect();
        const amount = Math.abs(overviewData._totalBudgetAuthority);
        const units = calculateUnits([amount]);
        const moneyLabel = `${formatMoneyWithPrecision(amount / units.unit, units.precision)} ${units.longLabel}`;
        if (totalLineData && totalQuestionData) {
            setTotalValueData({
                y: totalLineData.y1 + totalQuestionData.height + (ref?.height || 0),
                x: totalLineData.x1 - ((ref?.width || 0) + spacingBetweenLineAndText),
                height: ref?.height || 0,
                theWidth: ref?.width || 0,
                text: moneyLabel,
                className: `amounts-text__value bold ${!ref ? 'white' : ''}`
            });
        }
    }, [totalQuestionData, totalLineData]);
    // totalLabelData
    useLayoutEffect(() => {
        const ref = _totalBudgetAuthorityLabel.current?.getBoundingClientRect();
        const { text: textInfo } = rectangleMapping._totalBudgetAuthority;
        if (totalLineData && totalQuestionData && totalValueData) {
            setTotalLabelData({
                y: totalLineData.y1 + totalQuestionData.height + (ref?.height || 0) + labelTextAdjustment.y,
                x: totalLineData.x1 - ((ref?.width || 0) + totalValueData?.theWidth + spacingBetweenLineAndText + labelTextAdjustment.x),
                height: ref?.height || 0,
                text: textInfo.label,
                className: `amounts-text__label ${!ref ? 'white' : ''}`
            });
        }
    }, [totalQuestionData, totalLineData, totalValueData]);
    // remainingBalanceQuestionData
    useLayoutEffect(() => {
        const { text: textInfo } = rectangleMapping._remainingBalance;
        const questionRef = _remainingBalanceQuestion.current?.getBoundingClientRect();
        if (remainingBalanceLineData) {
            setRemainingBalanceQuestionData({
                y: remainingBalanceLineData.y2 - remainingBalanceValueData?.height - spacingBetweenLineAndText,
                x: remainingBalanceLineData.x1 - ((questionRef?.width || 0) + spacingBetweenLineAndText),
                height: questionRef?.height || 0,
                text: textInfo.question,
                className: `amounts-text__question ${!questionRef ? 'white' : ''}`
            });
        }
    }, [remainingBalanceLineData]);
    // remainingBalanceValueData
    useLayoutEffect(() => {
        const ref = _remainingBalanceValue.current?.getBoundingClientRect();
        const amount = Math.abs(overviewData._remainingBalance);
        const units = calculateUnits([amount]);
        const moneyLabel = `${formatMoneyWithPrecision(amount / units.unit, units.precision)} ${units.longLabel}`;
        if (remainingBalanceLineData && remainingBalanceQuestionData) {
            setRemainingBalanceValueData({
                y: remainingBalanceLineData.y2 - spacingBetweenLineAndText,
                x: remainingBalanceLineData.x1 - ((ref?.width || 0) + spacingBetweenLineAndText),
                height: ref?.height || 0,
                theWidth: ref?.width || 0,
                text: moneyLabel,
                className: `amounts-text__value ${!ref ? 'white' : ''}`
            });
        }
    }, [remainingBalanceLineData, remainingBalanceQuestionData]);
    // remainingBalanceLabelData
    useLayoutEffect(() => {
        const ref = _remainingBalanceLabel.current?.getBoundingClientRect();
        const { text: textInfo } = rectangleMapping._remainingBalance;
        if (remainingBalanceLineData && remainingBalanceQuestionData && remainingBalanceValueData) {
            setRemainingBalanceLabelData({
                y: remainingBalanceLineData.y2 - spacingBetweenLineAndText,
                x: remainingBalanceLineData.x1 - ((ref?.width || 0) + remainingBalanceValueData?.theWidth + spacingBetweenLineAndText + labelTextAdjustment.x),
                height: ref?.height || 0,
                text: textInfo.label,
                className: `amounts-text__label ${!ref ? 'white' : ''}`
            });
        }
    }, [remainingBalanceLineData, remainingBalanceQuestionData, remainingBalanceValueData]);
    // outlayQuestionData
    useLayoutEffect(() => {
        const { text: textInfo } = rectangleMapping._totalOutlays;
        const questionRef = _outlayQuestion.current?.getBoundingClientRect();
        if (outlayLineData) {
            if ((outlayLineData.x1 + spacingBetweenLineAndText + questionRef?.width || 0) > (width - 1)) {
                // text to the left of the line
                setOutlayQuestionData({
                    y: outlayLineData.y1 + (questionRef?.height || 0),
                    x: outlayLineData.x1 - ((questionRef?.width || 0) + spacingBetweenLineAndText),
                    height: questionRef?.height || 0,
                    text: textInfo.question,
                    className: `amounts-text__question ${!questionRef ? 'white' : ''}`,
                    left: true
                });
            }
            else { // text to the right of the line
                setOutlayQuestionData({
                    y: outlayLineData.y1 + (questionRef?.height || 0),
                    x: outlayLineData.x1 + spacingBetweenLineAndText,
                    height: questionRef?.height || 0,
                    text: textInfo.question,
                    className: `amounts-text__question ${!questionRef ? 'white' : ''}`
                });
            }
        }
    }, [outlayLineData]);
    // outlayValueData
    useLayoutEffect(() => {
        const ref = _outlayValue.current?.getBoundingClientRect();
        const amount = Math.abs(overviewData._totalOutlays);
        const units = calculateUnits([amount]);
        const moneyLabel = `${formatMoneyWithPrecision(amount / units.unit, units.precision)} ${units.longLabel}`;
        if (outlayLineData && outlayQuestionData) {
            if (outlayQuestionData.left) {
                setOutlayValueData({
                    y: outlayLineData.y1 + outlayQuestionData.height + (ref?.height || 0),
                    x: outlayLineData.x1 - ((ref?.width || 0) + spacingBetweenLineAndText),
                    height: ref?.height || 0,
                    theWidth: ref?.width || 0,
                    text: moneyLabel,
                    className: `amounts-text__value ${!ref ? 'white' : ''}`
                });
            }
            else { // text to the right of the line
                setOutlayValueData({
                    y: outlayLineData.y1 + outlayQuestionData.height + (ref?.height || 0),
                    x: outlayLineData.x1 + outlayLabelData?.theWidth + spacingBetweenLineAndText + labelTextAdjustment.x,
                    height: ref?.height || 0,
                    theWidth: ref?.width || 0,
                    text: moneyLabel,
                    className: `amounts-text__value ${!ref ? 'white' : ''}`
                });
            }
        }
    }, [outlayLineData, outlayQuestionData]);
    // outlayLabelData
    useLayoutEffect(() => {
        const ref = _outlayLabel.current?.getBoundingClientRect();
        const { text: textInfo } = rectangleMapping._totalOutlays;
        if (outlayLineData && outlayQuestionData && outlayValueData) {
            if (outlayQuestionData.left) {
                setOutlayLabelData({
                    y: outlayLineData.y1 + outlayQuestionData.height + (ref?.height || 0) + labelTextAdjustment.y,
                    x: outlayLineData.x1 - ((ref?.width || 0) + outlayValueData?.theWidth + spacingBetweenLineAndText + labelTextAdjustment.x),
                    height: ref?.height || 0,
                    text: textInfo.label,
                    theWidth: ref?.width,
                    className: `amounts-text__label ${!ref ? 'white' : ''}`
                });
            }
            else { // text to the right of line
                setOutlayLabelData({
                    y: outlayLineData.y1 + outlayQuestionData.height + (ref?.height || 0) + labelTextAdjustment.y,
                    x: outlayLineData.x1 + spacingBetweenLineAndText,
                    height: ref?.height || 0,
                    text: textInfo.label,
                    theWidth: ref?.width,
                    className: `amounts-text__label ${!ref ? 'white' : ''}`
                });
            }
        }
    }, [outlayLineData, outlayQuestionData, outlayValueData]);
    // obligationQuestionData
    useLayoutEffect(() => {
        const { text: textInfo } = rectangleMapping._totalObligations;
        const questionRef = _obligationQuestion.current?.getBoundingClientRect();
        if (obligationLineData && remainingBalanceLineData) {
            if (((questionRef?.width || 0) + spacingBetweenLineAndText + obligationLineData.x1) >= remainingBalanceLineData.x1) {
                setObligationQuestionData({
                    y: obligationLineData.y2 - obligationValueData?.height - spacingBetweenLineAndText,
                    x: obligationLineData.x1 - ((questionRef?.width || 0) + spacingBetweenLineAndText),
                    height: questionRef?.height || 0,
                    text: textInfo.question,
                    className: `amounts-text__question ${!questionRef ? 'white' : ''}`,
                    left: true
                });
            }
            else {
                setObligationQuestionData({
                    y: obligationLineData.y2 - (questionRef?.height || 0) - labelTextAdjustment.y,
                    x: obligationLineData.x1 + spacingBetweenLineAndText,
                    height: questionRef?.height || 0,
                    text: textInfo.question,
                    className: `amounts-text__question ${!questionRef ? 'white' : ''}`
                });
            }
        }
    }, [obligationLineData, remainingBalanceLineData]);
    // obligationValueData
    useLayoutEffect(() => {
        const ref = _obligationValue.current?.getBoundingClientRect();
        const amount = Math.abs(overviewData._totalObligations);
        const units = calculateUnits([amount]);
        const moneyLabel = `${formatMoneyWithPrecision(amount / units.unit, units.precision)} ${units.longLabel}`;
        if (obligationLineData && obligationQuestionData) {
            if (obligationQuestionData.left) {
                setObligationValueData({
                    y: obligationLineData.y2 - spacingBetweenLineAndText,
                    x: obligationLineData.x1 - ((ref?.width || 0) + spacingBetweenLineAndText),
                    height: ref?.height || 0,
                    theWidth: ref?.width || 0,
                    text: moneyLabel,
                    className: `amounts-text__value ${!ref ? 'white' : ''}`
                });
            }
            else {
                setObligationValueData({
                    y: obligationLineData.y2 - spacingBetweenLineAndText,
                    x: obligationLineData.x1 + obligationLabelData?.theWidth + spacingBetweenLineAndText,
                    height: ref?.height || 0,
                    theWidth: ref?.width || 0,
                    text: moneyLabel,
                    className: `amounts-text__value ${!ref ? 'white' : ''}`
                });
            }
        }
    }, [obligationLineData, obligationQuestionData]);
    // obligationLabelData
    useLayoutEffect(() => {
        const ref = _obligationLabel.current?.getBoundingClientRect();
        const { text: textInfo } = rectangleMapping._totalObligations;
        if (obligationLineData && obligationQuestionData && obligationValueData) {
            if (obligationQuestionData.left) {
                setObligationLabelData({
                    y: obligationLineData.y2 - spacingBetweenLineAndText,
                    x: obligationLineData.x1 - ((ref?.width || 0) + obligationValueData?.theWidth + spacingBetweenLineAndText + labelTextAdjustment.x),
                    height: ref?.height || 0,
                    text: textInfo.label,
                    theWidth: ref?.width || 0,
                    className: `amounts-text__label ${!ref ? 'white' : ''}`
                });
            }
            else {
                setObligationLabelData({
                    y: obligationLineData.y2 - labelTextAdjustment.y,
                    x: obligationLineData.x1 + spacingBetweenLineAndText,
                    height: ref?.height || 0,
                    text: textInfo.label,
                    theWidth: ref?.width || 0,
                    className: `amounts-text__label ${!ref ? 'white' : ''}`
                });
            }
        }
    }, [obligationLineData, obligationQuestionData, obligationValueData]);
    // 0%
    useLayoutEffect(() => {
        const ref = zerPercentRef.current?.getBoundingClientRect();
        if (totalRectangleData) {
            setZeroPercentData({
                y: startOfChartY + (rectangleHeight / 2) + 2,
                x: amountsPadding.left - (ref?.width || 0) - labelTextAdjustment.x
            });
        }
    }, [width, totalRectangleData]);
    // 100%
    useLayoutEffect(() => {
        if (totalRectangleData) {
            setOneHundredPercentData({
                y: startOfChartY + (rectangleHeight / 2) + 2,
                x: (width - amountsPadding.right) + labelTextAdjustment.x
            });
        }
    }, [width, totalRectangleData]);

    const dateNoteStyles = {
        position: 'absolute',
        transform: `translate(${amountsPadding.left}px,${startOfChartY + rectangleHeight}px)`
    };

    return (
        <div className="amounts-viz">
            <h3 className="body__narrative amounts-viz__title">
                This is how much was spent on the COVID-19 Response <strong>in total</strong>.
            </h3>
            {
                loading &&
                <div className="results-table-message-container">
                    <ResultsTableLoadingMessage />
                </div>
            }
            <DateNote styles={dateNoteStyles} />
            {   
                !loading &&
                <svg height={amountsHeight} width={width} className="amounts-viz__svg">
                    {
                        totalRectangleData &&
                        <g tabIndex="0" aria-label={totalRectangleData.description}>
                            <desc>
                                {totalRectangleData.description}
                            </desc>
                            <rect
                                x={totalRectangleData.x}
                                y={totalRectangleData.y}
                                width={totalRectangleData.width}
                                height={totalRectangleData.height}
                                fill={totalRectangleData.fill} />
                        </g>
                    }
                    {
                        obligationRectangleData &&
                        <g tabIndex="0" aria-label={obligationRectangleData.description}>
                            <desc>
                                {obligationRectangleData.description}
                            </desc>
                            <rect
                                x={obligationRectangleData.x}
                                y={obligationRectangleData.y}
                                width={obligationRectangleData.width}
                                height={obligationRectangleData.height}
                                fill={obligationRectangleData.fill} />
                        </g>
                    }
                    {
                        outlayRectangleData &&
                        <g tabIndex="0" aria-label={outlayRectangleData.description}>
                            <desc>
                                {outlayRectangleData.description}
                            </desc>
                            <rect
                                x={outlayRectangleData.x}
                                y={outlayRectangleData.y}
                                width={outlayRectangleData.width}
                                height={outlayRectangleData.height}
                                fill={outlayRectangleData.fill} />
                        </g>
                    }
                    {
                        remainingBalanceRectangleData && remainingBalanceRectangleData.draw &&
                        <g tabIndex="0" aria-label={remainingBalanceRectangleData.description}>
                            <desc>
                                {remainingBalanceRectangleData.description}
                            </desc>
                            <rect
                                x={remainingBalanceRectangleData.x}
                                y={remainingBalanceRectangleData.y}
                                width={remainingBalanceRectangleData.width}
                                height={remainingBalanceRectangleData.height}
                                fill={remainingBalanceRectangleData.fill} />
                        </g>
                    }
                    {
                        totalLineData &&
                        <g tabIndex="0" aria-label="A line linking a rectangle to text">
                            <desc>A line linking a rectangle to text</desc>
                            <line
                                x1={totalLineData.x1}
                                x2={totalLineData.x2}
                                y1={totalLineData.y1}
                                y2={totalLineData.y2}
                                stroke={totalLineData.lineColor}
                                strokeWidth={lineStrokeWidth} />
                        </g>
                    }
                    {
                        outlayLineData &&
                        <g tabIndex="0" aria-label="A line linking a rectangle to text">
                            <desc>A line linking a rectangle to text</desc>
                            <line
                                x1={outlayLineData.x1}
                                x2={outlayLineData.x2}
                                y1={outlayLineData.y1}
                                y2={outlayLineData.y2}
                                stroke={outlayLineData.lineColor}
                                strokeWidth={lineStrokeWidth} />
                        </g>
                    }
                    {
                        obligationLineData &&
                        <g tabIndex="0" aria-label="A line linking a rectangle to text">
                            <desc>A line linking a rectangle to text</desc>
                            <line
                                x1={obligationLineData.x1}
                                x2={obligationLineData.x2}
                                y1={obligationLineData.y1}
                                y2={obligationLineData.y2}
                                stroke={obligationLineData.lineColor}
                                strokeWidth={lineStrokeWidth} />
                        </g>
                    }
                    {
                        remainingBalanceCircleData && remainingBalanceRectangleData && remainingBalanceRectangleData.draw &&
                        <g tabIndex="0" aria-label="A circle linking a rectangle to text">
                            <desc>A circle linking a rectangle to text</desc>
                            <circle
                                fill={remainingBalanceCircleData.lineColor}
                                cx={remainingBalanceCircleData.cx}
                                cy={remainingBalanceCircleData.cy}
                                r={remainingBalanceCircleData.r} />
                        </g>
                    }
                    {
                        remainingBalanceLineData && remainingBalanceRectangleData && remainingBalanceRectangleData.draw &&
                        <g tabIndex="0" aria-label="A line linking a rectangle to text">
                            <desc>A line linking a rectangle to text</desc>
                            <line
                                x1={remainingBalanceLineData.x1}
                                x2={remainingBalanceLineData.x2}
                                y1={remainingBalanceLineData.y1}
                                y2={remainingBalanceLineData.y2}
                                stroke={remainingBalanceLineData.lineColor}
                                strokeWidth={lineStrokeWidth} />
                        </g>
                    }
                    {
                        totalQuestionData &&
                        <g tabIndex="0" aria-label={totalQuestionData.text}>
                            <desc>{totalQuestionData.text}</desc>
                            <text
                                ref={_totalBudgetAuthorityQuestion}
                                className={totalQuestionData.className}
                                x={totalQuestionData.x}
                                y={totalQuestionData.y}>
                                {totalQuestionData.text}
                            </text>
                        </g>
                    }
                    {
                        totalValueData &&
                        <g tabIndex="0" aria-label={totalValueData.text}>
                            <desc>{totalValueData.text}</desc>
                            <text
                                ref={_totalBudgetAuthorityValue}
                                className={totalValueData.className}
                                x={totalValueData.x}
                                y={totalValueData.y}>
                                {totalValueData.text}
                            </text>
                        </g>
                    }
                    {
                        totalLabelData &&
                        <g tabIndex="0" aria-label={totalLabelData.text}>
                            <desc>{totalLabelData.text}</desc>
                            <text
                                ref={_totalBudgetAuthorityLabel}
                                className={totalLabelData.className}
                                x={totalLabelData.x}
                                y={totalLabelData.y}>
                                {totalLabelData.text}
                            </text>
                        </g>
                    }
                    {
                        remainingBalanceQuestionData && remainingBalanceRectangleData.draw &&
                        <g tabIndex="0" aria-label={remainingBalanceQuestionData.text}>
                            <desc>{remainingBalanceQuestionData.text}</desc>
                            <text
                                ref={_remainingBalanceQuestion}
                                className={remainingBalanceQuestionData.className}
                                x={remainingBalanceQuestionData.x}
                                y={remainingBalanceQuestionData.y}>
                                {remainingBalanceQuestionData.text}
                            </text>
                        </g>
                    }
                    {
                        remainingBalanceValueData && remainingBalanceRectangleData.draw &&
                        <g tabIndex="0" aria-label={remainingBalanceValueData.text}>
                            <desc>{remainingBalanceValueData.text}</desc>
                            <text
                                ref={_remainingBalanceValue}
                                className={remainingBalanceValueData.className}
                                x={remainingBalanceValueData.x}
                                y={remainingBalanceValueData.y}>
                                {remainingBalanceValueData.text}
                            </text>
                        </g>
                    }
                    {
                        remainingBalanceLabelData && remainingBalanceRectangleData.draw &&
                        <g tabIndex="0" aria-label={remainingBalanceLabelData.text}>
                            <desc>{remainingBalanceLabelData.text}</desc>
                            <text
                                ref={_remainingBalanceLabel}
                                className={remainingBalanceLabelData.className}
                                x={remainingBalanceLabelData.x}
                                y={remainingBalanceLabelData.y}>
                                {remainingBalanceLabelData.text}
                            </text>
                        </g>
                    }
                    {
                        outlayQuestionData &&
                        <g tabIndex="0" aria-label={outlayQuestionData.text}>
                            <desc>{outlayQuestionData.text}</desc>
                            <text
                                ref={_outlayQuestion}
                                className={outlayQuestionData.className}
                                x={outlayQuestionData.x}
                                y={outlayQuestionData.y}>
                                {outlayQuestionData.text}
                            </text>
                        </g>
                    }
                    {
                        outlayValueData &&
                        <g tabIndex="0" aria-label={outlayValueData.text}>
                            <desc>{outlayValueData.text}</desc>
                            <text
                                ref={_outlayValue}
                                className={outlayValueData.className}
                                x={outlayValueData.x}
                                y={outlayValueData.y}>
                                {outlayValueData.text}
                            </text>
                        </g>
                    }
                    {
                        outlayLabelData &&
                        <g tabIndex="0" aria-label={outlayLabelData.text}>
                            <desc>{outlayLabelData.text}</desc>
                            <text
                                ref={_outlayLabel}
                                className={outlayLabelData.className}
                                x={outlayLabelData.x}
                                y={outlayLabelData.y}>
                                {outlayLabelData.text}
                            </text>
                        </g>
                    }
                    {
                        obligationQuestionData &&
                        <g tabIndex="0" aria-label={obligationQuestionData.text}>
                            <desc>{obligationQuestionData.text}</desc>
                            <text
                                ref={_obligationQuestion}
                                className={obligationQuestionData.className}
                                x={obligationQuestionData.x}
                                y={obligationQuestionData.y}>
                                {obligationQuestionData.text}
                            </text>
                        </g>
                    }
                    {
                        obligationValueData &&
                        <g tabIndex="0" aria-label={obligationValueData.text}>
                            <desc>{obligationValueData.text}</desc>
                            <text
                                ref={_obligationValue}
                                className={obligationValueData.className}
                                x={obligationValueData.x}
                                y={obligationValueData.y}>
                                {obligationValueData.text}
                            </text>
                        </g>
                    }
                    {
                        obligationLabelData &&
                        <g tabIndex="0" aria-label={obligationLabelData.text}>
                            <desc>{obligationLabelData.text}</desc>
                            <text
                                ref={_obligationLabel}
                                className={obligationLabelData.className}
                                x={obligationLabelData.x}
                                y={obligationLabelData.y}>
                                {obligationLabelData.text}
                            </text>
                        </g>
                    }
                    {
                        zeroPercentData &&
                        <g tabIndex="0" aria-label="Text representing 0%">
                            <desc>Text representing 0%</desc>
                            <text
                                ref={zerPercentRef}
                                x={zeroPercentData.x}
                                y={zeroPercentData.y}>
                                0%
                            </text>
                        </g>
                    }
                    {
                        oneHundredPercentData &&
                        <g tabIndex="0" aria-label="Text representing 100%">
                            <desc>Text representing 100%</desc>
                            <text
                                ref={oneHundredPercentRef}
                                x={oneHundredPercentData.x}
                                y={oneHundredPercentData.y}>
                                100%
                            </text>
                        </g>
                    }
                </svg>
            }
        </div>
    );
};

AmountsVisualization.propTypes = propTypes;
export default AmountsVisualization;
