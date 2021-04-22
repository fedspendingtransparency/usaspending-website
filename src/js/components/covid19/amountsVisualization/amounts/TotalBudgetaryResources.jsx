/**
 * TotalBudgetaryResource.jsx
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

import TextLineRectangle from './shared/TextLineRectangle';

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
    const [questionData, setQuestionData] = useState();
    const [valueData, setValueData] = useState();
    const [labelData, setLabelData] = useState();
    const _totalBudgetAuthorityQuestion = useRef(null);
    const _totalBudgetAuthorityLabel = useRef(null);
    const _totalBudgetAuthorityValue = useRef(null);
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
    // questionData
    useLayoutEffect(() => {
        const { text: textInfo } = rectangleMapping._totalBudgetAuthority;
        const questionRef = _totalBudgetAuthorityQuestion.current?.getBoundingClientRect();
        setQuestionData({
            y: (lineData?.y1 || 0) + (questionRef?.height || 0),
            x: (lineData?.x1 || 0) - ((questionRef?.width || 0) + spacingBetweenLineAndText),
            height: questionRef?.height || 0,
            text: textInfo.question,
            className: `amounts-text__question ${!questionRef ? 'white' : ''}`,
            dataId
        });
    }, [lineData]);
    // valueData
    useLayoutEffect(() => {
        const ref = _totalBudgetAuthorityValue.current?.getBoundingClientRect();
        const amount = Math.abs(overviewData._totalBudgetAuthority);
        const units = calculateUnits([amount]);
        const moneyLabel = `${formatMoneyWithPrecision(amount / units.unit, 1)} ${upperFirst(units.longLabel)}`;
        if (lineData && questionData) {
            setValueData({
                y: lineData.y1 + questionData.height + (ref?.height || 0),
                x: lineData.x1 - ((ref?.width || 0) + spacingBetweenLineAndText),
                height: ref?.height || 0,
                theWidth: ref?.width || 0,
                text: moneyLabel,
                className: `amounts-text__value bold ${!ref ? 'white' : ''}`,
                dataId
            });
        }
    }, [questionData, lineData]);
    // labelData
    useLayoutEffect(() => {
        const ref = _totalBudgetAuthorityLabel.current?.getBoundingClientRect();
        const { text: textInfo } = rectangleMapping._totalBudgetAuthority;
        if (lineData && questionData && valueData) {
            setLabelData({
                y: lineData.y1 + questionData.height + (ref?.height || 0) + labelTextAdjustment.y + 2,
                x: lineData.x1 - ((ref?.width || 0) + (valueData?.theWidth || 0) + spacingBetweenLineAndText + labelTextAdjustment.x),
                height: ref?.height || 0,
                text: textInfo.label,
                className: `amounts-text__label ${!ref ? 'white' : ''}`,
                dataId
            });
        }
    }, [questionData, lineData, valueData]);
    return (
        <TextLineRectangle
            displayTooltip={displayTooltip}
            hideTooltip={hideTooltip}
            lineData={lineData}
            lineStrokeWidth={lineStrokeWidth}
            rectangleData={rectangleData}
            showTooltip={showTooltip}
            dataId={dataId}
            text={[questionData, valueData, labelData].filter((data) => data)} />
    );
};

TotalBudgetaryResources.propTypes = propTypes;
export default TotalBudgetaryResources;
