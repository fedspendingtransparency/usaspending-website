/**
 * AmountsVisualization.jsx
 * Created by Jonathan Hill 06/23/20
 */

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { upperFirst } from 'lodash';
import { scaleLinear } from 'd3-scale';
import DateNote from 'components/covid19/DateNote';
import ResultsTableLoadingMessage from 'components/search/table/ResultsTableLoadingMessage';
import { TooltipWrapper } from 'data-transparency-ui';
import PaginatedTooltipContainer from 'components/award/shared/activity/PaginatedTooltipContainer';
import Tooltip from 'components/award/shared/activity/Tooltip';
import {
    amountsHeight,
    amountsPadding,
    rectangleMapping,
    startOfChartY,
    rectangleHeight,
    lineStrokeWidth,
    spacingBetweenLineAndText,
    remaniningBalanceLineWidth,
    labelTextAdjustment,
    heightOfRemainingBalanceLines,
    defaultTooltipWidth
} from 'dataMapping/covid19/covid19';
import {
    calculateUnits,
    formatMoneyWithPrecision,
    formatMoney,
    calculateTreemapPercentage
} from 'helpers/moneyFormatter';

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
    // Four Obligation lines due to overlap with remaining balance text
    const [obligationLineDataOne, setObligationLineDataOne] = useState(null);
    const [obligationLineDataTwo, setObligationLineDataTwo] = useState(null);
    const [obligationLineDataThree, setObligationLineDataThree] = useState(null);
    const [obligationLineDataFour, setObligationLineDataFour] = useState(null);
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
    const [zeroPercentData, setZeroPercentData] = useState(null);
    const [oneHundredPercentData, setOneHundredPercentData] = useState(null);
    const [leftRemainingBalanceVerticalLineData, setLeftRemainingBalanceVerticalLineData] = useState(null);
    const [rightRemainingBalanceVerticalLineData, setRightRemainingBalanceVerticalLineData] = useState(null);
    const [remainingBalanceHorizontalLineData, setRemainingBalanceHorizontalLineData] = useState(null);
    const [obligationLineDataThreeOverlap, setObligationLineDataThreeOverlap] = useState(false);
    const [obligationLineDataTwoOverlap, setObligationLineDataTwoOverlap] = useState(false);
    const [drawRemainingBalanceItems, setDrawRemainingBalanceItems] = useState(true);
    const [drawRemainingBalanceText, setDrawRemainingBalanceText] = useState(true);
    const [showTotalTooltip, setShowTotalTooltip] = useState(false);
    const [totalTooltipData, setTotalTooltipData] = useState({});
    const [showObligationsTooltip, setShowObligationsTooltip] = useState(false);
    const [obligationsTooltipData, setObligationsTooltipData] = useState({});
    const [showOutlaysTooltip, setShowOutlaysTooltip] = useState(false);
    const [outlaysTooltipData, setOutlaysTooltipData] = useState({});
    const [showRemainingBalanceTooltip, setShowRemainingBalanceTooltip] = useState(false);
    const [remainingBalanceTooltipData, setRemainingBalanceTooltipData] = useState({});
    const [mouseValue, setMouseValue] = useState({ x: 0, y: 0 });
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
    const setMouseData = (e) => setMouseValue({ x: e.offsetX, y: e.offsetY });
    useEffect(() => {
        window.addEventListener('mousemove', setMouseData);
        return () => window.removeEventListener('mousemove', setMouseData);
    }, []);
    // totalRectangleData
    useEffect(() => {
        if (scale && Object.keys(overviewData).length > 0) {
            const { offset, fill, text: textInfo } = rectangleMapping._totalBudgetAuthority;
            const { left, right } = amountsPadding;
            const amount = Math.abs(overviewData._totalBudgetAuthority);
            const units = calculateUnits([amount]);
            const moneyLabel = `${formatMoneyWithPrecision(amount / units.unit, 1)} ${upperFirst(units.longLabel)}`;
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
            const moneyLabel = `${formatMoneyWithPrecision(amount / units.unit, 1)} ${upperFirst(units.longLabel)}`;
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
            const moneyLabel = `${formatMoneyWithPrecision(amount / units.unit, 1)} ${upperFirst(units.longLabel)}`;
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
            const moneyLabel = `${formatMoneyWithPrecision(amount / units.unit, 1)} ${upperFirst(units.longLabel)}`;
            let draw = true;
            let adjustedWidth = (totalRectangleData?.width || 0) - (obligationRectangleData?.width || 0) - offset.right;
            if (adjustedWidth <= 2) {
                adjustedWidth = 0;
                draw = false;
            }
            const data = {
                x: amountsPadding.left + obligationRectangleData.width,
                y: startOfChartY + offset.top,
                width: adjustedWidth,
                height: rectangleHeight - (2 * offset.bottom),
                fill,
                description: `A rectangle with width representative of the ${textInfo.label} amount ${moneyLabel}`
            };
            if (!isNaN(scale(amount))) setRemainingBalanceRectangleData(data);
            setDrawRemainingBalanceItems(draw);
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
    // obligationLineDataOne
    useEffect(() => {
        if (scale) {
            const {
                offset,
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
                y2: startOfChartY + rectangleHeight + heightOfRemainingBalanceLines + (spacingBetweenLineAndText / 2)
            };
            if (!isNaN(scale(amount))) setObligationLineDataOne(data);
        }
    }, [scale, overviewData]);
    // obligationLineDataTwo
    useEffect(() => {
        if (scale) {
            const amount = Math.abs(overviewData._totalObligations);
            const data = {
                lineColor: rectangleMapping._totalObligations.lineColor,
                x1: obligationLineDataOne?.x1 || 0,
                x2: obligationLineDataOne?.x1 || 0,
                y1: obligationLineDataOne?.y2 || 0,
                y2: (obligationLineDataOne?.y2 || 0) + (obligationQuestionData?.height || 0) + (rectangleMapping._remainingBalance.text.offset.y / 2) + 3
            };
            if (!isNaN(scale(amount))) setObligationLineDataTwo(data);
        }
    }, [scale, obligationLineDataOne]);
    // obligationLineDataThree
    useEffect(() => {
        if (scale) {
            const amount = Math.abs(overviewData._totalObligations);
            const data = {
                lineColor: rectangleMapping._totalObligations.lineColor,
                x1: obligationLineDataTwo?.x1 || 0,
                x2: obligationLineDataTwo?.x1 || 0,
                y1: obligationLineDataTwo?.y2 || 0,
                y2: ((obligationLineDataTwo?.y2 || 0) + (obligationValueData?.height || 0)) - 3
            };
            if (!isNaN(scale(amount))) setObligationLineDataThree(data);
        }
    }, [scale, obligationLineDataTwo]);
    // obligationLineDataFour
    useEffect(() => {
        if (scale) {
            const {
                lineLength,
                lineColor
            } = rectangleMapping._totalObligations;
            const amount = Math.abs(overviewData._totalObligations);
            const data = {
                lineColor,
                x1: obligationLineDataThree?.x1 || 0,
                x2: obligationLineDataThree?.x1 || 0,
                y1: obligationLineDataThree?.y2 || 0,
                y2: startOfChartY + rectangleHeight + lineLength
            };
            if (!isNaN(scale(amount))) setObligationLineDataFour(data);
        }
    }, [scale, obligationLineDataThree]);
    // totalQuestionData
    useLayoutEffect(() => {
        const { text: textInfo } = rectangleMapping._totalBudgetAuthority;
        const questionRef = _totalBudgetAuthorityQuestion.current?.getBoundingClientRect();
        setTotalQuestionData({
            y: (totalLineData?.y1 || 0) + (questionRef?.height || 0),
            x: (totalLineData?.x1 || 0) - ((questionRef?.width || 0) + spacingBetweenLineAndText),
            height: questionRef?.height || 0,
            text: textInfo.question,
            className: `amounts-text__question ${!questionRef ? 'white' : ''}`
        });
    }, [totalLineData]);
    // totalValueData
    useLayoutEffect(() => {
        const ref = _totalBudgetAuthorityValue.current?.getBoundingClientRect();
        const amount = Math.abs(overviewData._totalBudgetAuthority);
        const units = calculateUnits([amount]);
        const moneyLabel = `${formatMoneyWithPrecision(amount / units.unit, 1)} ${upperFirst(units.longLabel)}`;
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
                y: totalLineData.y1 + totalQuestionData.height + (ref?.height || 0) + labelTextAdjustment.y + 2,
                x: totalLineData.x1 - ((ref?.width || 0) + (totalValueData?.theWidth || 0) + spacingBetweenLineAndText + labelTextAdjustment.x),
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
        setRemainingBalanceQuestionData({
            y: startOfChartY + rectangleHeight + heightOfRemainingBalanceLines + (remainingBalanceValueData?.height || 0) + (questionRef?.height || 0),
            x: width - amountsPadding.right - (questionRef?.width || 0),
            height: questionRef?.height || 0,
            text: textInfo.question,
            className: `amounts-text__question ${!questionRef ? 'white' : ''}`
        });
    }, [obligationLabelData, width]);
    // remainingBalanceValueData
    useLayoutEffect(() => {
        const ref = _remainingBalanceValue.current?.getBoundingClientRect();
        const amount = Math.abs(overviewData._remainingBalance);
        const units = calculateUnits([amount]);
        const moneyLabel = `${formatMoneyWithPrecision(amount / units.unit, 1)} ${upperFirst(units.longLabel)}`;
        setRemainingBalanceValueData({
            y: startOfChartY + rectangleHeight + heightOfRemainingBalanceLines + (ref?.height || 0),
            x: width - amountsPadding.right - (ref?.width || 0),
            height: ref?.height || 0,
            theWidth: ref?.width || 0,
            text: moneyLabel,
            className: `amounts-text__value ${!ref ? 'white' : ''}`
        });
    }, [remainingBalanceQuestionData]);
    // remainingBalanceLabelData
    useLayoutEffect(() => {
        const ref = _remainingBalanceLabel.current?.getBoundingClientRect();
        const { text: textInfo } = rectangleMapping._remainingBalance;
        setRemainingBalanceLabelData({
            y: startOfChartY + rectangleHeight + heightOfRemainingBalanceLines + 5 + (ref?.height || 0),
            x: width - amountsPadding.right - ((ref?.width || 0) + (remainingBalanceValueData?.theWidth || 0) + 4),
            height: ref?.height || 0,
            text: textInfo.label,
            className: `amounts-text__label ${!ref ? 'white' : ''}`
        });
    }, [width, remainingBalanceValueData]);
    // outlayQuestionData
    useLayoutEffect(() => {
        const { text: textInfo } = rectangleMapping._totalOutlays;
        const questionRef = _outlayQuestion.current?.getBoundingClientRect();
        if (((outlayLineData?.x1 || 0) + spacingBetweenLineAndText + (questionRef?.width || 0)) > (width - amountsPadding.right - 1)) {
            // text to the left of the line
            setOutlayQuestionData({
                y: (outlayLineData?.y1 || 0) + (questionRef?.height || 0),
                x: (outlayLineData?.x1 || 0) - ((questionRef?.width || 0) + spacingBetweenLineAndText),
                height: questionRef?.height || 0,
                text: textInfo.question,
                className: `amounts-text__question ${!questionRef ? 'white' : ''}`,
                left: true
            });
        }
        else { // text to the right of the line
            setOutlayQuestionData({
                y: (outlayLineData?.y1 || 0) + (questionRef?.height || 0),
                x: (outlayLineData?.x1 || 0) + spacingBetweenLineAndText,
                height: questionRef?.height || 0,
                text: textInfo.question,
                className: `amounts-text__question ${!questionRef ? 'white' : ''}`
            });
        }
    }, [outlayLineData]);
    // outlayValueData
    useLayoutEffect(() => {
        const ref = _outlayValue.current?.getBoundingClientRect();
        const amount = Math.abs(overviewData._totalOutlays);
        const units = calculateUnits([amount]);
        const moneyLabel = `${formatMoneyWithPrecision(amount / units.unit, 1)} ${upperFirst(units.longLabel)}`;
        if (outlayLineData) {
            if (outlayQuestionData?.left || 0) {
                setOutlayValueData({
                    y: outlayLineData.y1 + (outlayQuestionData?.height || 0) + (ref?.height || 0),
                    x: outlayLineData.x1 - ((ref?.width || 0) + spacingBetweenLineAndText),
                    height: ref?.height || 0,
                    theWidth: ref?.width || 0,
                    text: moneyLabel,
                    className: `amounts-text__value ${!ref ? 'white' : ''}`
                });
            }
            else { // text to the right of the line
                setOutlayValueData({
                    y: outlayLineData.y1 + (outlayQuestionData?.height || 0) + (ref?.height || 0),
                    x: outlayLineData.x1 + (outlayLabelData?.theWidth || 0) + spacingBetweenLineAndText + labelTextAdjustment.x,
                    height: ref?.height || 0,
                    theWidth: ref?.width || 0,
                    text: moneyLabel,
                    className: `amounts-text__value ${!ref ? 'white' : ''}`
                });
            }
        }
    }, [outlayLabelData]);
    // outlayLabelData
    useLayoutEffect(() => {
        const ref = _outlayLabel.current?.getBoundingClientRect();
        const { text: textInfo } = rectangleMapping._totalOutlays;
        if (outlayLineData && outlayQuestionData) {
            if (outlayQuestionData.left) {
                setOutlayLabelData({
                    y: outlayLineData.y1 + outlayQuestionData.height + (ref?.height || 0) + labelTextAdjustment.y + 2,
                    x: outlayLineData.x1 - ((ref?.width || 0) + (outlayValueData?.theWidth || 0) + spacingBetweenLineAndText + labelTextAdjustment.x),
                    height: ref?.height || 0,
                    text: textInfo.label,
                    theWidth: ref?.width || 0,
                    className: `amounts-text__label ${!ref ? 'white' : ''}`
                });
            }
            else { // text to the right of line
                setOutlayLabelData({
                    y: outlayLineData.y1 + outlayQuestionData.height + (ref?.height || 0) + labelTextAdjustment.y + 2,
                    x: outlayLineData.x1 + spacingBetweenLineAndText,
                    height: ref?.height || 0,
                    text: textInfo.label,
                    theWidth: ref?.width || 0,
                    className: `amounts-text__label ${!ref ? 'white' : ''}`
                });
            }
        }
    }, [outlayLineData, outlayQuestionData]);
    // obligationQuestionData
    useLayoutEffect(() => {
        const { text: textInfo } = rectangleMapping._totalObligations;
        const questionRef = _obligationQuestion.current?.getBoundingClientRect();
        setObligationQuestionData({
            y: (obligationLineDataFour?.y2 || 0) - spacingBetweenLineAndText,
            x: (obligationLineDataFour?.x1 || 0) - ((questionRef?.width || 0) + spacingBetweenLineAndText),
            height: questionRef?.height || 0,
            text: textInfo.question,
            className: `amounts-text__question ${!questionRef ? 'white' : ''}`,
            left: true
        });
    }, [obligationLineDataFour]);
    // obligationValueData
    useLayoutEffect(() => {
        const ref = _obligationValue.current?.getBoundingClientRect();
        const amount = Math.abs(overviewData._totalObligations);
        const units = calculateUnits([amount]);
        const moneyLabel = `${formatMoneyWithPrecision(amount / units.unit, 1)} ${upperFirst(units.longLabel)}`;
        if (obligationQuestionData?.left) {
            setObligationValueData({
                y: (obligationLineDataFour?.y2 || 0) - (obligationQuestionData?.height || 0) - spacingBetweenLineAndText,
                x: (obligationLineDataFour?.x1 || 0) - ((ref?.width || 0) + spacingBetweenLineAndText),
                height: ref?.height || 0,
                theWidth: ref?.width || 0,
                text: moneyLabel,
                className: `amounts-text__value ${!ref ? 'white' : ''}`
            });
        }
        else {
            setObligationValueData({
                y: (obligationLineDataFour?.y2 || 0) - (obligationQuestionData?.height || 0) - spacingBetweenLineAndText,
                x: (obligationLineDataFour?.x1 || 0) + (obligationLabelData?.theWidth || 0) + spacingBetweenLineAndText + labelTextAdjustment.x,
                height: ref?.height || 0,
                theWidth: ref?.width || 0,
                text: moneyLabel,
                className: `amounts-text__value ${!ref ? 'white' : ''}`
            });
        }
    }, [obligationLineDataFour, zeroPercentData]);
    // obligationLabelData
    useLayoutEffect(() => {
        const ref = _obligationLabel.current?.getBoundingClientRect();
        const { text: textInfo } = rectangleMapping._totalObligations;
        if (obligationQuestionData?.left) {
            setObligationLabelData({
                y: (obligationLineDataFour?.y2 || 0) - (obligationQuestionData?.height || 0) - spacingBetweenLineAndText,
                x: (obligationLineDataFour?.x1 || 0) - ((ref?.width || 0) + (obligationValueData?.theWidth || 0) + spacingBetweenLineAndText + labelTextAdjustment.x),
                height: ref?.height || 0,
                text: textInfo.label,
                theWidth: ref?.width || 0,
                className: `amounts-text__label ${!ref ? 'white' : ''}`
            });
        }
        else {
            setObligationLabelData({
                y: (obligationLineDataFour?.y2 || 0) - spacingBetweenLineAndText,
                x: (obligationLineDataFour?.x1 || 0) + spacingBetweenLineAndText,
                height: ref?.height || 0,
                text: textInfo.label,
                theWidth: ref?.width || 0,
                className: `amounts-text__label ${!ref ? 'white' : ''}`
            });
        }
    }, [obligationValueData]);
    // 0%
    useLayoutEffect(() => {
        const ref = zerPercentRef.current?.getBoundingClientRect();
        setZeroPercentData({
            y: startOfChartY + (rectangleHeight / 2) + 2,
            x: amountsPadding.left - (ref?.width || 0) - labelTextAdjustment.x
        });
    }, [width, totalRectangleData]);
    // 100%
    useLayoutEffect(() => {
        setOneHundredPercentData({
            y: startOfChartY + (rectangleHeight / 2) + 2,
            x: (width - amountsPadding.right) + labelTextAdjustment.x
        });
    }, [width, totalRectangleData]);
    // leftRemainingBalanceVerticalLineData
    useEffect(() => {
        if (scale && drawRemainingBalanceItems) {
            const data = {
                lineColor: '#555',
                x1: ((obligationLineDataFour?.x1 || 0) + (lineStrokeWidth / 2) + 3) - remaniningBalanceLineWidth,
                x2: ((obligationLineDataFour?.x1 || 0) + (lineStrokeWidth / 2) + 3) - remaniningBalanceLineWidth,
                y1: startOfChartY + rectangleHeight + (heightOfRemainingBalanceLines / 2),
                y2: startOfChartY + rectangleHeight + heightOfRemainingBalanceLines
            };
            setLeftRemainingBalanceVerticalLineData(data);
        }
    }, [scale, obligationLineDataFour, drawRemainingBalanceItems]);
    // rightRemainingBalanceVerticalLineData
    useEffect(() => {
        if (scale && drawRemainingBalanceItems) {
            const data = {
                lineColor: '#555',
                x1: width - amountsPadding.right - remaniningBalanceLineWidth,
                x2: width - amountsPadding.right - remaniningBalanceLineWidth,
                y1: startOfChartY + rectangleHeight + (heightOfRemainingBalanceLines / 2),
                y2: startOfChartY + rectangleHeight + heightOfRemainingBalanceLines
            };
            setRightRemainingBalanceVerticalLineData(data);
        }
    }, [scale, width, drawRemainingBalanceItems]);
    // remainingBalanceHorizontalLineData
    useEffect(() => {
        if (scale && drawRemainingBalanceItems) {
            const data = {
                lineColor: '#555',
                x1: leftRemainingBalanceVerticalLineData?.x1 || 0,
                x2: rightRemainingBalanceVerticalLineData?.x1 || 0,
                y1: startOfChartY + rectangleHeight + heightOfRemainingBalanceLines,
                y2: startOfChartY + rectangleHeight + heightOfRemainingBalanceLines
            };
            setRemainingBalanceHorizontalLineData(data);
        }
    }, [scale, leftRemainingBalanceVerticalLineData, rightRemainingBalanceVerticalLineData, drawRemainingBalanceItems]);
    useEffect(() => {
        const data = {
            lineColor: 'transparent',
            x1: 0,
            x2: 0,
            y1: 0,
            y2: 0
        };
        if (!drawRemainingBalanceItems) {
            setLeftRemainingBalanceVerticalLineData(data);
            setRightRemainingBalanceVerticalLineData(data);
            setRemainingBalanceHorizontalLineData(data);
        }
    }, [drawRemainingBalanceItems]);
    // obligationLineDataTwoOverlap
    useEffect(() => {
        if (((obligationLineDataTwo?.x1 || 0) + (lineStrokeWidth / 2)) >= (remainingBalanceLabelData?.x || 0)) {
            setObligationLineDataTwoOverlap(true);
        }
        else {
            setObligationLineDataTwoOverlap(false);
        }
    }, [obligationLineDataTwo, remainingBalanceLabelData, remainingBalanceValueData]);
    // obligationLineDataThreeOverlap
    useEffect(() => {
        if (((obligationLineDataThree?.x1 || 0) + (lineStrokeWidth / 2)) >= (remainingBalanceQuestionData?.x || 0)) {
            setObligationLineDataThreeOverlap(true);
        }
        else {
            setObligationLineDataThreeOverlap(false);
        }
    }, [obligationLineDataThree, remainingBalanceQuestionData]);
    // draw remaining balance text
    useEffect(() => {
        if (overviewData) {
            if (overviewData._totalBudgetAuthority - overviewData._remainingBalance <= 0) {
                setDrawRemainingBalanceText(false);
            }
            else {
                setDrawRemainingBalanceText(true);
            }
        }
    }, [overviewData]);

    const displayTotalTooltip = () => {
        setTotalTooltipData({
            tooltipPosition: 'bottom',
            styles: {
                position: 'absolute',
                transform: `translate(${mouseValue.x - (defaultTooltipWidth / 2)}px,${mouseValue.y + 10}px)`
            },
            tooltipComponent: <PaginatedTooltipContainer
                data={[{
                    title: 'Total Budgetary Resources',
                    sections: [
                        {
                            paragraphs: [
                                `${formatMoney(overviewData._totalBudgetAuthority)}`,
                                `${calculateTreemapPercentage(overviewData._totalBudgetAuthority, overviewData._totalBudgetAuthority)} of Total Budgetary Resources`,
                                'This amount represents all congressional appropriations and other available budgetary resources.'
                            ]
                        }
                    ]
                }]
                }
                tooltipElement={<Tooltip />} />
        });
        setShowTotalTooltip(true);
    };
    const hideTotalTooltip = () => setShowTotalTooltip(false);
    const displayOutlaysTooltip = () => {
        setOutlaysTooltipData({
            tooltipPosition: 'bottom',
            styles: {
                position: 'absolute',
                transform: `translate(${mouseValue.x - (defaultTooltipWidth / 2)}px,${mouseValue.y + 10}px)`
            },
            tooltipComponent: <PaginatedTooltipContainer
                data={[{
                    title: 'Total Outlays',
                    sections: [
                        {
                            paragraphs: [
                                `${formatMoney(overviewData._totalOutlays)}`,
                                `${calculateTreemapPercentage(overviewData._totalOutlays, overviewData._totalBudgetAuthority)} of Total Budgetary Resources`,
                                'This amount represents all outlays, or actual payments, made by agencies.'
                            ]
                        }
                    ]
                }]
                }
                tooltipElement={<Tooltip />} />
        });
        setShowOutlaysTooltip(true);
    };
    const hideOutlaysTooltip = () => setShowOutlaysTooltip(false);
    const displayObligationsTooltip = () => {
        setObligationsTooltipData({
            tooltipPosition: 'bottom',
            styles: {
                position: 'absolute',
                transform: `translate(${mouseValue.x - (defaultTooltipWidth / 2)}px,${mouseValue.y + 10}px)`
            },
            tooltipComponent: <PaginatedTooltipContainer
                data={[{
                    title: 'Total Obligations',
                    sections: [
                        {
                            paragraphs: [
                                `${formatMoney(overviewData._totalObligations)}`,
                                `${calculateTreemapPercentage(overviewData._totalObligations, overviewData._totalBudgetAuthority)} of Total Budgetary Resources`,
                                'This amount represents all obligations, or promises of payment, made by agencies.'
                            ]
                        }
                    ]
                }]
                }
                tooltipElement={<Tooltip />} />
        });
        setShowObligationsTooltip(true);
    };
    const hideObligationsTooltip = () => {
        setShowObligationsTooltip(false);
    };
    const displayRemainingBalanceTooltip = () => {
        setRemainingBalanceTooltipData({
            tooltipPosition: 'bottom',
            styles: {
                position: 'absolute',
                transform: `translate(${mouseValue.x - (defaultTooltipWidth / 2)}px,${mouseValue.y + 10}px)`
            },
            tooltipComponent: <PaginatedTooltipContainer
                data={[{
                    title: 'Total Remaining Balance',
                    sections: [
                        {
                            paragraphs: [
                                `${formatMoney(overviewData._remainingBalance)}`,
                                `${calculateTreemapPercentage(overviewData._remainingBalance, overviewData._totalBudgetAuthority)} of Total Budgetary Resources`,
                                'This amount represents how much is left to be obligated, or promised to be paid, by agencies. '
                            ]
                        }
                    ]
                }]
                }
                tooltipElement={<Tooltip />} />
        });
        setShowRemainingBalanceTooltip(true);
    };
    const hideRemainingBalanceTooltip = () => setShowRemainingBalanceTooltip(false);

    const dateNoteStyles = {
        position: 'absolute',
        transform: `translate(${amountsPadding.left}px,${startOfChartY + rectangleHeight}px)`
    };

    return (
        <div className="amounts-viz award-amounts-viz">
            <h3 className="body__narrative amounts-viz__title">
                This is how much was <strong>spent</strong> so far in response to COVID-19
            </h3>
            {
                loading &&
                <div className="results-table-message-container">
                    <ResultsTableLoadingMessage />
                </div>
            }
            <DateNote styles={dateNoteStyles} />
            {
                showTotalTooltip &&
                <TooltipWrapper
                    className="award-section-tt"
                    {...totalTooltipData}
                    wide={false}
                    width={defaultTooltipWidth}
                    controlledProps={{
                        isControlled: true,
                        isVisible: showTotalTooltip
                    }} />
            }
            {
                showOutlaysTooltip &&
                <TooltipWrapper
                    className="award-section-tt"
                    {...outlaysTooltipData}
                    wide={false}
                    width={defaultTooltipWidth}
                    controlledProps={{
                        isControlled: true,
                        isVisible: showOutlaysTooltip
                    }} />
            }
            {
                showObligationsTooltip &&
                <TooltipWrapper
                    className="award-section-tt"
                    {...obligationsTooltipData}
                    wide={false}
                    width={defaultTooltipWidth}
                    controlledProps={{
                        isControlled: true,
                        isVisible: showObligationsTooltip
                    }} />
            }
            {
                showRemainingBalanceTooltip &&
                <TooltipWrapper
                    className="award-section-tt"
                    {...remainingBalanceTooltipData}
                    wide={false}
                    width={defaultTooltipWidth}
                    controlledProps={{
                        isControlled: true,
                        isVisible: showRemainingBalanceTooltip
                    }} />
            }
            {
                !loading &&
                <svg height={amountsHeight} width={width} className="amounts-viz__svg">
                    {
                        totalRectangleData &&
                        <g
                            tabIndex="0"
                            aria-label={totalRectangleData.description}
                            onFocus={displayTotalTooltip}
                            onBlur={hideTotalTooltip}>
                            <desc>
                                {totalRectangleData.description}
                            </desc>
                            <rect
                                className={showTotalTooltip ? 'highlight' : ''}
                                x={totalRectangleData.x}
                                y={totalRectangleData.y}
                                width={totalRectangleData.width}
                                height={totalRectangleData.height}
                                fill={totalRectangleData.fill}
                                onMouseMove={displayTotalTooltip}
                                onMouseLeave={hideTotalTooltip} />
                        </g>
                    }
                    {
                        totalLineData &&
                        <g
                            tabIndex="0"
                            aria-label="A line linking a rectangle to text"
                            onFocus={displayTotalTooltip}
                            onBlur={hideTotalTooltip}>
                            <desc>A line linking a rectangle to text</desc>
                            <line
                                x1={totalLineData.x1}
                                x2={totalLineData.x2}
                                y1={totalLineData.y1}
                                y2={totalLineData.y2}
                                stroke={totalLineData.lineColor}
                                strokeWidth={lineStrokeWidth}
                                onMouseMove={displayTotalTooltip}
                                onMouseLeave={hideTotalTooltip} />
                        </g>
                    }
                    {
                        obligationRectangleData &&
                        <g
                            tabIndex="0"
                            aria-label={obligationRectangleData.description}
                            onFocus={displayObligationsTooltip}
                            onBlur={hideObligationsTooltip}>
                            <desc>
                                {obligationRectangleData.description}
                            </desc>
                            <rect
                                className={showObligationsTooltip ? 'highlight' : ''}
                                x={obligationRectangleData.x}
                                y={obligationRectangleData.y}
                                width={obligationRectangleData.width}
                                height={obligationRectangleData.height}
                                fill={obligationRectangleData.fill}
                                onMouseMove={displayObligationsTooltip}
                                onMouseLeave={hideObligationsTooltip} />
                        </g>
                    }
                    {
                        outlayRectangleData &&
                        <g
                            tabIndex="0"
                            aria-label={outlayRectangleData.description}
                            onFocus={displayOutlaysTooltip}
                            onBlur={hideOutlaysTooltip}>
                            <desc>
                                {outlayRectangleData.description}
                            </desc>
                            <rect
                                className={showOutlaysTooltip ? 'highlight' : ''}
                                x={outlayRectangleData.x}
                                y={outlayRectangleData.y}
                                width={outlayRectangleData.width}
                                height={outlayRectangleData.height}
                                fill={outlayRectangleData.fill}
                                onMouseMove={displayOutlaysTooltip}
                                onMouseLeave={hideOutlaysTooltip} />
                        </g>
                    }
                    {
                        remainingBalanceRectangleData && drawRemainingBalanceItems &&
                        <g
                            tabIndex="0"
                            aria-label={remainingBalanceRectangleData.description}
                            onFocus={displayRemainingBalanceTooltip}
                            onBlur={hideRemainingBalanceTooltip}>
                            <desc>
                                {remainingBalanceRectangleData.description}
                            </desc>
                            <rect
                                className={showRemainingBalanceTooltip ? 'highlight' : ''}
                                x={remainingBalanceRectangleData.x}
                                y={remainingBalanceRectangleData.y}
                                width={remainingBalanceRectangleData.width}
                                height={remainingBalanceRectangleData.height}
                                fill={remainingBalanceRectangleData.fill}
                                onMouseMove={displayRemainingBalanceTooltip}
                                onMouseLeave={hideRemainingBalanceTooltip} />
                        </g>
                    }
                    {
                        outlayLineData &&
                        <g
                            tabIndex="0"
                            aria-label="A line linking a rectangle to text"
                            onFocus={displayOutlaysTooltip}
                            onBlur={hideOutlaysTooltip}>
                            <desc>A line linking a rectangle to text</desc>
                            <line
                                x1={outlayLineData.x1}
                                x2={outlayLineData.x2}
                                y1={outlayLineData.y1}
                                y2={outlayLineData.y2}
                                stroke={outlayLineData.lineColor}
                                strokeWidth={lineStrokeWidth}
                                onMouseMove={displayOutlaysTooltip}
                                onMouseLeave={hideOutlaysTooltip} />
                        </g>
                    }
                    {
                        obligationLineDataOne &&
                        <g
                            tabIndex="0"
                            aria-label="A line linking a rectangle to text"
                            onFocus={displayObligationsTooltip}
                            onBlur={hideObligationsTooltip}>
                            <desc>A line linking a rectangle to text</desc>
                            <line
                                className="line__obligation"
                                x1={obligationLineDataOne.x1}
                                x2={obligationLineDataOne.x2}
                                y1={obligationLineDataOne.y1}
                                y2={obligationLineDataOne.y2}
                                strokeWidth={lineStrokeWidth}
                                onMouseMove={displayObligationsTooltip}
                                onMouseLeave={hideObligationsTooltip} />
                        </g>
                    }
                    {
                        obligationLineDataTwo &&
                        <g
                            tabIndex="0"
                            aria-label="A line 2 linking a rectangle to text"
                            onFocus={displayObligationsTooltip}
                            onBlur={hideObligationsTooltip}>
                            <desc>A line linking a rectangle to text</desc>
                            <line
                                x1={obligationLineDataTwo.x1}
                                x2={obligationLineDataTwo.x2}
                                y1={obligationLineDataTwo.y1}
                                y2={obligationLineDataTwo.y2}
                                className={(drawRemainingBalanceText && obligationLineDataTwoOverlap) ? 'line__opacity' : 'line__obligation'}
                                onMouseMove={displayObligationsTooltip}
                                onMouseLeave={hideObligationsTooltip} />
                        </g>
                    }
                    {
                        obligationLineDataThree &&
                        <g
                            tabIndex="0"
                            aria-label="A line 3 linking a rectangle to text"
                            onFocus={displayObligationsTooltip}
                            onBlur={hideObligationsTooltip}>
                            <desc>A line linking a rectangle to text</desc>
                            <line
                                x1={obligationLineDataThree.x1}
                                x2={obligationLineDataThree.x2}
                                y1={obligationLineDataThree.y1}
                                y2={obligationLineDataThree.y2}
                                className={(drawRemainingBalanceText && obligationLineDataThreeOverlap) ? 'line__opacity' : 'line__obligation'}
                                onMouseMove={displayObligationsTooltip}
                                onMouseLeave={hideObligationsTooltip} />
                        </g>
                    }
                    {
                        obligationLineDataFour &&
                        <g
                            tabIndex="0"
                            aria-label="A line 4 linking a rectangle to text"
                            onFocus={displayObligationsTooltip}
                            onBlur={hideObligationsTooltip}>
                            <desc>A line linking a rectangle to text</desc>
                            <line
                                className="line__obligation"
                                x1={obligationLineDataFour.x1}
                                x2={obligationLineDataFour.x2}
                                y1={obligationLineDataFour.y1}
                                y2={obligationLineDataFour.y2}
                                strokeWidth={lineStrokeWidth}
                                onMouseMove={displayObligationsTooltip}
                                onMouseLeave={hideObligationsTooltip} />
                        </g>
                    }
                    {
                        totalQuestionData &&
                        <g
                            tabIndex="0"
                            aria-label={totalQuestionData.text}
                            onFocus={displayTotalTooltip}
                            onBlur={hideTotalTooltip}>
                            <desc>{totalQuestionData.text}</desc>
                            <text
                                ref={_totalBudgetAuthorityQuestion}
                                className={totalQuestionData.className}
                                x={totalQuestionData.x}
                                y={totalQuestionData.y}
                                onMouseMove={displayTotalTooltip}
                                onMouseLeave={hideTotalTooltip}>
                                {totalQuestionData.text}
                            </text>
                        </g>
                    }
                    {
                        totalValueData &&
                        <g
                            tabIndex="0"
                            aria-label={totalValueData.text}
                            onFocus={displayTotalTooltip}
                            onBlur={hideTotalTooltip}>
                            <desc>{totalValueData.text}</desc>
                            <text
                                ref={_totalBudgetAuthorityValue}
                                className={totalValueData.className}
                                x={totalValueData.x}
                                y={totalValueData.y}
                                onMouseMove={displayTotalTooltip}
                                onMouseLeave={hideTotalTooltip}>
                                {totalValueData.text}
                            </text>
                        </g>
                    }
                    {
                        totalLabelData &&
                        <g
                            tabIndex="0"
                            aria-label={totalLabelData.text}
                            onFocus={displayTotalTooltip}
                            onBlur={hideTotalTooltip}>
                            <desc>{totalLabelData.text}</desc>
                            <text
                                ref={_totalBudgetAuthorityLabel}
                                className={totalLabelData.className}
                                x={totalLabelData.x}
                                y={totalLabelData.y}
                                onMouseMove={displayTotalTooltip}
                                onMouseLeave={hideTotalTooltip}>
                                {totalLabelData.text}
                            </text>
                        </g>
                    }
                    {
                        remainingBalanceQuestionData && drawRemainingBalanceText &&
                        <g
                            tabIndex="0"
                            aria-label={remainingBalanceQuestionData.text}
                            onFocus={displayRemainingBalanceTooltip}
                            onBlur={hideRemainingBalanceTooltip}>
                            <desc>{remainingBalanceQuestionData.text}</desc>
                            <text
                                ref={_remainingBalanceQuestion}
                                className={remainingBalanceQuestionData.className}
                                x={remainingBalanceQuestionData.x}
                                y={remainingBalanceQuestionData.y}
                                onMouseMove={displayRemainingBalanceTooltip}
                                onMouseLeave={hideRemainingBalanceTooltip}>
                                {remainingBalanceQuestionData.text}
                            </text>
                        </g>
                    }
                    {
                        remainingBalanceValueData && drawRemainingBalanceText &&
                        <g
                            tabIndex="0"
                            aria-label={remainingBalanceValueData.text}
                            onFocus={displayRemainingBalanceTooltip}
                            onBlur={hideRemainingBalanceTooltip}>
                            <desc>{remainingBalanceValueData.text}</desc>
                            <text
                                ref={_remainingBalanceValue}
                                className={remainingBalanceValueData.className}
                                x={remainingBalanceValueData.x}
                                y={remainingBalanceValueData.y}
                                onMouseMove={displayRemainingBalanceTooltip}
                                onMouseLeave={hideRemainingBalanceTooltip}>
                                {remainingBalanceValueData.text}
                            </text>
                        </g>
                    }
                    {
                        remainingBalanceLabelData && drawRemainingBalanceText &&
                        <g
                            tabIndex="0"
                            aria-label={remainingBalanceLabelData.text}
                            onFocus={displayRemainingBalanceTooltip}
                            onBlur={hideRemainingBalanceTooltip}>
                            <desc>{remainingBalanceLabelData.text}</desc>
                            <text
                                ref={_remainingBalanceLabel}
                                className={remainingBalanceLabelData.className}
                                x={remainingBalanceLabelData.x}
                                y={remainingBalanceLabelData.y}
                                onMouseMove={displayRemainingBalanceTooltip}
                                onMouseLeave={hideRemainingBalanceTooltip}>
                                {remainingBalanceLabelData.text}
                            </text>
                        </g>
                    }
                    {
                        outlayQuestionData &&
                        <g
                            tabIndex="0"
                            aria-label={outlayQuestionData.text}
                            onFocus={displayOutlaysTooltip}
                            onBlur={hideOutlaysTooltip}>
                            <desc>{outlayQuestionData.text}</desc>
                            <text
                                ref={_outlayQuestion}
                                className={outlayQuestionData.className}
                                x={outlayQuestionData.x}
                                y={outlayQuestionData.y}
                                onMouseMove={displayOutlaysTooltip}
                                onMouseLeave={hideOutlaysTooltip}>
                                {outlayQuestionData.text}
                            </text>
                        </g>
                    }
                    {
                        outlayValueData &&
                        <g
                            tabIndex="0"
                            aria-label={outlayValueData.text}
                            onFocus={displayOutlaysTooltip}
                            onBlur={hideOutlaysTooltip}>
                            <desc>{outlayValueData.text}</desc>
                            <text
                                ref={_outlayValue}
                                className={outlayValueData.className}
                                x={outlayValueData.x}
                                y={outlayValueData.y}
                                onMouseMove={displayOutlaysTooltip}
                                onMouseLeave={hideOutlaysTooltip}>
                                {outlayValueData.text}
                            </text>
                        </g>
                    }
                    {
                        outlayLabelData &&
                        <g
                            tabIndex="0"
                            aria-label={outlayLabelData.text}
                            onFocus={displayOutlaysTooltip}
                            onBlur={hideOutlaysTooltip}>
                            <desc>{outlayLabelData.text}</desc>
                            <text
                                ref={_outlayLabel}
                                className={outlayLabelData.className}
                                x={outlayLabelData.x}
                                y={outlayLabelData.y}
                                onMouseMove={displayOutlaysTooltip}
                                onMouseLeave={hideOutlaysTooltip}>
                                {outlayLabelData.text}
                            </text>
                        </g>
                    }
                    {
                        obligationQuestionData &&
                        <g
                            tabIndex="0"
                            aria-label={obligationQuestionData.text}
                            onFocus={displayObligationsTooltip}
                            onBlur={hideObligationsTooltip}>
                            <desc>{obligationQuestionData.text}</desc>
                            <text
                                ref={_obligationQuestion}
                                className={obligationQuestionData.className}
                                x={obligationQuestionData.x}
                                y={obligationQuestionData.y}
                                onMouseMove={displayObligationsTooltip}
                                onMouseLeave={hideObligationsTooltip}>
                                {obligationQuestionData.text}
                            </text>
                        </g>
                    }
                    {
                        obligationValueData &&
                        <g
                            tabIndex="0"
                            aria-label={obligationValueData.text}
                            onFocus={displayObligationsTooltip}
                            onBlur={hideObligationsTooltip}>
                            <desc>{obligationValueData.text}</desc>
                            <text
                                ref={_obligationValue}
                                className={obligationValueData.className}
                                x={obligationValueData.x}
                                y={obligationValueData.y}
                                onMouseMove={displayObligationsTooltip}
                                onMouseLeave={hideObligationsTooltip}>
                                {obligationValueData.text}
                            </text>
                        </g>
                    }
                    {
                        obligationLabelData &&
                        <g
                            tabIndex="0"
                            aria-label={obligationLabelData.text}
                            onFocus={displayObligationsTooltip}
                            onBlur={hideObligationsTooltip}>
                            <desc>{obligationLabelData.text}</desc>
                            <text
                                ref={_obligationLabel}
                                className={obligationLabelData.className}
                                x={obligationLabelData.x}
                                y={obligationLabelData.y}
                                onMouseMove={displayObligationsTooltip}
                                onMouseLeave={hideObligationsTooltip}>
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
                    {
                        leftRemainingBalanceVerticalLineData &&
                        <g
                            tabIndex="0"
                            aria-label="A line representing the start of the remaining balance"
                            onFocus={displayRemainingBalanceTooltip}
                            onBlur={hideRemainingBalanceTooltip}>
                            <desc>A line representing the start of the remaining balance</desc>
                            <line
                                x1={leftRemainingBalanceVerticalLineData.x1}
                                x2={leftRemainingBalanceVerticalLineData.x2}
                                y1={leftRemainingBalanceVerticalLineData.y1}
                                y2={leftRemainingBalanceVerticalLineData.y2}
                                stroke={leftRemainingBalanceVerticalLineData.lineColor}
                                strokeWidth={remaniningBalanceLineWidth}
                                onMouseMove={displayRemainingBalanceTooltip}
                                onMouseLeave={hideRemainingBalanceTooltip} />
                        </g>
                    }
                    {
                        rightRemainingBalanceVerticalLineData &&
                        <g
                            tabIndex="0"
                            aria-label="A line representing the end of the remaining balance"
                            onFocus={displayRemainingBalanceTooltip}
                            onBlur={hideRemainingBalanceTooltip}>
                            <desc>A line representing the end of the remaining balance</desc>
                            <line
                                x1={rightRemainingBalanceVerticalLineData.x1}
                                x2={rightRemainingBalanceVerticalLineData.x2}
                                y1={rightRemainingBalanceVerticalLineData.y1}
                                y2={rightRemainingBalanceVerticalLineData.y2}
                                stroke={rightRemainingBalanceVerticalLineData.lineColor}
                                strokeWidth={remaniningBalanceLineWidth}
                                onMouseMove={displayRemainingBalanceTooltip}
                                onMouseLeave={hideRemainingBalanceTooltip} />
                        </g>
                    }
                    {
                        remainingBalanceHorizontalLineData &&
                        <g
                            tabIndex="0"
                            aria-label="A line representing the width of the remanining balance"
                            onFocus={displayRemainingBalanceTooltip}
                            onBlur={hideRemainingBalanceTooltip}>
                            <desc>A line representing the width of the remanining balance</desc>
                            <line
                                x1={remainingBalanceHorizontalLineData.x1}
                                x2={remainingBalanceHorizontalLineData.x2}
                                y1={remainingBalanceHorizontalLineData.y1}
                                y2={remainingBalanceHorizontalLineData.y2}
                                stroke={remainingBalanceHorizontalLineData.lineColor}
                                strokeWidth={remaniningBalanceLineWidth}
                                onMouseMove={displayRemainingBalanceTooltip}
                                onMouseLeave={hideRemainingBalanceTooltip} />
                        </g>
                    }
                </svg>
            }
        </div>
    );
};

AmountsVisualization.propTypes = propTypes;
export default AmountsVisualization;
