/**
 * LinesAndText.jsx
 * created by Jonathan Hill 04/26/21
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
    remaniningBalanceLineWidth,
    lineStrokeWidth,
    heightOfRemainingBalanceLines,
    remainingBalanceLineWidth,
    defaultLineData
} from 'dataMapping/covid19/amountsVisualization';

import { defaultTextState } from 'helpers/covid19/amountsVisualization';

const propTypes = {
    scale: PropTypes.func,
    overviewData: PropTypes.object,
    displayTooltip: PropTypes.func,
    hideTooltip: PropTypes.func,
    lineData: PropTypes.object,
    rectangleData: PropTypes.object,
    dataId: PropTypes.string,
    width: PropTypes.number,
    setRemainingBalanceLabelData: PropTypes.func,
    setRemainingBalanceValueData: PropTypes.func
};

const LinesAndText = ({
    scale,
    overviewData,
    displayTooltip = () => {},
    hideTooltip = () => {},
    dataId = '',
    width = 0,
    setRemainingBalanceLabelData,
    setRemainingBalanceValueData
}) => {
    const [leftVerticalLineData, setLeftVerticalLineData] = useState(defaultLineData);
    const [horizontalLineData, setHorizontalLineData] = useState(defaultLineData);
    const [rightVerticalLineData, setRightVerticalLineData] = useState(defaultLineData);
    const [descriptionData, setDescriptionData] = useState(defaultTextState(dataId, 'description'));
    const [valueData, setValueData] = useState(defaultTextState(dataId, 'value'));
    const [labelData, setLabelData] = useState(defaultTextState(dataId, 'label'));
    const descriptionTextRef = useRef(null);
    const labelTextRef = useRef(null);
    const valueTextRef = useRef(null);
    // leftVerticalLineData
    useEffect(() => {
        if (scale) {
            const data = {
                lineColor: '#555',
                x1: scale(overviewData._totalObligations) + lineStrokeWidth,
                x2: scale(overviewData._totalObligations) + lineStrokeWidth,
                y1: startOfChartY + rectangleHeight + (heightOfRemainingBalanceLines / 2),
                y2: startOfChartY + rectangleHeight + heightOfRemainingBalanceLines
            };
            setLeftVerticalLineData(data);
        }
    }, [scale]);
    // rightVerticalLineData
    useEffect(() => {
        if (scale) {
            const data = {
                lineColor: '#555',
                x1: width - amountsPadding.right - remaniningBalanceLineWidth,
                x2: width - amountsPadding.right - remaniningBalanceLineWidth,
                y1: startOfChartY + rectangleHeight + (heightOfRemainingBalanceLines / 2),
                y2: startOfChartY + rectangleHeight + heightOfRemainingBalanceLines
            };
            setRightVerticalLineData(data);
        }
    }, [scale, width]);
    // remainingBalanceHorizontalLineData
    useEffect(() => {
        if (scale) {
            const data = {
                lineColor: '#555',
                x1: leftVerticalLineData?.x1 || 0,
                x2: rightVerticalLineData?.x1 || 0,
                y1: startOfChartY + rectangleHeight + heightOfRemainingBalanceLines,
                y2: startOfChartY + rectangleHeight + heightOfRemainingBalanceLines
            };
            setHorizontalLineData(data);
        }
    }, [scale, leftVerticalLineData, rightVerticalLineData]);
    // value text
    useLayoutEffect(() => {
        const ref = valueTextRef.current?.getBoundingClientRect();
        const amount = Math.abs(overviewData[dataId]);
        const units = calculateUnits([amount]);
        const moneyLabel = `${formatMoneyWithPrecision(amount / units.unit, 1)} ${upperFirst(units.longLabel)}`;
        setValueData({
            y: startOfChartY + rectangleHeight + heightOfRemainingBalanceLines + (ref?.height || 0),
            x: width - amountsPadding.right - (ref?.width || 0),
            height: ref?.height || 0,
            width: ref?.width || 0,
            text: moneyLabel,
            className: `amounts-text__value ${!ref ? 'white' : ''}`
        });
    }, [horizontalLineData]);
    useEffect(() => {
        setRemainingBalanceValueData({
            x: valueData.x,
            width: valueData.width
        });
    }, [valueData]);
    // label text
    useLayoutEffect(() => {
        const ref = labelTextRef.current?.getBoundingClientRect();
        const { text: textInfo } = rectangleMapping[dataId];
        setLabelData({
            y: startOfChartY + rectangleHeight + heightOfRemainingBalanceLines + 5 + (ref?.height || 0),
            x: width - amountsPadding.right - ((ref?.width || 0) + (valueData?.width || 0) + 4),
            height: ref?.height || 0,
            text: textInfo.label,
            className: `amounts-text__label ${!ref ? 'white' : ''}`
        });
    }, [valueData]);
    useEffect(() => {
        setRemainingBalanceLabelData({
            x: labelData.x,
            width: labelData.width
        });
    }, [labelData]);
    // description text
    useEffect(() => {
        const { text: textInfo } = rectangleMapping[dataId];
        const ref = descriptionTextRef?.current?.getBoundingClientRect();
        setDescriptionData({
            y: startOfChartY + rectangleHeight + heightOfRemainingBalanceLines + (valueData?.height || 0) + (ref?.height || 0),
            x: (width - amountsPadding.right - (ref?.width || 0)),
            height: ref?.height || 0,
            text: textInfo.description,
            className: `amounts-text__description ${!ref ? 'white' : ''}`
        });
    }, [valueData]);
    return (
        <g>
            {leftVerticalLineData &&
            <g
                tabIndex="0"
                aria-label="A line linking a rectangle to text"
                data-id={dataId}
                onFocus={displayTooltip}
                onBlur={hideTooltip}>
                <desc>A line linking a rectangle to text</desc>
                <line
                    x1={leftVerticalLineData.x1}
                    data-id={dataId}
                    x2={leftVerticalLineData.x2}
                    y1={leftVerticalLineData.y1}
                    y2={leftVerticalLineData.y2}
                    stroke={leftVerticalLineData.lineColor}
                    strokeWidth={remainingBalanceLineWidth}
                    onMouseMove={displayTooltip}
                    onMouseLeave={hideTooltip} />
            </g>
            }
            {
                horizontalLineData &&
                <g
                    tabIndex="0"
                    aria-label="A line 2 linking a rectangle to text"
                    data-id={dataId}
                    onFocus={displayTooltip}
                    onBlur={hideTooltip}>
                    <desc>A line linking a rectangle to text</desc>
                    <line
                        x1={horizontalLineData.x1}
                        data-id={dataId}
                        x2={horizontalLineData.x2}
                        y1={horizontalLineData.y1}
                        y2={horizontalLineData.y2}
                        stroke={leftVerticalLineData.lineColor}
                        strokeWidth={remainingBalanceLineWidth}
                        onMouseMove={displayTooltip}
                        onMouseLeave={hideTooltip} />
                </g>
            }
            {
                rightVerticalLineData &&
                <g
                    tabIndex="0"
                    aria-label="A line 3 linking a rectangle to text"
                    data-id={dataId}
                    onFocus={displayTooltip}
                    onBlur={hideTooltip}>
                    <desc>A line linking a rectangle to text</desc>
                    <line
                        x1={rightVerticalLineData.x1}
                        data-id={dataId}
                        x2={rightVerticalLineData.x2}
                        y1={rightVerticalLineData.y1}
                        y2={rightVerticalLineData.y2}
                        stroke={leftVerticalLineData.lineColor}
                        strokeWidth={remainingBalanceLineWidth}
                        onMouseMove={displayTooltip}
                        onMouseLeave={hideTooltip} />
                </g>
            }
            <g
                tabIndex="0"
                key={descriptionData.text}
                aria-label={descriptionData.text}
                data-id={dataId}
                onFocus={displayTooltip}
                onBlur={hideTooltip}>
                <desc>{descriptionData.text}</desc>
                <text
                    ref={descriptionTextRef}
                    data-id={dataId}
                    className={descriptionData.className}
                    x={descriptionData.x}
                    y={descriptionData.y}
                    onMouseMove={displayTooltip}
                    onMouseLeave={hideTooltip}>
                    {descriptionData.text}
                </text>
            </g>
            <g
                tabIndex="0"
                key={labelData.text}
                aria-label={labelData.text}
                data-id={dataId}
                onFocus={displayTooltip}
                onBlur={hideTooltip}>
                <desc>{labelData.text}</desc>
                <text
                    ref={labelTextRef}
                    data-id={dataId}
                    className={labelData.className}
                    x={labelData.x}
                    y={labelData.y}
                    onMouseMove={displayTooltip}
                    onMouseLeave={hideTooltip}>
                    {labelData.text}
                </text>
            </g>
            <g
                tabIndex="0"
                key={valueData.text}
                aria-label={valueData.text}
                data-id={dataId}
                onFocus={displayTooltip}
                onBlur={hideTooltip}>
                <desc>{valueData.text}</desc>
                <text
                    ref={valueTextRef}
                    data-id={dataId}
                    className={valueData.className}
                    x={valueData.x}
                    y={valueData.y}
                    onMouseMove={displayTooltip}
                    onMouseLeave={hideTooltip}>
                    {valueData.text}
                </text>
            </g>
        </g>
    );
};

LinesAndText.propTypes = propTypes;
export default LinesAndText;
