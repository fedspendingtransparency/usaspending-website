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
    labelTextAdjustment,
    lineStrokeWidth
} from 'dataMapping/covid19/covid19';

const propTypes = {
    scale: PropTypes.func,
    overviewData: PropTypes.object,
    displayTooltip: PropTypes.func,
    hideTooltip: PropTypes.func,
    lineData: PropTypes.object,
    rectangleData: PropTypes.object,
    showTooltip: PropTypes.bool,
    dataId: PropTypes.string
};

const Line = ({
    scale,
    overviewData,
    displayTooltip = () => {},
    hideTooltip = () => {},
    dataId = ''
}) => {
    const [lineData, setLineData] = useState({
        lineColor: 'transparent',
        x1: 0,
        x2: 0,
        y1: 0,
        y2: 0
    });
    const [descriptionData, setdescriptionData] = useState();
    const [valueData, setValueData] = useState();
    const [labelData, setLabelData] = useState();
    const descriptionTextRef = useRef(null);
    const labelTextRef = useRef(null);
    const valueTextRef = useRef(null);

    useEffect(() => {
        if (scale) {
            const {
                offset,
                lineLength,
                lineColor
            } = rectangleMapping[dataId];
            const { left, right } = amountsPadding;
            const amount = Math.abs(overviewData[dataId]);
            const x = left + offset.left;
            const rectWidth = scale(amount) - (right + (offset.right || 0));
            const properties = {
                lineColor,
                x1: (x + rectWidth) - (lineStrokeWidth / 2),
                x2: (x + rectWidth) - (lineStrokeWidth / 2),
                y1: startOfChartY - lineLength,
                y2: startOfChartY + (rectangleHeight / 2)
            };
            if (!isNaN(scale(amount))) setLineData(properties);
        }
    }, [scale, overviewData]);
    // description text lineData
    useLayoutEffect(() => {
        const { text: textInfo } = rectangleMapping._totalBudgetAuthority;
        const questionRef = descriptionTextRef.current?.getBoundingClientRect();
        setdescriptionData({
            y: (lineData?.y1 || 0) + (questionRef?.height || 0),
            x: (lineData?.x1 || 0) - ((questionRef?.width || 0) + spacingBetweenLineAndText),
            height: questionRef?.height || 0,
            text: textInfo.question,
            className: `amounts-text__question ${!questionRef ? 'white' : ''}`
        });
    }, [lineData]);
    // value text lineData
    useLayoutEffect(() => {
        const ref = valueTextRef.current?.getBoundingClientRect();
        const amount = Math.abs(overviewData._totalBudgetAuthority);
        const units = calculateUnits([amount]);
        const moneyLabel = `${formatMoneyWithPrecision(amount / units.unit, 1)} ${upperFirst(units.longLabel)}`;
        if (lineData && descriptionData) {
            setValueData({
                y: lineData.y1 + descriptionData.height + (ref?.height || 0),
                x: lineData.x1 - ((ref?.width || 0) + spacingBetweenLineAndText),
                height: ref?.height || 0,
                theWidth: ref?.width || 0,
                text: moneyLabel,
                className: `amounts-text__value bold ${!ref ? 'white' : ''}`
            });
        }
    }, [descriptionData, lineData]);
    // label text lineData
    useLayoutEffect(() => {
        const ref = labelTextRef.current?.getBoundingClientRect();
        const { text: textInfo } = rectangleMapping._totalBudgetAuthority;
        if (lineData && descriptionData && valueData) {
            setLabelData({
                y: lineData.y1 + descriptionData.height + (ref?.height || 0) + labelTextAdjustment.y + 2,
                x: lineData.x1 - ((ref?.width || 0) + (valueData?.theWidth || 0) + spacingBetweenLineAndText + labelTextAdjustment.x),
                height: ref?.height || 0,
                text: textInfo.label,
                className: `amounts-text__label ${!ref ? 'white' : ''}`
            });
        }
    }, [descriptionData, lineData, valueData]);

    return (
        <g>
            <g
                tabIndex="0"
                aria-label="A line linking a Line to text"
                data-id={dataId}
                onFocus={displayTooltip}
                onBlur={hideTooltip}>
                <desc>A line linking a Line to text</desc>
                <line
                    data-id={dataId}
                    x1={lineData.x1}
                    x2={lineData.x2}
                    y1={lineData.y1}
                    y2={lineData.y2}
                    stroke={lineData.lineColor}
                    strokeWidth={lineStrokeWidth}
                    onMouseMove={displayTooltip}
                    onMouseLeave={hideTooltip} />
            </g>
            {descriptionData &&
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
            }
            {labelData &&
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
            </g>}
            {valueData &&
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
            </g>}
        </g>
    ); };

Line.propTypes = propTypes;
export default Line;
