/**
 * AwardTypeTooltip.jsx
 * Created by Lizzie Salita 5/16/18
 */

import React, { useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    value: PropTypes.string,
    description: PropTypes.string,
    height: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    percentage: PropTypes.string,
    arrow: PropTypes.bool,
    toggleState: PropTypes.bool
};

const AwardTypeTooltip = (props) => {
    const {
        value,
        description,
        height,
        x,
        y,
        width,
        percentage,
        arrow
    } = props;

    let divRef = useRef();
    let pointerDivRef = useRef();
    let containerDivRef = useRef();

    const positionTooltip = useCallback(() => {
        // Tooptip sizes
        const tooltipWidth = divRef.offsetWidth;
        const tooltipHeight = divRef.offsetHeight;

        // Left padding of container
        const containerPadding = containerDivRef.getBoundingClientRect().left;

        // Window width
        const windowWidth = window.innerWidth;

        // Offset the tooltip position to account for its arrow/pointer
        const offset = 13;

        // Height offset to not overlap labels
        const heightOffset = 25;

        // Initial position
        const xPosition = width * 0.5;
        const yPosition = height * 0.5;

        // Define initial quadrants and offsets
        let leftRightDirection = 'left';
        const topBottomDirection = 'bottom';
        let leftOffset = `${(x + xPosition) + offset}px`;
        let topOffset = `${(height / 2) + heightOffset}px`;

        // Determine which quadrant the tooltip should appear in
        if (x + xPosition + tooltipWidth >= windowWidth - containerPadding) {
            leftRightDirection = 'right';
        }

        // Position the tooltip based on quadrant
        // Bottom left
        if (leftRightDirection === 'left' && topBottomDirection === 'bottom') {
            topOffset = `${(y + yPosition) - (tooltipHeight + heightOffset)}px`;
        }
        // Bottom right
        else if (leftRightDirection === 'right' && topBottomDirection === 'bottom') {
            leftOffset = `${((x + (width / 2)) - (tooltipWidth + offset))}px`;
            topOffset = `${(y + yPosition) - (tooltipHeight + heightOffset)}px`;
        }

        let size = '';
        if (arrow) {
            size = ' small';
        }

        pointerDivRef.className = `tooltip-pointer ${topBottomDirection}-${leftRightDirection}`;
        divRef.style.top = topOffset;
        divRef.style.left = leftOffset;
        divRef.className = `tooltip ${topBottomDirection}${size}`;
    }, [arrow, height, width, x, y]);

    useEffect(() => {
        positionTooltip();
    }, [positionTooltip]);

    let desc = (
        <>
            <div className="tooltip-body-row bottom-spacing">
                <div className="tooltip-label">
                    {props.toggleState ? "Outlays" : "Obligations"}
                </div>
                <div className="tooltip-value">
                    {value}
                </div>
            </div>
            <div className="tooltip-body-row">
                <div className="tooltip-label">
                        Percent of total
                </div>
                <div className="tooltip-value">
                    {percentage}
                </div>
            </div>
        </>
    );
    let smallValue = '';

    if (arrow) {
        desc = '';
        smallValue = ' small';
    }

    return (
        <div
            className="visualization-tooltip"
            ref={(div) => {
                containerDivRef = div;
            }}>
            <div
                className={`tooltip${smallValue}`}
                ref={(div) => {
                    divRef = div;
                }}>
                <div
                    className="tooltip-pointer"
                    ref={(div) => {
                        pointerDivRef = div;
                    }} />
                <div className="tooltip-title">
                    {description}
                </div>
                <div className="tooltip-body">
                    {desc}
                </div>
            </div>
        </div>
    );
};

AwardTypeTooltip.propTypes = propTypes;
export default AwardTypeTooltip;
