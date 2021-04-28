/**
 * DefaultLineAndText.jsx
 * created by Jonathan Hill 04/22/21
 */

import React, { useState, useEffect, useRef } from 'react';
import { upperFirst } from 'lodash';
import PropTypes from 'prop-types';

import {
    calculateUnits,
    formatMoneyWithPrecision
} from 'helpers/moneyFormatter';

import {
    rectangleMapping,
    startOfChartY,
    spacingBetweenLineAndText,
    labelTextAdjustment
} from 'dataMapping/covid19/amountsVisualization';

import { defaultTextState, lineXPosition } from 'helpers/covid19/amountsVisualization';

import DefaultLine from './DefaultLine';
import TextGroup from './TextGroup';

const propTypes = {
    scale: PropTypes.func,
    overviewData: PropTypes.object,
    displayTooltip: PropTypes.func,
    hideTooltip: PropTypes.func,
    lineData: PropTypes.object,
    rectangleData: PropTypes.object,
    dataId: PropTypes.string,
    width: PropTypes.number
};

const DefaultLineAndText = ({
    scale,
    overviewData,
    displayTooltip = () => {},
    hideTooltip = () => {},
    dataId = '',
    width
}) => {
    const [descriptionData, setDescriptionData] = useState(defaultTextState(dataId, 'description'));
    const [valueData, setValueData] = useState(defaultTextState(dataId, 'value'));
    const [labelData, setLabelData] = useState(defaultTextState(dataId, 'label'));
    const descriptionTextRef = useRef(null);
    const labelTextRef = useRef(null);
    const valueTextRef = useRef(null);
    // description text
    useEffect(() => {
        const { text: textInfo, lineLength } = rectangleMapping[dataId];
        const questionRef = descriptionTextRef.current?.getBoundingClientRect();
        if (scale) {
            setDescriptionData({
                y: (startOfChartY - lineLength || 0) + (questionRef?.height || 0),
                x: lineXPosition(overviewData, scale, dataId) - ((questionRef?.width || 0) + spacingBetweenLineAndText),
                height: questionRef?.height || 0,
                text: textInfo.description,
                className: `amounts-text__description ${!questionRef ? 'white' : ''}`
            });
        }
    }, [width, scale]);
    // value text
    useEffect(() => {
        const ref = valueTextRef.current?.getBoundingClientRect();
        const { lineLength } = rectangleMapping[dataId];
        const amount = Math.abs(overviewData[dataId]);
        const units = calculateUnits([amount]);
        const moneyLabel = `${formatMoneyWithPrecision(amount / units.unit, 1)} ${upperFirst(units.longLabel)}`;
        if (scale) {
            setValueData({
                y: (startOfChartY - lineLength || 0) + descriptionData.height + (ref?.height || 0),
                x: lineXPosition(overviewData, scale, dataId) - ((ref?.width || 0) + spacingBetweenLineAndText),
                height: ref?.height || 0,
                theWidth: ref?.width || 0,
                text: moneyLabel,
                className: `amounts-text__value bold ${!ref ? 'white' : ''}`
            });
        }
    }, [descriptionData]);
    // label text
    useEffect(() => {
        const ref = labelTextRef.current?.getBoundingClientRect();
        const { text: textInfo, lineLength } = rectangleMapping[dataId];
        if (scale && descriptionData) {
            setLabelData({
                y: (startOfChartY - lineLength || 0) + descriptionData.height + (ref?.height || 0) + labelTextAdjustment.y + 2,
                x: lineXPosition(overviewData, scale, dataId) - ((ref?.width || 0) + (valueData.theWidth || 0) + spacingBetweenLineAndText + labelTextAdjustment.x),
                height: ref?.height || 0,
                text: textInfo.label,
                className: `amounts-text__label ${!ref ? 'white' : ''}`
            });
        }
    }, [valueData]);
    return (
        <g>
            <DefaultLine
                scale={scale}
                overviewData={overviewData}
                dataId={dataId}
                displayTooltip={displayTooltip}
                hideTooltip={hideTooltip} />
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
    ); };

DefaultLineAndText.propTypes = propTypes;
export default DefaultLineAndText;
