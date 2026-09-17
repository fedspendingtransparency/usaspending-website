/**
 * DefaultLineAndText.jsx
 * created by Jonathan Hill 04/22/21
 */

import React, { useState, useEffect, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { upperFirst } from 'lodash-es';

import {
    calculateUnits,
    formatMoneyWithPrecision
} from 'helpers/moneyFormatter';
import { rectangleMapping } from 'dataMapping/covid19/amountsVisualization';
import useCallbackRef from "../../../../../hooks/useCallbackRef";

import { defaultTextState, textXPosition, textYPosition } from 'helpers/covid19/amountsVisualization';
import DefaultLine from './DefaultLine';
import TextGroup from './TextGroup';

const propTypes = {
    scale: PropTypes.func,
    overviewData: PropTypes.object,
    displayTooltip: PropTypes.func,
    hideTooltip: PropTypes.func,
    dataId: PropTypes.string,
    tooltipId: PropTypes.string,
    width: PropTypes.number,
    className: PropTypes.string,
    publicLaw: PropTypes.string
};

// eslint-disable-next-line prefer-arrow-callback
const DefaultLineAndText = memo(function DefaultLineAndText ({
    scale,
    overviewData,
    displayTooltip = () => {},
    hideTooltip = () => {},
    dataId = '',
    tooltipId,
    width,
    className,
    publicLaw
}) {
    const [valueData, setValueData] = useState(defaultTextState(dataId, 'value'));
    const [labelData, setLabelData] = useState(defaultTextState(dataId, 'label'));
    const [valueRect, setValueRect] = useState({});
    const [labelRect, setLabelRect] = useState({});

    const getRect = useCallback((entry) => {
        if (entry.target.classList.contains("amounts-text__label")) {
            setLabelRect(entry.contentRect);
        }
        else if (entry.target.classList.contains("amounts-text__value")) {
            setValueRect(entry.contentRect);
        }
    }, []);

    const ref = useCallbackRef(getRect);

    // value
    useEffect(() => {
        if (scale) {
            const amount = Math.abs(overviewData[dataId]);
            const units = calculateUnits([amount]);
            const moneyLabel = `${formatMoneyWithPrecision(amount / units.unit, 1)} ${upperFirst(units.longLabel)}`;

            setValueData({
                y: textYPosition(dataId, 'value', labelData.height, valueRect?.height || 0),
                x: textXPosition(overviewData, scale, dataId, valueRect?.width || 0),
                height: valueRect?.height || 0,
                theWidth: valueRect?.width || 0,
                text: moneyLabel,
                className: `amounts-text__value ${className || ''}`
            });
        }
    }, [width, scale, valueRect]);

    // label
    useEffect(() => {
        if (scale) {
            setLabelData({
                y: textYPosition(dataId, 'label', labelRect?.height || 0, valueData.height),
                x: textXPosition(overviewData, scale, dataId, labelRect?.width || 0),
                height: labelRect?.height || 0,
                text: rectangleMapping[dataId].text.label,
                className: `amounts-text__label ${className || ''}`
            });
        }
    }, [width, scale, valueData]);

    return (
        <g tabIndex={-1}>
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
                { ...valueData, ref },
                { ...labelData, ref }
            ].map((textItem) => ({
                ...textItem,
                dataId,
                tooltipId,
                displayTooltip,
                hideTooltip
            }))} />
        </g>
    );
});

DefaultLineAndText.propTypes = propTypes;
export default DefaultLineAndText;
