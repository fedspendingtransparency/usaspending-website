/**
 * GeoVisualizationTooltip.jsx
 * Created by Kevin Li 2/23/17
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { formatMoneyWithUnitsShortLabel } from 'helpers/moneyFormatter';

const propTypes = {
    label: PropTypes.string,
    value: PropTypes.number,
    y: PropTypes.number,
    x: PropTypes.number,
    visualization: PropTypes.object,
    total: PropTypes.number,
    description: PropTypes.string
};

const GeoVisualizationTooltip = (props) => {
    let containerDiv;
    let tooltipDiv;
    let pointerDiv;

    const positionTooltip = () => {
        // we need to wait for the tooltip to render before we can full position it due to its
        // dynamic width
        const tooltipWidth = tooltipDiv.offsetWidth;
        const containerX = containerDiv.getBoundingClientRect().left;
        const windowWidth = window.innerWidth;

        // determine the tooltip direction
        let direction = 'left';
        // // allow 20px padding
        if (tooltipWidth + containerX + props.x >= windowWidth - 20) {
            direction = 'right';
        }

        // offset the tooltip position to account for its arrow/pointer
        let offset = -9;
        if (direction === 'right') {
            offset = 9 + tooltipWidth;
        }

        tooltipDiv.style.top = `${props.y - 15}px`;
        tooltipDiv.style.left = `${props.x - offset}px`;
        tooltipDiv.className = `tooltip ${direction}`;
        pointerDiv.className = `tooltip-pointer ${direction}`;
    };

    useEffect(() => {
        positionTooltip();
    });

    return (
        <div
            className="visualization-tooltip"
            ref={(div) => {
                containerDiv = div;
            }}>
            <div
                className="tooltip"
                ref={(div) => {
                    tooltipDiv = div;
                }}>
                <div
                    className="tooltip-pointer"
                    ref={(div) => {
                        pointerDiv = div;
                    }} />
                <div className="tooltip-title">
                    {props.label}
                </div>
                <div className="tooltip-body">
                    {props.description &&
                        <div className="tooltip-label">
                            {props.description}
                        </div>}
                    <div className="tooltip-value">
                        {formatMoneyWithUnitsShortLabel(props.value)}
                    </div>
                </div>
            </div>
        </div>
    );
};

GeoVisualizationTooltip.propTypes = propTypes;

export default GeoVisualizationTooltip;
