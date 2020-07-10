/**
 * AmountsVisualization.jsx
 * Created by Jonathan Hill 06/23/20
 */

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';
import { uniqueId } from 'lodash';
import DateNote from 'components/covid19/DateNote';
import {
    amountsHeight,
    amountsPadding,
    rectangleMapping,
    startOfChartY,
    rectangleHeight,
    lineStrokeWidth
} from 'dataMapping/covid19/covid19';
import { calculateUnits, formatMoneyWithPrecision } from 'helpers/moneyFormatter';
import { useSelector } from 'react-redux';

const spacingBetweenLine = 10;

const propTypes = {
    overviewData: PropTypes.object,
    width: PropTypes.number
};

// const fakeData = {
//     _totalBudgetAuthority: 2400000000000,
//     _totalObligations: 963000000000,
//     _totalOutlays: 459000000000,
//     _remainingBalance: 1400000000000
// };

const AmountsVisualization = ({
    overviewData,
    width = null
}) => {
    const [scale, setScale] = useState(null);
    // const [rectangles, setRectangles] = useState(null);
    // const [rectangleData, setRectangleData] = useState({});
    const [totalRectangleData, setTotalRectangleData] = useState(null);
    const [outlayRectangleData, setOutlayRectangleData] = useState(null);
    const [obligationRectangleData, setObligationRectangleData] = useState(null);
    const [remainingBalanceRectangleData, setRemainingBalanceRectangleData] = useState(null);
    const [totalLineData, setTotalLineData] = useState(null);
    const [outlayLineData, setOutlayLineData] = useState(null);
    const [obligationLineData, setObligationLineData] = useState(null);
    const [remainingBalanceLineData, setRemainingBalanceLineData] = useState(null);
    const [totalQuestionData, setTotalQuestionData] = useState(null);
    const [outlayQuestionData, setOutlayQuestionData] = useState(null);
    const [obligationQuestionData, setObligationQuestionData] = useState(null);
    const [remainingBalanceQuestionData, setRemainingBalanceQuestionData] = useState(null);
    // const [lines, setLines] = useState([]);
    // const [text, setText] = useState([]);
    const _totalBudgetAuthorityQuestion = useRef(null);
    const _totalBudgetAuthorityLabel = useRef(null);
    const _totalBudgetAuthorityValue = useRef(null);
    const _totalObligationsQuestion = useRef(null);
    const _totalObligationsLabel = useRef(null);
    const _totalObligationsValue = useRef(null);
    const _totalOutlaysQuestion = useRef(null);
    const _totalOutlaysLabel = useRef(null);
    const _totalOutlaysValue = useRef(null);
    const _remainingBalanceQuestion = useRef(null);
    const _remainingBalanceLabel = useRef(null);
    const _remainingBalanceValue = useRef(null);
    const refMapping = {
        _totalBudgetAuthority: {
            question: _totalBudgetAuthorityQuestion,
            label: _totalBudgetAuthorityLabel,
            value: _totalBudgetAuthorityValue
        },
        _totalObligations: {
            question: _totalObligationsQuestion,
            label: _totalObligationsLabel,
            value: _totalObligationsValue
        },
        _totalOutlays: {
            question: _totalOutlaysQuestion,
            label: _totalOutlaysLabel,
            value: _totalOutlaysValue
        },
        _remainingBalance: {
            question: _remainingBalanceQuestion,
            label: _remainingBalanceLabel,
            value: _remainingBalanceValue
        }
    };
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
            console.log('overviewData._totalBudgetAuthority ', overviewData._totalBudgetAuthority);
            console.log(' Scale : ', Object.keys(scale));
            console.log(' Scaled : ', scale(amount));
            console.log('shit ', scale(amount) - (right + (offset.right || 0)));
            const units = calculateUnits([amount]);
            const moneyLabel = `${formatMoneyWithPrecision(amount / units.unit, units.precision)} ${units.longLabel}`;
            const data = {
                x: left + offset.left,
                y: startOfChartY + offset.top,
                rectWidth: scale(amount) - (right + (offset.right || 0)),
                height: rectangleHeight - (2 * offset.bottom),
                fill,
                description: `A rectangle with width representative of the ${textInfo.label} amount ${moneyLabel}`
            };
            console.log(' Data : ', data);
            setTotalRectangleData(data);
        }
    }, [overviewData]);
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
                rectWidth: scale(amount) - (right + (offset.right || 0)),
                height: rectangleHeight - (2 * offset.bottom),
                fill,
                description: `A rectangle with width representative of the ${textInfo.label} amount ${moneyLabel}`
            };
            setOutlayRectangleData(data);
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
                rectWidth: scale(amount) - (right + (offset.right || 0)),
                height: rectangleHeight - (2 * offset.bottom),
                fill,
                description: `A rectangle with width representative of the ${textInfo.label} amount ${moneyLabel}`
            };
            setObligationRectangleData(data);
        }
    }, [scale, overviewData]);
    // remainingBalanceRectangleData
    useEffect(() => {
        if (scale) {
            const { offset, fill, text: textInfo } = rectangleMapping._remainingBalance;
            const amount = Math.abs(overviewData._remainingBalance);
            const units = calculateUnits([amount]);
            const moneyLabel = `${formatMoneyWithPrecision(amount / units.unit, units.precision)} ${units.longLabel}`;
            const rectWidth = scale(overviewData._totalBudgetAuthority) - scale(overviewData._totalObligations) - offset.right;
            let draw = true;
            if (rectWidth.toString().startsWith('-')) draw = false;
            const data = {
                draw,
                x: scale(amount) + (offset.left),
                y: startOfChartY + offset.top,
                rectWidth,
                height: rectangleHeight - (2 * offset.bottom),
                fill,
                description: `A rectangle with width representative of the ${textInfo.label} amount ${moneyLabel}`
            };
            setRemainingBalanceRectangleData(data);
        }
    }, [scale, overviewData]);
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
            setTotalLineData(data);
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
            setOutlayLineData(data);
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
            setObligationLineData(data);
        }
    }, [scale, overviewData]);
    // remainingBalanceLineData
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
            setRemainingBalanceLineData(data);
        }
    }, [scale, overviewData]);
    // totalQuestionData
    useEffect(() => {
        const { text: textInfo } = rectangleMapping._totalBudgetAuthority;
        const questionRef = _totalBudgetAuthorityQuestion.current?.getBoundingClientRect();
        if (questionRef) {
            setTotalQuestionData({
                y: textInfo.questionDown,
                x: totalLineData.x1 - (questionRef.width + spacingBetweenLine),
                text: textInfo.question,
                className: 'amounts-text__question',
            });
        }
    }, [_totalBudgetAuthorityQuestion, totalLineData]);
    // outlayQuestionData
    // obligationQuestionData
    // remainingBalanceQuestionData
    // create overviewData to draw rectangles

    const dateNoteStyles = {
        position: 'absolute',
        transform: `translate(${amountsPadding.left}px,${startOfChartY + rectangleHeight}px)`
    };

    console.log(' Total rect : ', totalRectangleData);

    return (
        <div className="amounts-viz">
            <h3 className="body__narrative amounts-viz__title">
                This is how much was spent on the COVID-19 Response <strong>in total</strong>.
            </h3>
            <DateNote styles={dateNoteStyles} />
            <svg height={amountsHeight} width={width} className="amounts-viz__svg">
                {
                    totalRectangleData &&
                    <g key={uniqueId()} tabIndex="0" aria-label={totalRectangleData.description}>
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
                    outlayRectangleData &&
                    <g key={uniqueId()} tabIndex="0" aria-label={outlayRectangleData.description}>
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
                    obligationRectangleData &&
                    <g key={uniqueId()} tabIndex="0" aria-label={obligationRectangleData.description}>
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
                    remainingBalanceRectangleData && remainingBalanceRectangleData.draw &&
                    <g key={uniqueId()} tabIndex="0" aria-label={remainingBalanceRectangleData.description}>
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
                    <g key={uniqueId()} tabIndex="0" aria-label="A line linking a rectangle to text">
                        <desc>A line linking a rectangle to text</desc>
                        <line
                            x1={totalLineData.x1}
                            x2={totalLineData.x2}
                            y1={totalLineData.y1}
                            y2={totalLineData.y2}
                            stroke={totalLineData.stroke}
                            strokeWidth={totalLineData.strokeWidth} />
                    </g>
                }
                {
                    outlayLineData &&
                    <g key={uniqueId()} tabIndex="0" aria-label="A line linking a rectangle to text">
                        <desc>A line linking a rectangle to text</desc>
                        <line
                            x1={outlayLineData.x1}
                            x2={outlayLineData.x2}
                            y1={outlayLineData.y1}
                            y2={outlayLineData.y2}
                            stroke={outlayLineData.stroke}
                            strokeWidth={outlayLineData.strokeWidth} />
                    </g>
                }
                {
                    obligationLineData &&
                    <g key={uniqueId()} tabIndex="0" aria-label="A line linking a rectangle to text">
                        <desc>A line linking a rectangle to text</desc>
                        <line
                            x1={obligationLineData.x1}
                            x2={obligationLineData.x2}
                            y1={obligationLineData.y1}
                            y2={obligationLineData.y2}
                            stroke={obligationLineData.stroke}
                            strokeWidth={obligationLineData.strokeWidth} />
                    </g>
                }
                {
                    remainingBalanceLineData && remainingBalanceRectangleData && remainingBalanceRectangleData.draw &&
                    <g key={uniqueId()} tabIndex="0" aria-label="A line linking a rectangle to text">
                        <desc>A line linking a rectangle to text</desc>
                        <line
                            x1={remainingBalanceLineData.x1}
                            x2={remainingBalanceLineData.x2}
                            y1={remainingBalanceLineData.y1}
                            y2={remainingBalanceLineData.y2}
                            stroke={remainingBalanceLineData.stroke}
                            strokeWidth={remainingBalanceLineData.strokeWidth} />
                    </g>
                }
                {
                    totalQuestionData &&
                    <g key={uniqueId()} tabIndex="0">
                        <text
                            ref={_totalBudgetAuthorityQuestion}
                            className={totalQuestionData.className}
                            x={totalQuestionData.x}
                            y={totalQuestionData.y}>
                            {totalQuestionData.text}
                        </text>
                    </g>
                }
            </svg>
        </div>
    );
};

AmountsVisualization.propTypes = propTypes;
export default AmountsVisualization;
