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

import { rectangleMapping } from 'dataMapping/covid19/amountsVisualization';

import { defaultTextState, textXPosition, textYPosition } from 'helpers/covid19/amountsVisualization';

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
    tooltipId: PropTypes.string,
    width: PropTypes.number,
    className: PropTypes.string,
    publicLaw: PropTypes.string
};

const DefaultLineAndText = ({
    scale,
    overviewData,
    displayTooltip = () => {},
    hideTooltip = () => {},
    dataId = '',
    tooltipId,
    width,
    className,
    publicLaw
}) => {
    const [valueData, setValueData] = useState(defaultTextState(dataId, 'value'));
    const [labelData, setLabelData] = useState(defaultTextState(dataId, 'label'));
    const labelTextRef = useRef(null);
    const valueTextRef = useRef(null);
    // value
    useEffect(() => {
        if (scale) {
            const ref = valueTextRef.current?.getBoundingClientRect();
            const amount = Math.abs(overviewData[dataId]);
            const units = calculateUnits([amount]);
            const moneyLabel = `${formatMoneyWithPrecision(amount / units.unit, 1)} ${upperFirst(units.longLabel)}`;
            setValueData({
                y: textYPosition(dataId, 'value', labelData.height, ref?.height || 0),
                x: textXPosition(overviewData, scale, dataId, ref?.width || 0),
                height: ref?.height || 0,
                theWidth: ref?.width || 0,
                text: moneyLabel,
                className: `amounts-text__value ${className || ''}`
            });
        }
    }, [width, scale, valueTextRef.current]);
    // label
    useEffect(() => {
        if (scale) {
            const ref = labelTextRef.current?.getBoundingClientRect();
            setLabelData({
                y: textYPosition(dataId, 'label', ref?.height || 0, valueData.height),
                x: textXPosition(overviewData, scale, dataId, ref?.width || 0),
                height: ref?.height || 0,
                text: rectangleMapping[dataId].text.label,
                className: `amounts-text__label ${className || ''}`
            });
        }
    }, [width, scale, valueData]);

    return (
        <g>
            <DefaultLine
                scale={scale}
                className={className}
                overviewData={overviewData}
                dataId={dataId}
                tooltipId={tooltipId}
                displayTooltip={displayTooltip}
                hideTooltip={hideTooltip}
                width={width}
                publicLaw={publicLaw} />
            <TextGroup data={[
                { ...valueData, ref: valueTextRef },
                { ...labelData, ref: labelTextRef }
            ].map((textItem) => ({
                ...textItem,
                dataId,
                tooltipId,
                displayTooltip,
                hideTooltip
            }))} />
        </g>
    );
};

DefaultLineAndText.propTypes = propTypes;
export default DefaultLineAndText;
