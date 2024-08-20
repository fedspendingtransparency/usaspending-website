import React, { useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { formatMoneyWithUnitsShortLabel } from 'helpers/moneyFormatter';

const propTypes = {
    y: PropTypes.number,
    x: PropTypes.number,
    data: PropTypes.object,
    barWidth: PropTypes.number,
    chartWidth: PropTypes.number
};

const StateTimeVisualizationTooltip = (props) => {
    const {
        y,
        x,
        data,
        barWidth,
        chartWidth
    } = props;

    let divRef = useRef();
    let pointerDivRef = useRef();

    const positionTooltip = useCallback(() => {
    // we need to wait for the tooltip to render before we can full position it due to its
    // dynamic width
        const tooltipWidth = divRef.offsetWidth;

        // determine the tooltip direction
        let direction = 'left';
        // allow 20px padding
        if (tooltipWidth + x >= chartWidth - 20) {
            direction = 'right';
        }

        // offset the tooltip position to account for its arrow/pointer
        let offset = 9;
        if (direction === 'right') {
            offset = -9 - tooltipWidth - barWidth;
        }

        divRef.style.top = `${y}px`;
        divRef.style.left = `${x + offset}px`;
        divRef.className = `tooltip ${direction}`;
        pointerDivRef.className = `tooltip-pointer ${direction}`;
    }, [barWidth, chartWidth, x, y]);

    useEffect(() => {
        positionTooltip();
    }, [positionTooltip]);


    const dollarValue = formatMoneyWithUnitsShortLabel(data.yValue);

    return (
        <div className="visualization-tooltip">
            <div
                className="tooltip"
                ref={(div) => {
                    divRef = div;
                }}>
                <div
                    className="tooltip-pointer"
                    ref={(div) => {
                        pointerDivRef = div;
                    }} />
                <div className="tooltip-title">
                    {data.xValue}
                </div>
                <div className="tooltip-body">
                    <div className="tooltip-label">
                        Obligations
                    </div>
                    <div className="tooltip-value">
                        {dollarValue}
                    </div>
                </div>
            </div>
        </div>
    );
};

StateTimeVisualizationTooltip.propTypes = propTypes;
export default StateTimeVisualizationTooltip;
