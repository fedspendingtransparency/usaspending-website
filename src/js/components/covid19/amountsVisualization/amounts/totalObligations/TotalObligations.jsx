/**
 * TotalObligations.jsx
 * created by Jonathan Hill 04/22/21
 */

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
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
    spacingBetweenLineAndText,
    lineStrokeWidth,
    labelTextAdjustment
} from 'dataMapping/covid19/covid19';

import Rectangle from '../shared/Rectangle';
import LineAndText from './LineAndText';

const propTypes = {
    displayTooltip: PropTypes.func,
    hideTooltip: PropTypes.func,
    showTooltip: PropTypes.bool,
    dataId: PropTypes.string,
    overviewData: PropTypes.object,
    scale: PropTypes.func
};

const dataId = '_totalBudgetAuthority';

const TotalBudgetaryResources = ({
    displayTooltip,
    hideTooltip,
    showTooltip,
    overviewData,
    scale
}) => {
    const [rectangleData, setRectangleData] = useState();
    const [lineData, setLineData] = useState();
    const [descriptionData, setdescriptionData] = useState();
    const [valueData, setValueData] = useState();
    const [labelData, setLabelData] = useState();
    const descriptionTextRef = useRef(null);
    const labelTextRef = useRef(null);
    const valueTextRef = useRef(null);
    // totalRectangleData
    useEffect(() => {
        if (scale) {
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
            if (!isNaN(scale(amount))) setRectangleData(data);
        }
    }, [scale, overviewData]);
    // lineData
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
            if (!isNaN(scale(amount))) setLineData(data);
        }
    }, [scale, overviewData, rectangleData]);
    // description text data
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
    // value text data
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
    // label text data
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
            <title>The text, vertical line and rectangle representative of the COVID-19 Total Budgetary Resources</title>
            <Rectangle
                overviewData={overviewData}
                scale={scale}
                displayTooltip={displayTooltip}
                hideTooltip={hideTooltip}
                showTooltip={showTooltip}
                dataId={dataId} />
            <LineAndText
                overviewData={overviewData}
                scale={scale}
                displayTooltip={displayTooltip}
                hideTooltip={hideTooltip}
                showTooltip={showTooltip}
                dataId={dataId} />
        </g>
    );
};

TotalBudgetaryResources.propTypes = propTypes;
export default TotalBudgetaryResources;
