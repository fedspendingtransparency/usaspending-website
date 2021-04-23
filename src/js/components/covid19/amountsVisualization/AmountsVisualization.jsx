/**
 * AmountsVisualization.jsx
 * Created by Jonathan Hill 06/23/20
 */

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { upperFirst, throttle } from 'lodash';
import { scaleLinear } from 'd3-scale';
import TotalBudgetaryResources from 'components/covid19/amountsVisualization/amounts/totalBudgetaryResources/TotalBudgetaryResources';
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
    defaultTooltipWidth,
    tooltipMapping
} from 'dataMapping/covid19/covid19';
import { stickyHeaderHeight } from 'dataMapping/stickyHeader/stickyHeader';
import {
    calculateUnits,
    formatMoneyWithPrecision,
    formatMoney,
    calculatePercentage
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
    const [outlayRectangleData, setOutlayRectangleData] = useState(null);
    const [obligationRectangleData, setObligationRectangleData] = useState(null);
    const [remainingBalanceRectangleData, setRemainingBalanceRectangleData] = useState(null);
    const [outlayLineData, setOutlayLineData] = useState(null);
    // Four Obligation lines due to overlap with remaining balance text
    const [obligationLineDataOne, setObligationLineDataOne] = useState(null);
    const [obligationLineDataTwo, setObligationLineDataTwo] = useState(null);
    const [obligationLineDataThree, setObligationLineDataThree] = useState(null);
    const [obligationLineDataFour, setObligationLineDataFour] = useState(null);
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
    const [showTooltip, setShowTooltip] = useState(false);
    const [mouseValue, setMouseValue] = useState({ x: 0, y: 0 });
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
    const setMouseData = throttle((e) => {
        const browser = window.navigator.userAgent;
        if (browser.includes('Chrome')) {
            // vertical offsets from trial/error. Not sure which element's height requires this?
            const verticalOffset = window.innerWidth >= 1600
                ? 40
                : 80;
            setMouseValue({
                x: e.clientX - document.getElementById('amounts-viz_id').getBoundingClientRect().left,
                y: e.clientY - document.getElementById('amounts-viz_id').getBoundingClientRect().top - verticalOffset
            });
        }
        else if (browser.includes('Firefox') || browser.includes('Safari')) {
            // vertical offsets from trial/error. Not sure which element's height requires this?
            const verticalOffset = window.innerWidth >= 1600
                ? 0 + stickyHeaderHeight
                : 29.5 + stickyHeaderHeight;
            setMouseValue({
                x: e.clientX - document.getElementById('amounts-viz_id').getBoundingClientRect().left,
                y: e.clientY - document.getElementById('amounts-viz_id').getBoundingClientRect().top - verticalOffset
            });
        }
        else {
            setMouseValue({
                x: e.offsetX || e.clientX,
                y: e.offsetY || e.clientY
            });
        }
    }, 100);
    useEffect(() => {
        document.getElementById('amounts-viz_id').addEventListener('mousemove', setMouseData);
        return () => document.getElementById('amounts-viz_id').removeEventListener('mousemove', setMouseData);
    }, []);
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
            let adjustedWidth = (width - amountsPadding.right || 0) - (obligationRectangleData?.width || 0) - offset.right;
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
        // text to the left of the line
        setOutlayQuestionData({
            y: (outlayLineData?.y1 || 0) + (questionRef?.height || 0),
            x: (outlayLineData?.x1 || 0) - ((questionRef?.width || 0) + spacingBetweenLineAndText),
            height: questionRef?.height || 0,
            text: textInfo.question,
            className: `amounts-text__question ${!questionRef ? 'white' : ''}`
        });
    }, [outlayLineData]);
    // outlayValueData
    useLayoutEffect(() => {
        const ref = _outlayValue.current?.getBoundingClientRect();
        const amount = Math.abs(overviewData._totalOutlays);
        const units = calculateUnits([amount]);
        const moneyLabel = `${formatMoneyWithPrecision(amount / units.unit, 1)} ${upperFirst(units.longLabel)}`;
        if (outlayLineData) {
            setOutlayValueData({
                y: outlayLineData.y1 + (outlayQuestionData?.height || 0) + (ref?.height || 0),
                x: outlayLineData.x1 - ((ref?.width || 0) + spacingBetweenLineAndText),
                height: ref?.height || 0,
                theWidth: ref?.width || 0,
                text: moneyLabel,
                className: `amounts-text__value ${!ref ? 'white' : ''}`
            });
        }
    }, [outlayLineData, outlayQuestionData]);
    // outlayLabelData
    useLayoutEffect(() => {
        const ref = _outlayLabel.current?.getBoundingClientRect();
        const { text: textInfo } = rectangleMapping._totalOutlays;
        if (outlayLineData && outlayQuestionData) {
            setOutlayLabelData({
                y: outlayLineData.y1 + outlayQuestionData.height + (ref?.height || 0) + labelTextAdjustment.y + 2,
                x: outlayLineData.x1 - ((ref?.width || 0) + (outlayValueData?.theWidth || 0) + spacingBetweenLineAndText + labelTextAdjustment.x),
                height: ref?.height || 0,
                text: textInfo.label,
                theWidth: ref?.width || 0,
                className: `amounts-text__label ${!ref ? 'white' : ''}`
            });
        }
    }, [outlayValueData]);
    // 0%
    useLayoutEffect(() => {
        const ref = zerPercentRef.current?.getBoundingClientRect();
        setZeroPercentData({
            y: startOfChartY + (rectangleHeight / 2) + 2,
            x: amountsPadding.left - (ref?.width || 0) - labelTextAdjustment.x
        });
    }, [width]);
    // 100%
    useLayoutEffect(() => {
        setOneHundredPercentData({
            y: startOfChartY + (rectangleHeight / 2) + 2,
            x: (width - amountsPadding.right) + labelTextAdjustment.x
        });
    }, [width]);
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

    const tooltipData = () => ({
        tooltipPosition: 'bottom',
        styles: {
            position: 'absolute',
            transform: `translate(${mouseValue.x - (defaultTooltipWidth / 2)}px,${mouseValue.y + 10}px)`
        },
        tooltipComponent: <PaginatedTooltipContainer
            data={[{
                title: tooltipMapping[showTooltip].title,
                sections: [
                    {
                        paragraphs: [
                            `${formatMoney(overviewData[showTooltip])}`,
                            `${calculatePercentage(overviewData[showTooltip], overviewData._totalBudgetAuthority)} of Total Budgetary Resources`,
                            tooltipMapping[showTooltip].paragraph
                        ]
                    }
                ]
            }]
            }
            tooltipElement={<Tooltip />} />
    });

    const displayTooltip = (e) => {
        setShowTooltip(e.target.getAttribute('data-id'));
    };

    const hideTooltip = () => {
        setShowTooltip('');
    };

    const dateNoteStyles = {
        position: 'absolute',
        transform: `translate(${amountsPadding.left}px,${startOfChartY + rectangleHeight}px)`,
        width: width / 2
    };

    return (
        <div className="amounts-viz award-amounts-viz" id="amounts-viz_id">
            <h3 className="body__narrative amounts-viz__title">
                This is how much was <strong>spent</strong> so far in response to COVID-19
            </h3>
            {
                loading &&
                <div className="results-table-message-container">
                    <ResultsTableLoadingMessage />
                </div>
            }
            {!loading && <DateNote styles={dateNoteStyles} />}
            {
                showTooltip &&
                <TooltipWrapper
                    className="award-section-tt"
                    {...tooltipData()}
                    wide={false}
                    width={defaultTooltipWidth}
                    controlledProps={{
                        isControlled: true,
                        isVisible: !!showTooltip,
                        showTooltip: () => {},
                        closeTooltip: () => {}
                    }} />
            }
            {
                !loading &&
                <svg height={amountsHeight} width={width} className="amounts-viz__svg">
                    <TotalBudgetaryResources
                        displayTooltip={displayTooltip}
                        hideTooltip={hideTooltip}
                        showTooltip={showTooltip}
                        overviewData={overviewData}
                        scale={scale} />
                    {

                    {
                        obligationRectangleData &&
                        <g
                            tabIndex="0"
                            aria-label={obligationRectangleData.description}
                            data-id="_totalObligations"
                            onFocus={displayTooltip}
                            onBlur={hideTooltip}>
                            <desc>
                                {obligationRectangleData.description}
                            </desc>
                            <rect
                                id="amounts-viz__obligations__id"
                                className={showTooltip === '_totalObligations' ? 'highlight' : ''}
                                data-id="_totalObligations"
                                x={obligationRectangleData.x}
                                y={obligationRectangleData.y}
                                width={obligationRectangleData.width}
                                height={obligationRectangleData.height}
                                fill={obligationRectangleData.fill}
                                onMouseMove={displayTooltip}
                                onMouseLeave={hideTooltip} />
                        </g>
                    }
                    {
                        outlayLineData &&
                        <g
                            tabIndex="0"
                            aria-label="A line linking a rectangle to text"
                            data-id="_totalOutlays"
                            onFocus={displayTooltip}
                            onBlur={hideTooltip}>
                            <desc>A line linking a rectangle to text</desc>
                            <line
                                x1={outlayLineData.x1}
                                data-id="_totalOutlays"
                                x2={outlayLineData.x2}
                                y1={outlayLineData.y1}
                                y2={outlayLineData.y2}
                                stroke={outlayLineData.lineColor}
                                strokeWidth={lineStrokeWidth}
                                onMouseMove={displayTooltip}
                                onMouseLeave={hideTooltip} />
                        </g>
                    }
                    {
                        outlayRectangleData &&
                        <g
                            tabIndex="0"
                            aria-label={outlayRectangleData.description}
                            data-id="_totalOutlays"
                            onFocus={displayTooltip}
                            onBlur={hideTooltip}>
                            <desc>
                                {outlayRectangleData.description}
                            </desc>
                            <rect
                                className={showTooltip === '_totalOutlays' ? 'highlight' : ''}
                                data-id="_totalOutlays"
                                x={outlayRectangleData.x}
                                y={outlayRectangleData.y}
                                width={outlayRectangleData.width}
                                height={outlayRectangleData.height}
                                fill={outlayRectangleData.fill}
                                onMouseMove={displayTooltip}
                                onMouseLeave={hideTooltip} />
                        </g>
                    }
                    {
                        remainingBalanceRectangleData && drawRemainingBalanceItems &&
                        <g
                            tabIndex="0"
                            aria-label={remainingBalanceRectangleData.description}
                            data-id="_remainingBalance"
                            onFocus={displayTooltip}
                            onBlur={hideTooltip}>
                            <desc>
                                {remainingBalanceRectangleData.description}
                            </desc>
                            <rect
                                className={showTooltip === '_remainingBalance' ? 'highlight' : ''}
                                data-id="_remainingBalance"
                                x={remainingBalanceRectangleData.x}
                                y={remainingBalanceRectangleData.y}
                                width={remainingBalanceRectangleData.width}
                                height={remainingBalanceRectangleData.height}
                                fill={remainingBalanceRectangleData.fill}
                                onMouseMove={displayTooltip}
                                onMouseLeave={hideTooltip} />
                        </g>
                    }

                    {
                        remainingBalanceQuestionData && drawRemainingBalanceText &&
                        <g
                            tabIndex="0"
                            aria-label={remainingBalanceQuestionData.text}
                            data-id="_remainingBalance"
                            onFocus={displayTooltip}
                            onBlur={hideTooltip}>
                            <desc>{remainingBalanceQuestionData.text}</desc>
                            <text
                                ref={_remainingBalanceQuestion}
                                data-id="_remainingBalance"
                                className={remainingBalanceQuestionData.className}
                                x={remainingBalanceQuestionData.x}
                                y={remainingBalanceQuestionData.y}
                                onMouseMove={displayTooltip}
                                onMouseLeave={hideTooltip}>
                                {remainingBalanceQuestionData.text}
                            </text>
                        </g>
                    }
                    {
                        remainingBalanceValueData && drawRemainingBalanceText &&
                        <g
                            tabIndex="0"
                            aria-label={remainingBalanceValueData.text}
                            data-id="_remainingBalance"
                            onFocus={displayTooltip}
                            onBlur={hideTooltip}>
                            <desc>{remainingBalanceValueData.text}</desc>
                            <text
                                ref={_remainingBalanceValue}
                                data-id="_remainingBalance"
                                className={remainingBalanceValueData.className}
                                x={remainingBalanceValueData.x}
                                y={remainingBalanceValueData.y}
                                onMouseMove={displayTooltip}
                                onMouseLeave={hideTooltip}>
                                {remainingBalanceValueData.text}
                            </text>
                        </g>
                    }
                    {
                        remainingBalanceLabelData && drawRemainingBalanceText &&
                        <g
                            tabIndex="0"
                            aria-label={remainingBalanceLabelData.text}
                            data-id="_remainingBalance"
                            onFocus={displayTooltip}
                            onBlur={hideTooltip}>
                            <desc>{remainingBalanceLabelData.text}</desc>
                            <text
                                ref={_remainingBalanceLabel}
                                data-id="_remainingBalance"
                                className={remainingBalanceLabelData.className}
                                x={remainingBalanceLabelData.x}
                                y={remainingBalanceLabelData.y}
                                onMouseMove={displayTooltip}
                                onMouseLeave={hideTooltip}>
                                {remainingBalanceLabelData.text}
                            </text>
                        </g>
                    }
                    {
                        outlayQuestionData &&
                        <g
                            tabIndex="0"
                            aria-label={outlayQuestionData.text}
                            onFocus={displayTooltip}
                            data-id="_totalOutlays"
                            onBlur={hideTooltip}>
                            <desc>{outlayQuestionData.text}</desc>
                            <text
                                ref={_outlayQuestion}
                                data-id="_totalOutlays"
                                className={outlayQuestionData.className}
                                x={outlayQuestionData.x}
                                y={outlayQuestionData.y}
                                onMouseMove={displayTooltip}
                                onMouseLeave={hideTooltip}>
                                {outlayQuestionData.text}
                            </text>
                        </g>
                    }
                    {
                        outlayValueData &&
                        <g
                            tabIndex="0"
                            data-id="_totalOutlays"
                            aria-label={outlayValueData.text}
                            onFocus={displayTooltip}
                            onBlur={hideTooltip}>
                            <desc>{outlayValueData.text}</desc>
                            <text
                                ref={_outlayValue}
                                data-id="_totalOutlays"
                                className={outlayValueData.className}
                                x={outlayValueData.x}
                                y={outlayValueData.y}
                                onMouseMove={displayTooltip}
                                onMouseLeave={hideTooltip}>
                                {outlayValueData.text}
                            </text>
                        </g>
                    }
                    {
                        outlayLabelData &&
                        <g
                            tabIndex="0"
                            data-id="_totalOutlays"
                            aria-label={outlayLabelData.text}
                            onFocus={displayTooltip}
                            onBlur={hideTooltip}>
                            <desc>{outlayLabelData.text}</desc>
                            <text
                                ref={_outlayLabel}
                                data-id="_totalOutlays"
                                className={outlayLabelData.className}
                                x={outlayLabelData.x}
                                y={outlayLabelData.y}
                                onMouseMove={displayTooltip}
                                onMouseLeave={hideTooltip}>
                                {outlayLabelData.text}
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
                            onFocus={displayTooltip}
                            data-id="_remainingBalance"
                            onBlur={hideTooltip}>
                            <desc>A line representing the start of the remaining balance</desc>
                            <line
                                x1={leftRemainingBalanceVerticalLineData.x1}
                                data-id="_remainingBalance"
                                x2={leftRemainingBalanceVerticalLineData.x2}
                                y1={leftRemainingBalanceVerticalLineData.y1}
                                y2={leftRemainingBalanceVerticalLineData.y2}
                                stroke={leftRemainingBalanceVerticalLineData.lineColor}
                                strokeWidth={remaniningBalanceLineWidth}
                                onMouseMove={displayTooltip}
                                onMouseLeave={hideTooltip} />
                        </g>
                    }
                    {
                        rightRemainingBalanceVerticalLineData &&
                        <g
                            tabIndex="0"
                            aria-label="A line representing the end of the remaining balance"
                            onFocus={displayTooltip}
                            data-id="_remainingBalance"
                            onBlur={hideTooltip}>
                            <desc>A line representing the end of the remaining balance</desc>
                            <line
                                x1={rightRemainingBalanceVerticalLineData.x1}
                                x2={rightRemainingBalanceVerticalLineData.x2}
                                y1={rightRemainingBalanceVerticalLineData.y1}
                                y2={rightRemainingBalanceVerticalLineData.y2}
                                data-id="_remainingBalance"
                                stroke={rightRemainingBalanceVerticalLineData.lineColor}
                                strokeWidth={remaniningBalanceLineWidth}
                                onMouseMove={displayTooltip}
                                onMouseLeave={hideTooltip} />
                        </g>
                    }
                    {
                        remainingBalanceHorizontalLineData &&
                        <g
                            tabIndex="0"
                            data-id="_remainingBalance"
                            aria-label="A line representing the width of the remanining balance"
                            onFocus={displayTooltip}
                            onBlur={hideTooltip}>
                            <desc>A line representing the width of the remanining balance</desc>
                            <line
                                x1={remainingBalanceHorizontalLineData.x1}
                                data-id="_remainingBalance"
                                x2={remainingBalanceHorizontalLineData.x2}
                                y1={remainingBalanceHorizontalLineData.y1}
                                y2={remainingBalanceHorizontalLineData.y2}
                                stroke={remainingBalanceHorizontalLineData.lineColor}
                                strokeWidth={remaniningBalanceLineWidth}
                                onMouseMove={displayTooltip}
                                onMouseLeave={hideTooltip} />
                        </g>
                    }
                </svg>
            }
        </div>
    );
};

AmountsVisualization.propTypes = propTypes;
export default AmountsVisualization;
