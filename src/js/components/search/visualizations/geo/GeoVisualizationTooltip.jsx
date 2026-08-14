/**
 * GeoVisualizationTooltip.jsx
 * Created by Kevin Li 2/23/17
 */

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { formatMoneyWithUnitsShortLabel } from 'helpers/moneyFormatter';

const propTypes = {
    label: PropTypes.string,
    value: PropTypes.number,
    y: PropTypes.number,
    x: PropTypes.number,
    description: PropTypes.string
};

const GeoVisualizationTooltip = ({
    label,
    value,
    y,
    x,
    description
}) => {
    const containerDiv = useRef(null);
    const tooltipDiv = useRef(null);
    const pointerDiv = useRef(null);

    const positionTooltip = () => {
        // we need to wait for the tooltip to render before we can full position it due to its
        // dynamic width
        const tooltipWidth = tooltipDiv.current.offsetWidth;
        const containerX = containerDiv.current.getBoundingClientRect().left;
        const windowWidth = window.innerWidth;

        // determine the tooltip direction
        let direction = 'left';
        // // allow 20px padding
        if (tooltipWidth + containerX + x >= windowWidth - 20) {
            direction = 'right';
        }

        // offset the tooltip position to account for its arrow/pointer
        let offset = -9;
        if (direction === 'right') {
            offset = 9 + tooltipWidth;
        }

        tooltipDiv.current.style.top = `${y - 15}px`;
        tooltipDiv.current.style.left = `${x - offset}px`;
        tooltipDiv.current.className = `tooltip ${direction}`;
        pointerDiv.current.className = `tooltip-pointer ${direction}`;
    };

    useEffect(() => {
        positionTooltip();
    });

    return (
        <div
            className="visualization-tooltip"
            ref={containerDiv}>
            <div
                className="tooltip"
                ref={tooltipDiv}>
                <div
                    className="tooltip-pointer"
                    ref={pointerDiv} />
                <div className="tooltip-title">
                    {label}
                </div>
                <div className="tooltip-body">
                    {description &&
                        <div className="tooltip-label">
                            {description}
                        </div>}
                    <div className="tooltip-value">
                        {formatMoneyWithUnitsShortLabel(value)}
                    </div>
                </div>
            </div>
        </div>
    );
};

GeoVisualizationTooltip.propTypes = propTypes;
export default GeoVisualizationTooltip;
